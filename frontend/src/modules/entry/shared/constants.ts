export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
    message: 'Please enter valid email'
  }
};

export const passValidation = {
  required: 'Password is required',
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'Only latin chars are allowed';
    }
    return true;
  }
};
