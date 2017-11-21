module.exports = function (sequelize, DataTypes) {
    const userDeck = sequelize.define("userDeck", {
        deckName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
                isAlphanumeric: true,
                notContains: 'DROP'
            }
        },
        cardID: {
        
        },
        cardName: {
        
        },
        cardImg: {
        
        },
        type: {
        
        },
        superType: {
        
        },
        HP: {
        
        },
        abilities: {
            //this is an array help me lord
        },
        rules: {
        
        },
        color: {
        
        },
        weaknesses: {
        
        },
        resistances: {
        
        },
        retreatCost: {
            
        }
    })
};

//
// title: {
//     type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//         len: [1]
//     }
// },
// body: {
//     type: DataTypes.TEXT,
//         allowNull: false,
//         len: [1]
// },
// category: {
//     type: DataTypes.STRING,
//         defaultValue: "Personal"
// }