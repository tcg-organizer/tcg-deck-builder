module.exports = function (sequelize, DataTypes) {
    const decks = sequelize.define("decks", {
        deckName: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
    return decks;
};


