const express = require("express");
const bodyParser = require("body-parser");
const hbars = require('express-handlebars');
const db = require("./models");
const path = require("path");
const dbRoutes = require('./routes/dbRoutes');
const user = require('./routes/user.js');
// const http = require('http');
//const userRoutes = require(./routes');
const passport = require('passport');
// const passportConfig = require('./config/passport');
const application = require('./routes/application.js');

const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// app.use(cookie-parser());
// app.use(sessions({ secret: 'gottaEvolve'}));
// // app.use(passport.initialize());
// app.use(passport.express-sessions());

//environment variables
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));

SALT_WORK_FACTOR = 16;

app.use(express.static("public"));

//handlebars setup
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
			console.log('Express is listening on port ' + app.get('port'))
		});
	}
});

app.use('/', htmlRoutes);
app.use('/db', dbRoutes);



// const routes = require("./controller/routes");
// app.use("/", route
// s);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});