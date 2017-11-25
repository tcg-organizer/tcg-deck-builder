// uses pokemon tcg scraper npm
const scraper = require('pokemon-tcg-scraper');


// declaration of variables for later use, pokemon for query value and cardURL from the query
var pokemon;
var cardURL;

// On click function to grab search value after page load
$(function() {
    $("#submit").on("click", function(event){
        event.preventDefault();

        var searchValue = $("#search").val().trim();

        if (searchValue !== ""){

            pokemon = searchValue;
            // spaces are replaced with "-" to match query syntax
            pokemon = pokemon.replace(" ","-");

            //runs a query
            initialQuery();
        }
    })
});

var pokemonExample = "blastoise-ex";

// query for a list of cards including matching the query value, pokemon
function initialQuery(){
    scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function(card){

        // returns an object with the following information: numPages, cards
        console.log(JSON.stringify(card,null,4));

        // we will show each card as an image and store the url of the card within the image

        var cards = card.cards;
        for (var i = 0; i < cards.length; i++){
            // data is sent to cardSearch.handlebars for display
            // each displayed card has a stored URL used for a second query when clicked
        }

    });
}

function singleCardQuery() {
    // query for a specific card based on a specific URL (can be received from the basic query above)

    scraper.scrapeCard(cardURL).then(function(card){
        // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
        console.log(JSON.stringify(card, null, 4));
    });
}