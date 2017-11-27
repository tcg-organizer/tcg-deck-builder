

// declaration of variables for later use

var cardArray = module.exports = [];

var benchArray = [
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xyp/XY30/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY30.png",
        "id": "xyp/XY30"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xyp/XY122/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY122.png",
        "id": "xyp/XY122"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xy1/29/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_29.png",
        "id": "xy1/29"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xy1/30/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_30.png",
        "id": "xy1/30"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xy1/142/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_142.png",
        "id": "xy1/142"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/ex-series/ex6/104/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/EX6/EX6_EN_104.png",
        "id": "ex6/104"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/g1/17/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/G1/G1_EN_17.png",
        "id": "g1/17"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/g1/18/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/G1/G1_EN_18.png",
        "id": "g1/18"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/ex-series/ex14/2/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/EX14/EX14_EN_2.png",
        "id": "ex14/2"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/ex-series/ex14/14/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/EX14/EX14_EN_14.png",
        "id": "ex14/14"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xy12/21/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/XY12/XY12_EN_21.png",
        "id": "xy12/21"
    },
    {
        "url": "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/xy-series/xy12/22/",
        "image": "https://assets.pokemon.com/assets/cms2/img/cards/web/XY12/XY12_EN_22.png",
        "id": "xy12/22"
    }
];


// // example variables for use in testing
// var pokemonExample = "blastoise";
// var cardURLExample = "http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/bw-series/bw7/31/";
//
// // query for a list of cards including matching the query value, pokemon
// function initialQuery(pokemon) {
//     scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function (data) {
//
//         // returns an object with the following information: numPages, cards
//         console.log(JSON.stringify(data, null, 4));
//
//         // we will show each card as an image and store the url of the card within the image
//
//         var cards = data.cards;
//         for (var i = 0; i < cards.length; i++) {
//             // data is sent to cardSearch.handlebars for display
//             // each displayed card has a stored URL used for a second query when clicked
//             var newCard = {
//                 url: cards[i].url,
//                 image: cards[i].image,
//                 id: cards[i].id,
//                 query: function () {
//                     singleCardQuery(this.url);
//                 }
//             };
//             cardArray.push(newCard);
//         }
//     });
// }
//
// function singleCardQuery(cardURL) {
//     // query for a specific card based on a specific URL (can be received from the basic query above)
//
//     scraper.scrapeCard(cardURL).then(function (data) {
//         // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
//         console.log(JSON.stringify(data, null, 4));
//         // this will lead to a modal opening with displayed data from the query
//     });
// }
//
// console.log(initialQuery("blastoise"))

