require("dotenv").config();
const express = require("express");
const app = express();

const requestValidator = require("./middlewares/requestValidator");
const {
  controller: getStudentByDocument,
  schema: getStudentByDocumentSchema,
} = require("./controllers/getStudentByDocument");

app.get(
  "/student",
  requestValidator(getStudentByDocumentSchema),
  getStudentByDocument,
);

module.exports = app;
