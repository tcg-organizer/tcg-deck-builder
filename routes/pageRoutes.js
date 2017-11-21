const express = require("express");
const pageRouter = express.Router();

var pokemon = { pokemon: "sandshrew"};

pageRouter.get("/", function (req, res) {
    // res.render("index", pokemon);
});

pageRouter.get("/deckList", function(req, res) {
    // res.render("some handlebars page for deck list", some object);
});

pageRouter.get("/cardSearch", function(req, res) {
    // res.render("some handlebars page card search", some object );
});

module.exports = pageRouter;
