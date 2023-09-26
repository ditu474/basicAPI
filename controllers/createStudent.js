const Student = require("../models/Student");
const createStudentRepo = require("../repositories/createStudent");

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
      required: ["document", "name", "age", "address", "school"],
    },
  },
  required: ["body"],
};

const createStudent = async (req, res) => {
  const { document, name, age, address, school } = req.body;

  try {
    await createStudentRepo({ document, name, age, address, school });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT" && err.message.includes("UNIQUE")) {
      res.status(400).json({ message: "El estudiante ya existe" });
      return;
    }

    res.status(500).json({ message: "Error al crear el estudiante" });
  }

  res
    .status(201)
    .json({ student: new Student(document, name, age, address, school) });
};

module.exports = {
  controller: createStudent,
  schema: schemaValidator,
};
