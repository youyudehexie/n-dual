
/**
 * Module dependencies
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var Socket = require('./lib/socket');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


var static = function(req, res){
    res.sendfile(path.join(__dirname, 'public') + req.path + '.html');
}

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/controller', static);
app.get('/widgets', static);


// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
    res.send(500);
});


Socket.connect(io);


/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
