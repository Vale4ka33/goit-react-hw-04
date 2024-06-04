import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={css.error}>
      An error occurred. Please try reloading the page.
    </p>
  );
};

export default ErrorMessage;
