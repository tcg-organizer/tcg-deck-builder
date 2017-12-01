const express = require("express");
const htmlRouter = express.Router();
const scraper = require('pokemon-tcg-scraper');
const passport = require('passport');


let cardData = [];
let specificCardData = [];

//this half handles the handlebars pages
htmlRouter.get("/", function (req, res, next) {
    res.render("index.handlebars");
});

htmlRouter.get("/deckList", function (req, res) {
    res.render("deckList.handlebars");
});

htmlRouter.get("/cardSearch", function (req, res) {
    res.render("cardSearch.handlebars", {cardData: cardData});
});

htmlRouter.post("/api/search/pokemon/:pokemon?", function (req, res) {

    let pokeSearch = req.params.pokemon;

    // console.log(pokeSearch);

// query for a list of cards including matching the query value, pokemon
    function initialQuery(pokemon) {
        scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/?cardName=" + pokemon).then(function (data) {
            
            // returns an object with the following information: numPages, cards
            // console.log(JSON.stringify(data, null, 4));
            
            // we will show each card as an image and store the url of the card within the image
            
            const cards = data.cards;
            for (let i = 0; i < cards.length; i++) {
                // data is sent to cardSearch.handlebars for display
                // each displayed card has a stored URL used for a second query when clicked
                const newCard = {
                    url: cards[i].url,
                    image: cards[i].image,
                    id: cards[i].id
                };
                cardData.push(newCard);
            }

            res.json({cardData: cardData, numPages: data.numPages});

        });
    }
    
    initialQuery(pokeSearch);
    // res.render("cardSearch", {cardData: cardData});
    // res.json(data);

    cardData = [];
});

htmlRouter.post("/api/search/pokemon2/:pokemon?/:pageNum?", function (req, res) {

    let pokeSearch = req.params.pokemon;
    let pageNum = req.params.pageNum;

    // console.log(pokeSearch);

// query for a list of cards including matching the query value, pokemon
    function initialQuery(pokemon) {
        scraper.scrapeSearchPage("http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/"+ pageNum +"?cardName=" + pokemon).then(function (data) {

            // returns an object with the following information: numPages, cards
            // console.log(JSON.stringify(data, null, 4));

            // we will show each card as an image and store the url of the card within the image

            const cards = data.cards;
            for (let i = 0; i < cards.length; i++) {
                // data is sent to cardSearch.handlebars for display
                // each displayed card has a stored URL used for a second query when clicked
                const newCard = {
                    url: cards[i].url,
                    image: cards[i].image,
                    id: cards[i].id
                };
                cardData.push(newCard);
            }
            res.json({cardData: cardData, numPages: data.numPages});
        });
    }

    initialQuery(pokeSearch);
    // res.render("cardSearch", {cardData: cardData});
    // res.json(data);

    cardData = [];
});

htmlRouter.post("/api/search/url/:cardURL?", function (req, res) {

    let cardSearch = "https://www.pokemon.com/" + req.params.cardURL;

    cardSearch = cardSearch.split("+");
    cardSearch = cardSearch.join("/");

    // console.log(cardSearch);

    function singleCardQuery(cardURL) {
        // query for a specific card based on a specific URL (can be received from the basic query above)

        scraper.scrapeCard(cardURL).then(function (data) {
            // returns an object with the following information: id, name, image, type, superType, hp, abilities, rules, color, weaknesses, resistances, retreatCost
            // console.log(JSON.stringify(data, null, 4));
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

// const env = {
//     AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
//     AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
//     AUTH0_CALLBACK_URL:
//     'http://localhost:8080/callback' || process.env.AUTH0_CALLBACK_URL
// };
//
// htmlRouter.get('/login', passport.authenticate('auth0', {
//         clientID: env.AUTH0_CLIENT_ID,
//         domain: env.AUTH0_DOMAIN,
//         redirectUri: env.AUTH0_CALLBACK_URL,
//         responseType: 'code',
//         audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
//         scope: 'openid profile'}),
//     function(req, res) {
//         res.redirect("/");
//     });
//
// htmlRouter.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });
//
// htmlRouter.get('/callback',
//     passport.authenticate('auth0', {
//         failureRedirect: '/failure'
//     }),
//     function(req, res) {
//         res.redirect(req.session.returnTo || '/user');
//     }
// );
//
// htmlRouter.get('/failure', function(req, res) {
//     const error = req.flash("error");
//     const error_description = req.flash("error_description");
//     req.logout();
//     res.render('failure.pug', {
//         error: error[0],
//         error_description: error_description[0],
//     });
// });


module.exports = htmlRouter;