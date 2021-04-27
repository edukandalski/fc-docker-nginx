const names = require("./names.json");
const express = require("express");
const mysql = require("mysql");

const conf = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

let con = mysql.createConnection(conf);

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// initialize DB tables and initial data
con.query(
  "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id) )",
  (err) => {
    if (err) throw err;
    console.log("Table created!");
  }
);

con.query("TRUNCATE TABLE people", (err) => {
  if (err) throw err;
  console.log("Table data cleared!");
});

con.end();

const random_name = () => {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
};

const app = express();

app.get("/", (req, res) => {
  // insert new name
  con = mysql.createConnection(conf);
  con.connect((err) => {
    if (err) res.status(500).send("DB error!");

    con.query(`INSERT INTO people (name) VALUES ('${random_name()}')`);
    con.query("SELECT name FROM people", (err, result) => {
      if (err) res.status(500).send("DB error!");
      con.end();
      let html = "<h1>Full Cycle Rocks!</h1>";
      html = html.concat("<p>List of names<ul>");
      result.forEach((element) => {
        html = html.concat(`<li>${element.name}</li>`);
      });
      html = html.concat("</ul></p>");
      res.send(html);
    });
  });
});

app.listen(3000, () => console.log("Server running!"));
