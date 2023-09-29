const deleteStudentRepo = require("../repositories/deleteStudent");
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

  if (!student) {
    res.status(404).json({ message: "No se encontró el estudiante" });
    return;
  }

  await deleteStudentRepo(document);

  res.status(204).json();
};

module.exports = {
  controller: getStudentByDocument,
  schema: schemaValidator,
};
