const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const { config } = require("dotenv");
const port = process.env.port || 8000;
require("dotenv").config;
var app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "twitter",
  multipleStatements: true,
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.listen(port, () => {
  console.log(`Server is up on http://127.0.0.1:${port}`);
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//======================GET===========================//
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/register", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("signin");
});

app.get("/home", (req, res) => {
  res.render("home");
});
//======================POST===========================//
app.post("/register", async (req, res) => {
  console.log(req.body);

  username = req.body.name;
  number = req.body.number;
  email = req.body.email;
  dob = req.body.dob;
  plainpassword = req.body.password.toString();

  if (!(username && number && email && dob && plainpassword)) {
    req.status(400).send("All field is required");
  }

  var password = await (await bcrypt.hash(plainpassword, 10)).toString();

  const user = {
    FullName: username,
    Email: email,
    Password: password,
    Number: number,
    Dob: dob,
  };
  console.log(user);
  connection.query(`INSERT INTO User SET ?`, user, (err, res) => {
    if (err) throw err;
  });
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log("email and pass", email, password);
    if (email && password) {
      connection.query(
        `SELECT * FROM User WHERE Email='${email}'`,
        (err, result) => {
          if (err) throw err;
          console.log("result....", result[0]);
          bcrypt.compare(password, result[0].Password, (err, isMatched) => {
            if (err) throw err;
            if (isMatched) {
              let token = jwt.sign(
                { email: email, password: password },
                "hello",
                { expiresIn: "7d" }
              );
              console.log("tokne is: ", token);
              res.render("home", { token });
            }
          });
        }
      );
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
});

// vikr
