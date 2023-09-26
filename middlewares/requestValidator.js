const Ajv = require("ajv");
const ajv = new Ajv();

const requestValidator = (schemaValidator) => (req, res, next) => {
  const validate = ajv.compile(schemaValidator);
  const valid = validate(req);

  if (valid) return next();

  res.send(404, { errors: validate.errors });
};

module.exports = requestValidator;
