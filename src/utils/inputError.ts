export const inputError = (errors: any, inputName: string) =>
  errors?.[inputName] && errors[inputName].message;
