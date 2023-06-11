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

app.get('/', async (_, res) => {
  const conn = mysql.createConnection(config);
  conn.query(
    'Select * from people;',
    function (error, results, fields) {
      let text = '<h1>Full Cycle Rocks!</h1><br /><ul>';
      for (const user of results) {
        text += `<li>${user.name}</li>`;
      }
      text += '</ul>';
    
      return res.send(text);
    }
  );
});

app.listen(3000, () => {
  console.log('Running on port 3000');

  const conn = mysql.createConnection(config);

  const createSql = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));`;
  conn.query(createSql);

  const insertSql = `INSERT INTO people (name) values ('John Doe');`;
  conn.query(insertSql);

  conn.end();
});