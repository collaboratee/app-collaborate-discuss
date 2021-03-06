const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name required to continue";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email required to continue";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Please specify a valid email address";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password required to continue";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
