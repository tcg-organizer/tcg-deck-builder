const express = require("express");
const pokeRouter = express.Router();

// const pokemon = { pokemon: "sandshrew"};
const cardData = require("../public/assets/js/queries");

//this half handles the handlebars pages
pokeRouter.get("/", function (req, res) {
    res.render("index");
});

pokeRouter.get("/deckList", function (req, res) {
    res.render("deckList");
});

pokeRouter.get("/cardSearch", function (req, res) {
    res.render("cardSearch", {cardData: cardData});
});


//this half will handle api requests

//adding a new card to your deck
pokeRouter.post("/api/newCard", function (req, res) {
    db.userDeck.create({
        deckName: req.body.deckName,
        cardID: req.body.cardID,
        cardName: req.body.cardName,
        cardImg: req.body.cardImg,
        cardData: req.body,
        quantity: req.body.quantity
    }).then(function (userDeck) {
        console.log("\n");
        console.log("------------------------");
        console.log("the card has been logged");
        console.log(userDeck);
        console.log("------------------------");
        console.log("\n");
        res.send("card had been stored in your deck");
    });
});

//updating a cards in your deck
pokeRouter.put("/api/updateCard", function (req, res) {
    const cardQuan =
        console.log(cardQuan);
    if (cardQuan > 0) {
        db.userDeck.update(req.body.quantity,
            {
                where: {
                    cardID: req.body.cardID
                }
            }).then(function (updateCard) {
            console.log("\n");
            console.log("------------------------");
            console.log("the card has been updated");
            console.log(updateCard);
            console.log("------------------------");
            console.log("\n");
            res.send("card has been updated");
        })
    }
    else {
        db.userDeck.destroy({
            where: {
                cardID: req.body.cardID
            }
        }).then(function (cardDestroyed) {
            console.log("\n");
            console.log("------------------------");
            console.log("the card has been removed from the deck");
            console.log(cardDestroyed);
            console.log("------------------------");
            console.log("\n");
            res.send("card has been removed from the deck");
        })
    }
    
    
});

//delete a card from your deck
pokeRouter.delete("/api/deleteCard/", function (req, res) {
    db.userDeck.destroy({
        where: {
            cardID: req.body.cardID
        }
    }).then(function (cardDestroyed) {
        console.log("\n");
        console.log("------------------------");
        console.log("the card has been removed from the deck");
        console.log(cardDestroyed);
        console.log("------------------------");
        console.log("\n");
        res.send("card has been removed from the deck");
    })
});

function deleteCard() {

}

module.exports = pokeRouter;

