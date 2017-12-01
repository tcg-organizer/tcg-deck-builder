const express = require("express");
const dbRouter = express.Router();
const db = require("../models/index");

dbRouter.get("/readDecks/:deck", function (req, res) {
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

dbRouter.post("/createDecks/:deck", function (req, res) {
    let deck = req.params.deck;
    db.decks.create({
        deckName: deck
    }).then(function(newDeck) {
        console.log("\n");
        console.log("------------------------");
        console.log("the deck has been Created");
        console.log(newDeck);
        console.log("------------------------");
        console.log("\n");
        res.send(newDeck);
    })
    
});

//adding a new card to your deck
dbRouter.post("/newCard/:deck", function (req, res) {
    let deck = req.params.deck;
    
    console.log(req.body.cardName);
    
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
        res.json(userDeck);
    });
    // res.send("hello");
});

//delete a card from your deck
dbRouter.delete("/deleteCard/:cardName", function (req, res) {
    let card = req.params.cardName;
    
    db.cards.destroy({
        where: {
            cardName: card,
            deckName: req.body.deckName
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


//updating a cards in your deck
// dbRouter.put("/updateCard", function (req, res) {
//     const cardQuan =
//         console.log(cardQuan);
//     if (cardQuan > 0) {
//         db.userDeck.update(req.body.quantity,
//             {
//                 where: {
//                     cardID: req.body.cardID
//                 }
//             }).then(function (updateCard) {
//             console.log("\n");
//             console.log("------------------------");
//             console.log("the card has been updated");
//             console.log(updateCard);
//             console.log("------------------------");
//             console.log("\n");
//             res.send("card has been updated");
//         })
//     }
//     else {
//         db.userDeck.destroy({
//             where: {
//                 cardID: req.body.cardID
//             }
//         }).then(function (cardDestroyed) {
//             console.log("\n");
//             console.log("------------------------");
//             console.log("the card has been removed from the deck");
//             console.log(cardDestroyed);
//             console.log("------------------------");
//             console.log("\n");
//             res.send("card has been removed from the deck");
//         })
//     }
// });


module.exports = dbRouter;