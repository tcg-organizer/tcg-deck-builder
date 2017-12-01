module.exports = function (sequelize, DataTypes) {
    const cards = sequelize.define("cards", {
        cardName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        //holds all card data as a string can be parsed out as json to access info
        cardData: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    });
    return cards;
};