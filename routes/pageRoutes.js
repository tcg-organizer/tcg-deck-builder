const express = require("express");
const pageRouter = express.Router();

const pokemon = { pokemon: "sandshrew"};

pageRouter.get("/", function (req, res) {
    // res.render("index", pokemon);
});

pageRouter.get("/deckList", function(req, res) {
    res.render("deckList", );
});

pageRouter.get("/cardSearch", function(req, res) {
    res.render("cardSearch", );
});

module.exports = pageRouter;
