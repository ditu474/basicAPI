const getClient = require("./getClient");

const sql = `INSERT INTO students (document,name,age,address,school) VALUES (?,?,?,?,?);`;

const createStudent = async ({ document, name, age, address, school }) => {
  const client = await getClient();

  return new Promise((resolve, reject) => {
    client.run(sql, [document, name, age, address, school], (err) => {
      if (err) reject(err);

      resolve();
    });
  });
};

module.exports = createStudent;
