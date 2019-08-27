const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "mail.html"));
});

app.post("/send", (req, res) => {
  res.sendFile(path.join(__dirname, "mail.html"));

  var transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    auth: {
      user: "thanveer.bharathi@gmail.com",
      pass: "bharathi@123"
    }
  });

  var mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(8080, () => console.log("Server Running"));
