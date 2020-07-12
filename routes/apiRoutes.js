var cheerio = require("cheerio");
var axios = require("axios");


// Require all models
var db = require("../models/");
// const { Article } = require("../models/");

module.exports = function (app) {
  app.get("/delete", function (req, res){
    db.Article.deleteMany({}).then(function (){
      console.log('delete route hit')
    }).then(async function (){
      await res.redirect('/scrape')
    })
  });


	app.get("/scrape", function (req, res) {
    console.log("Scraping");
    for (let index = 0; index < 10; index++) {
      axios.get(`https://www.tecmint.com/page${index}`).then(function (response) {
        console.log(`PAGE # ${index}`)
        //loading response into cheerio
        var $ = cheerio.load(response.data);
        //looping throught each of the articles on jsonline.com/news - saving that info to the db
        $("div.inside-article").each(function (i, elem) {
          // console.log(elem)
				var title = $(this).find("h2.entry-title").find("a").text();
				var link = $(this).find(".entry-title").find("a").attr("href");
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
		}).then(async function () {
      await res.redirect('/');
    });
    }
  }); 
};
