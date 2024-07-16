import { setLocale } from 'yup';

export const setYupLocale = () => {
  setLocale({
    mixed: {
      default: 'Invalid value',
      required: 'Value is required',
      notType: 'Invalid value format',
      oneOf: 'Invalid value',
      defined: 'Invalid value',
      notOneOf: 'Invalid value',
    },
    string: {
      email: 'Not valid email',
      matches: 'Invalid value format',
      max: 'Value is too long',
      min: 'Value is too short',
      length: 'Invalid length',
    },
    number: {
      positive: 'Value must be positive',
      min: 'Value too small',
      max: 'Value too big',
    },
  });
};
