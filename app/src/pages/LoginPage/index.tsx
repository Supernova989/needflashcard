import React, { FC, useRef } from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { authenticateUser } from "../../redux/reducers/@auth/actions";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Link, RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { ROUTES } from "../../routes";
import Input from "../../components/Input";

interface Props {
  referer?: string;
}

export const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(20).required(),
  status: Yup.string(),
});

type LoginFormFields = Yup.InferType<typeof loginSchema>;

const LoginPage: FC<RouteComponentProps & Props> = ({ referer, history }) => {
  const dispatch = useDispatch<AppDispatch>();
  const formRef = useRef<FormikProps<LoginFormFields> | null>(null);
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen" data-testid="page-login">
      <aside className="login-sidebar">
        <div />

        <Formik
          innerRef={formRef}
          initialValues={{ email: "", password: "", status: "" }}
          validationSchema={loginSchema}
          onSubmit={async ({ email, password }, actions) => {
            try {
              await dispatch(authenticateUser({ email, password })).unwrap();
              referer && history.push(referer);
            } catch (e) {
              let errorText = "";
              switch (e) {
                default:
                  errorText = "ERRORS.INVALID_CREDENTIALS";
              }
              actions.setFormikState((s) => ({
                ...s,
                values: {
                  ...s.values,
                  password: "",
                },
                errors: { status: errorText },
              }));
            }
          }}
        >
          {({ values, setFieldValue, touched, errors, ...props }) => (
            <form autoComplete="off" autoCorrect="off" onSubmit={props.handleSubmit}>
              <Input
                testId="email-input"
                name="email"
                className={clsx("mb-1")}
                type="email"
                placeholder={t("COMMON.EMAIL")}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={values.email}
                error={t(errors.email!)}
                touched={touched.email}
                block={true}
              />
              <Input
                testId="password-input"
                name="password"
                className={clsx("mb-1")}
                type="password"
                placeholder={t("COMMON.PASSWORD")}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={values.password}
                error={t(errors.password!)}
                touched={touched.password}
                block={true}
              />

              {errors.status && <p className={"error"}>{t(errors.status)}</p>}

              <hr />

              <div className="flex sm:justify-between sm:flex-row flex-col-reverse items-center mt-3">
                <Link className="" to={ROUTES.FORGOT_PASSWORD}>
                  {t("COMMON.FORGOT_PASSWORD")}
                </Link>

                <Button
                  className=""
                  data-testid="login-btn"
                  type="submit"
                  isDisabled={props.isSubmitting}
                  color="primary"
                  variant="contained"
                  onClick={props.validateForm}
                >
                  {t("BUTTONS.LOGIN")}
                </Button>
              </div>
            </form>
          )}
        </Formik>

        <div />
      </aside>
    </div>
  );
};

export default withRouter(LoginPage);
