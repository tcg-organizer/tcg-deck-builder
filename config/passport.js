const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// Serialize sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    db.User.findOne({where: {id: user.id}}).then(function(user){
        done(null, !!user && user);
    }).catch(done);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({where: {username: username}}).then(function(user){
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword()) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }).catch(done);
    }
));