module.exports = function (sequelize, DataTypes) {
    const decks = sequelize.define("decks", {
        deckName: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {timestamps: false});
    decks.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        decks.hasMany(models.cards, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return decks;
};