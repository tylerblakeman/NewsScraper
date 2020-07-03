var path = require("path");

module.exports = function (app) {
	app.get("/suckit", function (req, res) {
    console.log('Live')
  });
};