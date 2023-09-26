const sqlite3 = require("sqlite3");
let db;

const closeConnection = () =>
  new Promise((resolve, reject) => {
    if (!db) return resolve();

    db.close((err) => {
      if (err) {
        reject(err.message);
      }

      resolve();
      db = null;
    });
  });

const getClient = () =>
  new Promise((resolve, reject) => {
    if (db) return resolve(db);

    db = new sqlite3.Database(":memory:", (err) => {
      if (err) {
        reject(err.message);
      }

      resolve([db, closeConnection]);
    });
  });

module.exports = getClient;
