const express = require("express");
const pokeRouter = express.Router();

// const pokemon = { pokemon: "sandshrew"};


//this half handles the handlebars pages
pokeRouter.get("/", function (req, res) {
    res.render("index");
});

pokeRouter.get("/deckList", function(req, res) {
    res.render("deckList");
});

pokeRouter.get("/cardSearch", function(req, res) {
    res.render("cardSearch");
});



//this half will handle api requests

//adding a new card to your deck
pokeRouter.post("/api/",function(req, res) {

});

//updating a cards in your deck
pokeRouter.put("/api/",function(req, res) {

});

//delete a card from your deck
pokeRouter.delete("/api/",function(req, res) {

});


module.exports = pokeRouter;

