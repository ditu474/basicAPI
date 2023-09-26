const Student = require("../models/Student");
const getClient = require("./getClient");

const sql = `SELECT * FROM students WHERE document = ?`;

const getStudentByDocument = async (document) => {
  const [client, close] = await getClient();

  return new Promise((resolve, reject) => {
    client.each(sql, [document], (err, row) => {
      if (err) reject(err);

      resolve(new Student(...row));
      close();
    });
  });
};

module.exports = getStudentByDocument;
