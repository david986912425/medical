const sanitizeUserEmailInput = (input) => {
  return input.replace(/[^a-zA-Z0-9@._-]/g, "");
};

const sanitizeUserInput = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, '');
};

module.exports = {
  sanitizeUserEmailInput,
  sanitizeUserInput,
};
