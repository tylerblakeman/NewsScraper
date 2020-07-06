var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require("mongoose");

//setting port for environment or port 3000 - locally will run on port 3000
var PORT = process.env.PORT || 3004;

//initializing express
var app = express();

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraper_homework", { useNewUrlParser: true });

//requiring the routes folder
require('./routes/apiRoutes.js')(app)
require('./routes/htmlRoutes.js')(app)

//setting view engine to express-handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Start the server
app.listen(PORT, function() {
  console.log(`App running on port${PORT}!`);
});
