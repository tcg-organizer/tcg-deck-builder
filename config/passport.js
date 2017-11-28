/*
Placeholder of login
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

// writing part
passport.serializeUser(function(user, done){
    done(null, user);
});

//reading part
passport.deserializeUser(function(user, done){
    db.User.find({where: {id: user.id}}).success(function(user){
        done(null, user);
    }).error(function(err){
        done(err, null)
    });
});

// user auth
passport.use(new LocalStrategy (
    function(username, password, done){
        db.User.find(
            {where: {username: username}
        }).success(function(user){
            passwrd = user ? user.password : '';
            isMatch = db.User.validPassword(password, passwrd, done, user);
        });
    }
));

/*

