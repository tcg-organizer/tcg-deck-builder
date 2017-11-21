
var express = require("express");
var router = express.Router();

var pokemon = { pokemon: "sandshrew"};

router.get("/", function (req, res) {
    res.render("index", pokemon)
});

module.exports = router;
