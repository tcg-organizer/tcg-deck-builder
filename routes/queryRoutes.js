const express = require("express");
const pokeRouter = express.Router();
const scraper = require('pokemon-tcg-scraper');

let cardData = [];

pokeRouter.post("/search/:pokemon?", function(req, res){
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

module.exports = pokeRouter;




function singleCardQuery(cardURL) {
    // query for a specific card based on a specific URL (can be received from the basic query above)
    
    scraper.scrapeCard(cardURL).then(function (data) {
        // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
        console.log(JSON.stringify(data, null, 4));
        // this will lead to a modal opening with displayed data from the query
    });
}