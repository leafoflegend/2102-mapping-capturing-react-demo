const { Client } = require('pg');

const db = new Client('postgres://localhost:5432/2102-complaints');

const startDB = async (closeDBAfterSeed) => {
  console.log('Connecting to DB...');

  await db.connect();

  await db.query(`
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE complaints (
  id SERIAL PRIMARY KEY,
  date INT NOT NULL,
  content VARCHAR(255) NOT NULL,
  departmentId INT NOT NULL REFERENCES departments("id")
);

INSERT INTO departments (name) 
VALUES ('Human Resources'), ('Information Technology'), ('Maintenance');
  `);

  if (closeDBAfterSeed) {
    await db.end();

    console.log('Connection closed to DB.');
  } else {
    console.log('Connection complete!');
  }
}

module.exports = {
  startDB,
  db,
};
