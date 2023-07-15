const sanitizeUserEmailInput = (input) => {
  const sanitizedInput = input.replace(/[^a-zA-Z0-9@._-]/g, "");
  return sanitizedInput;
};

const sanitizeUserInput = (input) => {
  const sanitizedInput = input.replace(/[^a-zA-Z0-9]/g, '');
  return sanitizedInput;
};

module.exports = {
  sanitizeUserEmailInput,
  sanitizeUserInput,
};
