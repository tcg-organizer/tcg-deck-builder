const express = require("express");
const bodyParser = require("body-parser");
const hbars = require('express-handlebars');
const db = require("./models");
const path = require("path");
const dbRoutes = require('./routes/dbRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
//auth0
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');
const engines = require('consolidate');

dotenv.load();

const routes = require('./routes/index');
const user = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//environment variables
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

//handlebars setup
app.engine('pug', engines.pug);
app.engine('handlebars', engines.handlebars);
app.engine("handlebars", hbars({ defaultLayout: "main" }));
//This will render handlebars files when res.render is called.
app.set("view engine", "handlebars");

app.use('/', htmlRoutes);
app.use('/db', dbRoutes);
app.use('/', routes);
app.use('/user', user);


// This will configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            'http://localhost:8080' || process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
    done(null, user);
});

app.use("/", routes);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});