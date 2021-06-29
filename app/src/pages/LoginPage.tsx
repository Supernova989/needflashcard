import React, { FC } from "react";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { authenticateUser } from "../redux/reducers/@auth/actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface Props {
  referer?: string;
}

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required("Required"),
});

const LoginPage: FC<Props> = ({ referer }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [t] = useTranslation();

  return (
    <div>
      I am LoginPage. <br />
      From: {referer}
      <br />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={({ email, password }, actions) => {
          dispatch(authenticateUser(email, password));
        }}
      >
        {({ values, touched, errors, ...props }) => (
          <form autoComplete="off" autoCorrect="off" onSubmit={props.handleSubmit}>
            <input
              name="email"
              className={clsx({ touched: touched.email })}
              type="email"
              placeholder={t("COMMON.EMAIL")}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={values.email}
            />
            {touched.email && errors.email}
            <br />
            <input
              name="password"
              className={clsx({ touched: touched.password })}
              type="password"
              placeholder={t("COMMON.PASSWORD")}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={values.password}
            />
            {touched.password && errors.password}

            <Button type="submit" isDisabled={false} color="primary" variant="contained" onClick={props.validateForm}>
              {t("BUTTONS.LOGIN")}
            </Button>
            <br />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
