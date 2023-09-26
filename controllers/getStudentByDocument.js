const getStudentRepository = require("../repositories/getStudentByDocument");

const schemaValidator = {
  type: "object",
  properties: {
    query: {
      type: "object",
      properties: {
        document: {
          type: "number",
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

  res.send(200, { student });
};

module.exports = {
  controller: getStudentByDocument,
  schema: schemaValidator,
};
