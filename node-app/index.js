const express = require('express');
const app = express();

const config = {
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'nodedb'
  }
const mysql = require('mysql');
const conn = mysql.createConnection(config);

app.get('/', async (_, res) => {
  const selectSql = `SELECT * FROM people`;
  const people = conn.query(selectSql);

  const title = '<h1>Full Cycle Rocks!</h1>';
  const list = `
    <ul>
      ${people.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `;

  res.send(title + list);
});

app.listen(3000, () => {
  console.log('Running on port 3000');

  const createSql = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));`;
  conn.query(createSql);
  
  const insertSql = `INSERT INTO people (name) values ('John Doe');`;
  conn.query(insertSql);
});