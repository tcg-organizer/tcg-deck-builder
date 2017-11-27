// const express = require("express");
// const pokeRouter = express.Router();
// const query = require('./queries');
//
// // uses pokemon tcg scraper npm
// const scraper = require('pokemon-tcg-scraper');
//
// // const pokemon = { pokemon: "sandshrew"};
// let cardData = [];
//
// //this half handles the handlebars pages
// pokeRouter.get("/", function (req, res) {
//     res.render("index");
// });
//
// pokeRouter.get("/deckList", function (req, res) {
//     res.render("deckList");
// });
//
// pokeRouter.get("/cardSearch", function (req, res) {
//     res.render("cardSearch", {cardData: cardData});
// });
//
// pokeRouter.post("/api/search/:pokemon?", function(req, res){
//     let pokeSearch = req.params.pokemon;
//
//     console.log(pokeSearch);
//
// // query for a list of cards including matching the query value, pokemon
//     function initialQuery(pokemon) {
//         scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function (data) {
//
//             // returns an object with the following information: numPages, cards
//             console.log(JSON.stringify(data, null, 4));
//
//             // we will show each card as an image and store the url of the card within the image
//
//             const cards = data.cards;
//             for (let i = 0; i < cards.length; i++) {
//                 // data is sent to cardSearch.handlebars for display
//                 // each displayed card has a stored URL used for a second query when clicked
//                 const newCard = {
//                     url: cards[i].url,
//                     image: cards[i].image,
//                     id: cards[i].id,
//                     query: function () {
//                         singleCardQuery(this.url);
//                     }
//                 };
//
//                 cardData.push(newCard);
//             }
//         });
//     }
//
//     function singleCardQuery(cardURL) {
//         // query for a specific card based on a specific URL (can be received from the basic query above)
//
//         scraper.scrapeCard(cardURL).then(function (data) {
//             // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
//             console.log(JSON.stringify(data, null, 4));
//             // this will lead to a modal opening with displayed data from the query
//         });
//     }
//
//     initialQuery(pokeSearch);
//     res.render("cardSearch");
//     cardData = [];
//     location.reload();
// });
//
// //this half will handle api requests
//
// //adding a new card to your deck
// pokeRouter.post("/api/newCard", function (req, res) {
//     db.userDeck.create({
//         deckName: req.body.deckName,
//         cardID: req.body.cardID,
//         cardName: req.body.cardName,
//         cardImg: req.body.cardImg,
//         cardData: req.body,
//         quantity: req.body.quantity
//     }).then(function (userDeck) {
//         console.log("\n");
//         console.log("------------------------");
//         console.log("the card has been logged");
//         console.log(userDeck);
//         console.log("------------------------");
//         console.log("\n");
//         res.send("card had been stored in your deck");
//     });
// });
//
// //updating a cards in your deck
// pokeRouter.put("/api/updateCard", function (req, res) {
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
//
//
// });
//
// //delete a card from your deck
// pokeRouter.delete("/api/deleteCard/", function (req, res) {
//     db.userDeck.destroy({
//         where: {
//             cardID: req.body.cardID
//         }
//     }).then(function (cardDestroyed) {
//         console.log("\n");
//         console.log("------------------------");
//         console.log("the card has been removed from the deck");
//         console.log(cardDestroyed);
//         console.log("------------------------");
//         console.log("\n");
//         res.send("card has been removed from the deck");
//     })
// });
//
// module.exports = pokeRouter;
//
