
var source = $("#userDeck-template").html();
var template = Handlebars.compile(source);

module.exports = function (sequelize, DataTypes) {
    const userDeck = sequelize.define("userDeck", {
        deckName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Deck name must between one and fifty characters"
                },
                isAlphanumeric: true,
                notContains: 'DROP'
            }
        },
        cardID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cardName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cardImg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //holds all card data as a string can be parsed out as json to access info
        cardData: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return userDeck;
};

Handlebars.registerHelper('idNameImg', function(userDeck) {
    return userDeck.cardID + " " + userDeck.cardName + " " + userDeck.cardImg;
});

$('body').append(template(data));



