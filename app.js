const express = require("express");
const app = express();
const router = require("./routes");
// use middl for data json and urlEncoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use dispatch router
app.use(router);
// export app callback
module.exports = app;
