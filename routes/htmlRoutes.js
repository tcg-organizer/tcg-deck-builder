const express = require("express");
const htmlRouter = express.Router();

let cardData = [];

//this half handles the handlebars pages
htmlRouter.get("/", function (req, res) {
    res.render("index");
});

htmlRouter.get("/deckList", function (req, res) {
    res.render("deckList");
});

htmlRouter.get("/cardSearch", function (req, res) {
    res.render("cardSearch", {cardData: cardData});
});

module.exports = htmlRouter;