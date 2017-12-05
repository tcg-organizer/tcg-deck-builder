const express = require("express");
const htmlRouter = express.Router();
const scraper = require('pokemontcgsdk');

let cardData = [];
let specificCardData = [];

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

htmlRouter.post("/api/search/pokemon/:pokemon?", function (req, res) {

    let pokeSearch = req.params.pokemon;

    console.log(pokeSearch);

// query for a list of cards including matching the query value, pokemon
    function initialQuery(pokemon) {
        scraper.card.where({
            name: pokemon
        }).then(function(data){
            // console.log(JSON.stringify(data, null, 4));

            // we will show each card as an image and store the url of the card within the image

            res.json({cardData: data});
        });
    }

    initialQuery(pokeSearch);

    cardData = [];
});

htmlRouter.post("/api/search/id/:id?", function (req, res) {

    let pokeSearch = req.params.id;

    console.log(pokeSearch);

// query for a list of cards including matching the query value, pokemon
    function initialQuery(id) {
        scraper.card.where({
            id: id
        }).then(function(data){
            // console.log(JSON.stringify(data, null, 4));

            // we will show each card as an image and store the url of the card within the image

            res.json({cardData: data});
        });
    }

    initialQuery(pokeSearch);

    cardData = [];
});

htmlRouter.post("/api/search/url/:cardURL?", function (req, res) {

    let cardSearch = "https://www.pokemon.com/" + req.params.cardURL;

    cardSearch = cardSearch.split("+");
    cardSearch = cardSearch.join("/");

    console.log(cardSearch);

    function singleCardQuery(cardURL) {
        // query for a specific card based on a specific URL (can be received from the basic query above)

        scraper.scrapeCard(cardURL).then(function (data) {
            // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
            console.log(JSON.stringify(data, null, 4));
            // this will lead to a modal opening with displayed data from the query

           const chosenCard =
                //keys for the data
                {
                    id: data.id,
                    name: data.name,
                    image: data.image,
                    type: data.type,
                    superType: data.superType,
                    evolvesFrom: data.evolvesFrom,
                    hp: data.hp,
                    passive: data.passive,
                    abilities: data.abilities,
                    rules: data.rules,
                    color: data.color,
                    weaknesses: data.weaknesses,
                    resistances: data.resistances,
                    retreatCost: data.retreatCost
                };
                specificCardData.push(chosenCard);
                res.json(chosenCard);
        });
    }
    singleCardQuery(cardSearch);

    specificCardData = [];
});

// 404 Error Page
htmlRouter.get('/404', function (req, res) {
        res.render('404');
});

module.exports = htmlRouter;