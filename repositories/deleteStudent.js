const getClient = require("./getClient");

const sql = `DELETE FROM students WHERE document=?`;

const deleteStudent = async (document) => {
  const client = await getClient();

  return new Promise((resolve, reject) => {
    client.run(sql, [document], (err) => {
      if (err) reject(err);

      resolve();
    });
  });
};

module.exports = deleteStudent;
