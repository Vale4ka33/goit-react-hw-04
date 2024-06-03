import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Phone number is not valid")
    .required("Required"),
});

const formatPhoneNumber = (value) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");
  if (phoneNumber.length <= 3) return phoneNumber;
  if (phoneNumber.length <= 5)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    5
  )}-${phoneNumber.slice(5, 7)}`;
};

const ContactForm = ({ onAdd }) => {
  const nameField = useId();
  const numberField = useId();

  const handleSubmit = (values, actions) => {
    onAdd({ ...values, id: nanoid() });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{ id: "", name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={FormSchema}
    >
      {({ setFieldValue, values }) => (
        <Form className={css.formContainer}>
          <label htmlFor={nameField}>Name</label>
          <Field className={css.input} type="text" name="name" id={nameField} />
          <ErrorMessage className={css.error} name="name" component="span" />

          <label htmlFor={numberField}>Number</label>
          <Field
            className={css.input}
            type="text"
            name="number"
            id={numberField}
            value={values.number}
            onChange={(e) => {
              const formattedPhoneNumber = formatPhoneNumber(e.target.value);
              setFieldValue("number", formattedPhoneNumber);
            }}
          />
          <ErrorMessage className={css.error} name="number" component="span" />

          <button className={css.btn} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
