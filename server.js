const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "Testing",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected...");

  app.get("/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "DAFTAR MAHASISWA" });
    });
  });

  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO mahasiswa (NIM, Nama_Lengkap, Kelas) VALUES ('${req.body.NIM}', '${req.body.Nama_Lengkap}', '${req.body.Kelas}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("server ready...");
});
