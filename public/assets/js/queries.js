// uses pokemon tcg scraper npm
var scraper = require('pokemon-tcg-scraper');

// query for a list of cards including the query value
// example within
var pokemon = "blastoise-ex";

scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function(card){
    console.log(JSON.stringify(card,null,4));
});

// query for a specific card based on a specific URL (can be received from the basic query above)
// example within
scraper.scrapeCard("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xyp/XY30/").then(function(card){
    console.log(JSON.stringify(card, null, 4));
});