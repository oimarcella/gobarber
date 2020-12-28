import { ValidationError } from 'yup';
import { getValueAndUnit } from 'polished';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}
