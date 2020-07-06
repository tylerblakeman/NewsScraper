var path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");

// Require all models
var db = require("../models/");

module.exports = function (app) {
	app.get("/scrape", function (req, res) {
		console.log("Scraping");
		axios.get("https://www.tecmint.com/").then(function (response) {
			//loading response into cheerio
			var $ = cheerio.load(response.data);
			//looping throught each of the articles on jsonline.com/news - saving that info to the db
			$("div.inside-article").each(function (i, elem) {
				// console.log(elem)
				var title = $(this).find(".entry-header").find("a").text();
				var link = $(this).find(".entry-header").find("a").attr("href");
				var summary = $(this).find(".entry-summary").find("p").text();
				var img = $(this).find(".post-image").find("img").attr("data-lazy-src");
				var newArticle = {
					title: title,
					link: link,
					summary: summary,
					img: img
				};
				db.Article.create(newArticle)
					.then(function (dbArticle) {
						console.log(dbArticle);
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		});
	});
};
