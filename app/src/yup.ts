import { setLocale } from "yup";

interface YupLocale {
  mixed?: {
    default?: string;
    required?: string;
    oneOf?: string;
    notOneOf?: string;
  };
  string?: {
    length?: string;
    min?: string;
    max?: string;
    email?: string;
    url?: string;
    trim?: string;
    lowercase?: string;
    uppercase?: string;
  };
  number?: {
    min?: string;
    max?: string;
    lessThan?: string;
    moreThan?: string;
    notEqual?: string;
    positive?: string;
    negative?: string;
    integer?: string;
  };
  date?: {
    min?: string;
    max?: string;
  };
  array?: {
    min?: string;
    max?: string;
  };
}
const translation: YupLocale = {
  string: {
    email: "ERRORS.INVALID_EMAIL",
    min: "ERRORS.TOO_SHORT",
    max: "ERRORS.TOO_LONG",
  },
  mixed: {
    required: "ERRORS.REQUIRED",
  },
};

setLocale(translation);
