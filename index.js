const express = require("express");
const path = require("path");
const PORT = 5001;
const bodyParser = require("body-parser");
const { required } = require("nodemon/lib/config");

express()
  .use(express.static(path.join(__dirname, "public")))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use("/", require("./routes/routes.js"))
  .engine("html", require("ejs").renderFile)
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "views"))
  .listen(PORT, () => console.log(`listening on ${PORT}`));


