const getClient = require("./getClient");
const getStudentByDocument = require("./getStudentByDocument");

const sql = `UPDATE students SET name=?, age=?, address=?, school=? WHERE document=?`;

const updateStudent = async ({ document, name, age, address, school }) => {
  const client = await getClient();

  return new Promise((resolve, reject) => {
    client.run(sql, [name, age, address, school, document], (err) => {
      if (err) reject(err);

      resolve();
    });
  });
};

module.exports = updateStudent;
