const express = require("express");
const htmlRouter = express.Router();
const scraper = require('pokemon-tcg-scraper');
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

htmlRouter.post("/api/search/:pokemon?", function (req, res) {
    let pokeSearch = req.params.pokemon;
    
    console.log(pokeSearch);

// query for a list of cards including matching the query value, pokemon
    function initialQuery(pokemon) {
        scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function (data) {
            
            // returns an object with the following information: numPages, cards
            console.log(JSON.stringify(data, null, 4));
            
            // we will show each card as an image and store the url of the card within the image
            
            const cards = data.cards;
            for (let i = 0; i < cards.length; i++) {
                // data is sent to cardSearch.handlebars for display
                // each displayed card has a stored URL used for a second query when clicked
                const newCard = {
                    url: cards[i].url,
                    image: cards[i].image,
                    id: cards[i].id,
                    query: function () {
                        singleCardQuery(this.url);
                    }
                };
                cardData.push(newCard);
            }
        });
    }
    
    initialQuery(pokeSearch);
    res.render("cardSearch", {cardData: cardData});
    cardData = [];
});

htmlRouter.post("/api/search/:cardURL?", function (req, res) {
    let cardSearch = req.params.cardURL;
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
        });
    }
    singleCardQuery(cardSearch);
    res.send("cardSearch", {specificCardData: specificCardData});
    specificCardData = [];
});

module.exports = htmlRouter;