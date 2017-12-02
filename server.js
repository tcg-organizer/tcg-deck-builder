const express = require("express");
const bodyParser = require("body-parser");
const hbars = require('express-handlebars');
const db = require("./models");
const path = require("path");
const dbRoutes = require('./routes/dbRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const chai = require('chai');
//auth0
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const flash = require('connect-flash');
const engines = require('consolidate');

dotenv.load();



const http = require('http');
const userRoutes = require('./routes');
const passportConfig = require('./config/passport.js');
const application = require('./routes/app.js');


const user = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

//handlebars setup
// app.engine('pug', engines.pug);
// app.engine('handlebars', engines.handlebars);
app.engine("handlebars", hbars({ defaultLayout: "main" }));
//This will render handlebars files when res.render is called.
app.set("view engine", "handlebars");

if ('development' === app.get('env')) {
    	app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/home', application.IsAuthenticated, home.homepage)
app.post('/authenticate',
      passport.authenticate('local',{
        	successRedirect: '/home',
    	failureRedirect: '/'
  })
);
app.get('/logout', application.destroySession);
app.get('/signup', user.signUp);
app.post('/register', user.register);

    db
  .sequelize
  .sync()
  .complete(function(err){
    	if (err) {
        		throw err[0]
        	} else {
        		db.User.find({where: {username: 'admin'}}).success(function (user){
            			if (!user) {
                				db.User.build({username: 'admin', password: 'admin'}).save();
                			}
            		});

            		http.createServer(app).listen(app.get('port'), function(){
                			console.log('Express is listening on port '+ app.get('port'));
                		});
        	}
    });

app.use('/', htmlRoutes);
app.use('/db', dbRoutes);
app.use('/route');



            db.sequelize.sync().then(function() {
                app.listen(PORT, function() {
                    app.use('/', htmlRoutes);
                    app.use('/db', dbRoutes);
                    app.use('/user', user);
                }

                });
