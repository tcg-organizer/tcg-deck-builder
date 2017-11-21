const express = require("express");
const apiRouter = express.Router();

var pokemon = { pokemon: "sandshrew"};

apiRouter.get("/", function (req, res) {
    res.render("index", pokemon)
});

//adding a new card to your deck
apiRouter.post("/api/",function(req, res) {

});

//updating a cards in your deck
apiRouter.put("/api/",function(req, res) {

});

//delete a card from your deck
apiRouter.delete("/api/",function(req, res) {

});


module.exports = apiRouter;
