import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

// returns a object with all erros occurred
// containing name field and its
// error message
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}
