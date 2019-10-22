export const validateZipCode = (userInput: string) => {
  const regexpNumber = new RegExp('^[+ 0-9]{5}$');
  return regexpNumber.test(userInput);
};

export const validateEmailAddress = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regexpEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  return regexpEmail.test(email);
};

export const validatePrice = (userInput: string) => {
  const regexpNumber = new RegExp('^[0-9]+$');
  return regexpNumber.test(userInput);
};

export const validateServiceArea = (userInput: string) => {
  const regexpNumber = new RegExp('^[0-9]+$');
  return regexpNumber.test(userInput);
};

export const validateYearsOfExperience = (userInput: string) => {
  const regexpNumber = new RegExp('^[0-9]{2}$');
  return regexpNumber.test(userInput);
};
