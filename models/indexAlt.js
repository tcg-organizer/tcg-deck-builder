var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var lodash = require('lodash');
var sequelize = new Sequelize('goatjs','root', null);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model
    });

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
