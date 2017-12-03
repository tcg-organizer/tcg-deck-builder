const express = require("express");
const bodyParser = require("body-parser");
const hbars = require('express-handlebars');
const db = require("./models");
const path = require("path");
const dbRoutes = require('./routes/dbRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const flash = require('connect-flash');
const passportCF = require('./config/passport.js');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');
const chai = require('chai');
//auth0
const dotenv = require('dotenv').config();
// dotenv.load();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

//handlebars setup
app.engine("handlebars", hbars({ defaultLayout: "main" }));
//This will render handlebars files when res.render is called.
app.set("view engine", "handlebars");

app.use('/', htmlRoutes);
app.use('/db', dbRoutes);


// express session over cookie session
app.use(expressSession({secret: process.env.SECRET}));
app.use(passport.initialize());
app.use(passport.session());
// Using the flash middleware provided by connect-flash to store messages in session and displaying in templates
app.use(flash());

const routes = require('./routes/index')(passport);
// set up routes
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

