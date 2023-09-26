require("dotenv").config();
const express = require("express");
const app = express();

const requestValidator = require("./middlewares/requestValidator");
const errorController = require("./controllers/errorController");
const {
  controller: getStudentByDocument,
  schema: getStudentByDocumentSchema,
} = require("./controllers/getStudentByDocument");
const {
  controller: createStudent,
  schema: createStudentSchema,
} = require("./controllers/createStudent");

app.use(express.json());

app.get(
  "/student",
  requestValidator(getStudentByDocumentSchema),
  getStudentByDocument,
);
app.post("/student", requestValidator(createStudentSchema), createStudent);

app.all("*", (req, res, next) => {
  next(`No se encontró ${req.originalUrl} en este servidor`);
});

app.use(errorController);

module.exports = app;
