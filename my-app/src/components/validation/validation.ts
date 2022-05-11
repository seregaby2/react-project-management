const REQUIRED = 'required to fill';

export const loginValidation = {
  required: REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^[a-zA-Z][a-zA-Z0-9-_\.]/)) {
      return 'Can be English letters and numbers';
    }
    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      return 'min length 8, min 1 English letter and 1 digit';
    }
    return true;
  },
};

export const nameValidation = {
  required: REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^[a-zA-Z]/)) {
      return 'only English letters';
    }
    return true;
  },
};
