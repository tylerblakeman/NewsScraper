var express = require("express")
var path = require("path");
var db = require("../models")
var cheerio = require("cheerio")
var axios = require("axios")
var router = express.Router()

module.exports = function (app) {
	app.get("/", function (req, res) {
    console.log('live')
  });
  
  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
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