const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require('express-handlebars');
const db = require("./models");

const app = express();
var PORT = process.env.PORT || 8080;

//bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//handlebars setup
app.engine("handlebars", hbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

//connects to DB before connection to server
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});