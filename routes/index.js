/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.controller = function(req, res){ 
  res.render('controller');
}

exports.deck = function(req, res){
  res.render('deck');
}

exports.login = function(req, res){
  res.render('login');
}
