// uses pokemon tcg scraper npm
// const scraper = require('pokemon-tcg-scraper');

// declaration of variables for later use
var pokemon;
var cardArray = [];

// On click function to grab search value after page load
$(function () {
    $("#submit").on("click", function (event) {
        event.preventDefault();

        // empties cardArray from previous searches
        cardArray = [];

        var searchValue = $("#search").val().trim();

        if (searchValue !== "") {

            pokemon = searchValue;
            // spaces are replaced with "-" to match query syntax
            pokemon = pokemon.replace(" ", "-");

            //runs a query
            initialQuery(pokemon);
        }
    })
});

// example variables for use in testing
var pokemonExample = "blastoise";
var cardURLExample = "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/bw-series/bw7/31/";

// query for a list of cards including matching the query value, pokemon
function initialQuery(pokemon) {
    scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function (data) {

        // returns an object with the following information: numPages, cards
        console.log(JSON.stringify(data, null, 4));

        // we will show each card as an image and store the url of the card within the image

        var cards = data.cards;
        for (var i = 0; i < cards.length; i++) {
            // data is sent to cardSearch.handlebars for display
            // each displayed card has a stored URL used for a second query when clicked
            var newCard = {
                url: cards[i].url,
                image: cards[i].image,
                id: cards[i].id,
                query: function () {
                    singleCardQuery(this.url);
                }
            };
            cardArray.push(newCard);
        }
    });
}

function singleCardQuery(cardURL) {
    // query for a specific card based on a specific URL (can be received from the basic query above)

    scrapeCard(cardURL).then(function (data) {
        // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
        console.log(JSON.stringify(data, null, 4));
        // this will lead to a modal opening with displayed data from the query
    });
}


