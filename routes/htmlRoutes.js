var path = require('path')
var db = require('../models');

module.exports = function (app) {
  // Route for getting all Articles from the db
  app.get("/", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({}).lean()
    .then(function(article) {
      console.log("hit articles")
      // If we were able to successfully find Articles, send them back to the client
      console.log(article);
      res.render("index", { "articles" : article })
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });
};