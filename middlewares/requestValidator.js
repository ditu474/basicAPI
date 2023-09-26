const Ajv = require("ajv");
const ajv = new Ajv();

const requestValidator = (schemaValidator) => (req, res, next) => {
  const validate = ajv.compile(schemaValidator);
  const valid = validate(req);

  if (valid) return next();

  res.status(400).json({ errors: validate.errors });
};

module.exports = requestValidator;
