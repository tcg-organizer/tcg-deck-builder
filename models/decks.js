module.exports = function (sequelize, DataTypes) {
    const decks = sequelize.define("decks", {
        cardName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        //holds all card data as a string can be parsed out as json to access info
        cardData: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return decks;
};


