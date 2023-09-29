const updateStudentRepo = require("../repositories/updateStudent");
const getStudentByDocumentRepo = require("../repositories/getStudentByDocument");

const schemaValidator = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        document: { type: "string", pattern: "^[0-9]{8,10}$" },
        name: { type: "string" },
        age: { type: "string" },
        address: { type: "string" },
        school: { type: "string" },
      },
      required: ["document"],
    },
  },
  required: ["body"],
};

const updateStudent = async (req, res) => {
  const { document, name, age, address, school } = req.body;

  try {
    const savedStudent = await getStudentByDocumentRepo(document);
    if (!savedStudent) {
      res.status(400).json({ message: "El estudiante no existe" });
      return;
    }

    const newStudent = {
      document: savedStudent.document,
      name: name || savedStudent.name,
      age: age || savedStudent.age,
      address: address || savedStudent.address,
      school: school || savedStudent.school,
    };

    await updateStudentRepo(newStudent);

    res.status(200).json({ student: newStudent });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el estudiante" });
  }
};

module.exports = {
  controller: updateStudent,
  schema: schemaValidator,
};
