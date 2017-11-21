// uses pokemon tcg scraper npm
var scraper = require('pokemon-tcg-scraper');

// query for a list of cards including the query value
// example within

// var pokemon = $("#search").value().trim();
// pokemon = pokemon.replace(" ","-");
var pokemon = "blastoise-ex";
var pokemonURL;

scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function(card){
    // returns an object with the following information: numPages, cards
    console.log(JSON.stringify(card,null,4));
    // we will show each card as an image and store the url of the card within the image
    var cards = card.cards;
    for (var i = 0; i < cards.length; i++){
        // create a container showing image and maybe the id and append it to some existing container
        var newContainer;
    }
    // when clicked, the stored url will be used to query for the specific card for display

});

// query for a specific card based on a specific URL (can be received from the basic query above)
// example within
scraper.scrapeCard("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xyp/XY30/").then(function(card){
    // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
    console.log(JSON.stringify(card, null, 4));
});