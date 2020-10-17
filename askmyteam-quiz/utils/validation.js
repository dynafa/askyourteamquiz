const validator = require('node-validator');

const userQueries = require('../queries/userQueries');

// just a validation test run before importing the rest of the validation code over
// this needs to be in the middleware folder

// function validateDOB(DOB){}

const userValidationRules = (req, res, next) => {
  return [
    // username must be at least 5 characters
    body('username')
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 characters long'),
    // email must be an email and custom sanitisation to check email is not in use
    
    // password must be at least 5 characters
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
    // phone number must be numeric
    
  ];
};



const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  
  validate,
};