const express = require('express');
const { startDB, db } = require('./db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4200;

app.get('/api/departments', async (req, res, next) => {
  const { rows } = await db.query(`
    SELECT name FROM departments;
  `);

  res.send({
    departments: rows,
  });
})

const getAllComplaints = async () => {
  const { rows } = await db.query(`
    SELECT date, content, departments.name as "departmentName" 
    FROM complaints
    JOIN departments ON complaints.departmentId = departments.id;
  `);

  return rows;
}

app.get('/api/complaints', async (req, res, next) => {
  const complaints = await getAllComplaints();

  res.send({
    complaints,
  });
});

app.post('/api/complaints', async (req, res, next) => {
  const { date, content, departmentName } = req.body;

  await db.query(`
    INSERT INTO complaints (date, content, departmentId)
    VALUES ($1, $2, (
        SELECT id 
        FROM departments 
        WHERE name = $3
        LIMIT 1
    ));
  `, [date, content, departmentName]);

  const complaints = await getAllComplaints();

  res.send({
    complaints,
  });
});

const startServer = () => {
  app.listen(PORT, async () => {
    console.log('Server is now listening on PORT', PORT);

    await startDB();

    console.log('Server is now ready to serve.');
  });
}

startServer();
