import React, { FC, useEffect } from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { authenticateUser } from "../../redux/reducers/@auth/actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { ROUTES } from "../../routes";
import Input from "../../components/Input";
import { TFunction } from "react-i18next";

interface Props {
  referer?: string;
}

export const loginSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().email(t("ERRORS.INVALID_EMAIL")).required(t("ERRORS.REQUIRED")),
    password: Yup.string().min(6, t("ERRORS.TOO_SHORT")).max(20, t("ERRORS.TOO_LONG")).required(t("ERRORS.REQUIRED")),
  });

const LoginPage: FC<RouteComponentProps & Props> = ({ referer, history }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen" data-testid="page-login">
      <aside className="login-sidebar">
        <div />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema(t)}
          onSubmit={({ email, password }, actions) => {
            dispatch(authenticateUser(email, password)).then((errorCode) => {
              if (errorCode) {
                return;
              }
              history.push(ROUTES.INDEX);
            });
          }}
        >
          {({ values, touched, errors, ...props }) => (
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
                error={errors.email}
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
                error={errors.password}
                touched={touched.password}
                block={true}
              />

              <hr />

              <div className="flex sm:justify-between sm:flex-row flex-col-reverse items-center mt-3">
                <Link className="link font-semibold sm:mt-0 mt-2 sm:w-auto text-center" to={ROUTES.FORGOT_PASSWORD}>
                  {t("COMMON.FORGOT_PASSWORD")}
                </Link>

                <Button
                  className="w-full sm:w-auto"
                  data-testid="login-btn"
                  type="submit"
                  isDisabled={false}
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
