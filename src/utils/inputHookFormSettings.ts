import { regexEmail } from "../utils/regex";
const notBeEmpty = "The field must not be empty.";
const minSixCharacters = "field must be at least 6 characters.";

export const emailInputSettings = {
  required: notBeEmpty,
  pattern: {
    value: regexEmail,
    message: "Email may contain only letters, apostrophe, dash and spaces.",
  },
};
export const passwordInputSettings = {
  required: notBeEmpty,
  minLength: {
    value: 6,
    message: minSixCharacters,
  },
};

export const loginInputSettings = {
  required: notBeEmpty,
  minLength: {
    value: 6,
    message: minSixCharacters,
  },
};

// export const avatarInputSettings = {
//   required: notBeEmpty,
// };

export const notBeEmptyInputSettings = {
  required: notBeEmpty,
};

export const repeatPasswordInputSettings = (password: string) => ({
  ...passwordInputSettings,
  validate: {
    validate: (value: string) => {
      if (value !== password)
        return "The value does not match the 'password' field";
    },
  },
});
