const getStudentRepository = require("../repositories/getStudentByDocument");

const schemaValidator = {
  type: "object",
  properties: {
    query: {
      type: "object",
      properties: {
        document: {
          type: "string",
          pattern: "^[0-9]{8,10}$",
        },
      },
      required: ["document"],
    },
  },
  required: ["query"],
};

const getStudentByDocument = async (req, res) => {
  const document = req.query.document;
  const student = await getStudentRepository(document);

  res.status(200).json({ student });
};

module.exports = {
  controller: getStudentByDocument,
  schema: schemaValidator,
};
