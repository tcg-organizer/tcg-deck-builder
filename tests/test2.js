const Sequelize = require('sequelize');
const sequelize = new Sequelize('test1', 'test', '1234', {
    host: 'localhost',
});

Card = sequelize.define('card', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    deckId: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.INTEGER,
        field: 'created_at',
    },
});

Deck = sequelize.define('deck', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    deckName: {
        type: Sequelize.STRING,
        field: 'deck_name'
    }
});

Card.belongsTo(Deck, {
    foreignKey: {
        allowNull: false,
    }
});

Deck.hasMany(Card, {
    foreignKey: {
        allowNull: false,
    }
});

sequelize.sync();

deck1 = {id: 'd1', deck_name: 'hello'};
cards = [{id: 'c1', value: 1, deckId: 'd1'}, {id: 'c2', value: 2, deckId: 'd1'}];

Deck.create(deck1);
Card.bulkCreate(cards);

Deck.findAll().then(res => console.log(res.map(d => d.id).join(',')));
Deck.findOne().then(res => console.log(res.id));
Card.destroy({where: {id: 'c1'}}).then(res => console.log(res));
