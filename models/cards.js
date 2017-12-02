module.exports = function (sequelize, DataTypes) {
    const cards = sequelize.define("cards", {
        cardName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        //holds all card data as a string can be parsed out as json to access info
        cardData: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {timestamps: false});

    cards.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        cards.belongsTo(models.decks, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return cards;
};



// db.cards.belongsTo(db.decks, {foreignKey: 'deckName'});