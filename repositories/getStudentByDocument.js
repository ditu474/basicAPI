const Student = require("../models/Student");
const getClient = require("./getClient");

const sql = `SELECT * FROM students WHERE document = ?`;

const getStudentByDocument = async (document) => {
  const client = await getClient();

  return new Promise((resolve, reject) => {
    client.get(sql, [document], (err, row) => {
      if (err) reject(err);

      if (!row) resolve(null);
      else resolve(new Student(...row));
    });
  });
};

module.exports = getStudentByDocument;
