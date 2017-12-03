const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        }
    });


    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.hook('beforeCreate', function (user) {
        return new sequelize.Promise(function (resolve, reject) {
            bcrypt.genSalt(6, function (err, salt) {
                if (err) return reject(err);
                bcrypt.hash(user.password, salt, null, function (err, hash) {
                    if (err)
                        return reject(err);
                    user.password = hash;
                    return resolve(user);
                });
            });
        });
    });

    return User;
};