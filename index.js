var cookieParser = require("cookie-parser");
var config = require("./config/config")[env];
var env = process.env.NODE_ENV || "development";
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var routes = require("./routes/userRoute");
var categoryRoutes = require("./routes/categoriesRoute");
var tasksRoute = require("./routes/tasksRoute");

function run(appdir) { 
	app.use(cookieParser());
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use('/', routes);
	app.use('/', categoryRoutes);
	app.use('/', tasksRoute);

	var port = process.env.PORT || 4000;
	app.listen(port);
	console.log("Listening to port"+port);
}
run(process.cwd());