const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname)));

app.post("/user", function (req, res) {
  const newUser = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };

  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).json({ message: "Error reading file" });
    }

    const users = data ? JSON.parse(data) : [];
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing file" });
      }

      res.status(200).json({
        message: "File successfully written",
      });
    });
  });
});

app.post("/login", function (req, res) {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u.userEmail === userEmail && u.userPassword === userPassword);

    if (user) {
      res.status(200).json({
        message: "Login successful",
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  });
});

const serverIP = "127.0.0.1";
const port = 3000;

app.listen(port, serverIP, function () {
  console.log(`Server is running at http://${serverIP}:${port}`);
});
