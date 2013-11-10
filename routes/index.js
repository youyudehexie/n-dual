/*
 * GET home page.
 */

exports.index = function(req, res){
  res.redirect('https://github.com/youyudehexie/n-dual');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

