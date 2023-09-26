const sqlite3 = require("sqlite3").verbose();
let db;

const createDatabase = (resolve) => {
  db = new sqlite3.Database("crudAPI.db", (err) => {
    if (err) {
      console.log("Getting error " + err);
      exit(1);
    }

    db.exec(`
      CREATE TABLE IF NOT EXISTS students (
        document TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        school TEXT NOT NULL
      )
    `);

    resolve(db);
  });
};

const getClient = () =>
  new Promise((resolve) => {
    if (db) return resolve(db);

    db = new sqlite3.Database("crudAPI.db", sqlite3.OPEN_READWRITE, (err) => {
      if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase(resolve);
        return;
      } else if (err) {
        console.log("Error opening DB: " + err);
        exit(1);
      }

      resolve(db);
    });
  });

module.exports = getClient;
