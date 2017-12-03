const db = require("../models");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
// const faceBook = require('passport-http-bearer');

module.exports = function(passport){

    /* user auth login */
    router.get('/login', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('login', { message: req.flash('message') });
    });

    /* user auth logout */
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    /* user facebook login*/
    // router.get('/api/me',
    //     passport.authenticate('bearer', { session: false }),
    //     function(req, res) {
    //         res.json(req.user);
    //     });


    /* user signup */
    router.get('/signup', function(req, res){
        res.render('signup',{message: req.flash('message')});
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/auth/login',
        failureFlash : true
    }));

    return router;
};