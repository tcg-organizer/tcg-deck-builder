const express = require("express");
const bodyParser = require("body-parser");
const hbars = require('express-handlebars');
const db = require("./models");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

//bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//handlebars setup
app.engine("handlebars", hbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

//html route
const routes = require("./routes");

//html route in use
app.use("/", routes);

//connects to DB before connection to server
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});