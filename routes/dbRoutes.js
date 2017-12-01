const express = require("express");
const dbRouter = express.Router();
const db = require("../models/index");

dbRouter.get("/db/readDecks/:deck", function (req, res) {
    let deck = req.params.deck;
    
    db.cards.findAll({
        where: {deckName: deck}
    }).then(function (readDeck) {
        console.log("\n");
        console.log("------------------------");
        console.log("the deck has been read");
        console.log(readDeck);
        console.log("------------------------");
        console.log("\n");
        res.send(readDeck);
    })
});

dbRouter.post("/db/createDecks", function (req, res) {

});

//adding a new card to your deck
dbRouter.post("/db/newCard/:deck", function (req, res) {
    let deck = req.params.deck;
    
    db.cards.create({
        cardName: req.body.cardName,
        cardData: req.body,
        deckName: deck
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
dbRouter.put("/db/updateCard", function (req, res) {
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
dbRouter.delete("/db/deleteCard/", function (req, res) {
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

module.exports = dbRouter;