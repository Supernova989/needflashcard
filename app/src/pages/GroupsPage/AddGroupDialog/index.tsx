import SimpleModal from "../../../components/SimpleModal";
import { useTranslation } from "react-i18next";
import React, { FC, useEffect, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import clsx from "clsx";
import Input from "../../../components/Input";
import * as Yup from "yup";

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 80;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 120;

export const addGroupSchema = Yup.object({
  title: Yup.string().min(TITLE_MIN_LENGTH).max(TITLE_MAX_LENGTH).required(),
  description: Yup.string().min(DESCRIPTION_MIN_LENGTH).max(DESCRIPTION_MAX_LENGTH).required(),
});

export type AddGroupFormFields = Yup.InferType<typeof addGroupSchema>;

interface Props {
  show: boolean;
  onCancel: () => void;
}

const AddGroupDialog: FC<Props> = ({ show, onCancel }) => {
  const { t } = useTranslation();
  const formRef = useRef<FormikProps<AddGroupFormFields> | null>(null);
  const [canConfirm, setCanConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      formRef.current?.resetForm();
    }
  }, [show]);

  const onConfirm = () => {};

  const form = (
    <Formik
      innerRef={formRef}
      initialValues={{ title: "", description: "" }}
      validationSchema={addGroupSchema}
      onSubmit={({}, actions) => {}}
    >
      {({ values, touched, errors, ...props }) => (
        <form
          onSubmit={props.handleSubmit}
          className={clsx()}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={"false"}
        >
          <Input
            name="title"
            label={"Title"}
            block={true}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={values.title}
            error={t(errors.title!)}
            touched={touched.title}
            maxLength={TITLE_MAX_LENGTH}
          />

          <br />

          <Input
            name="description"
            label={"Short and clear description"}
            block={true}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={values.description}
            error={t(errors.description!)}
            touched={touched.description}
            maxLength={DESCRIPTION_MAX_LENGTH}
          />
        </form>
      )}
    </Formik>
  );

  return (
    <SimpleModal
      heading={"Add group"}
      body={form}
      show={show}
      canConfirm={canConfirm}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default AddGroupDialog;
