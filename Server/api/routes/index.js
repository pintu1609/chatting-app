const express = require("express");
const app = express();

const user = require("./auth/user");
const message = require("./contact/message");
const contact = require("./contact/contact");
const upload = require("./upload.js");

app.use("/user", user);
app.use("/messages", message);
app.use("/contact", contact);
app.use("/uploader", upload);

module.exports = app;
