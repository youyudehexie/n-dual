/*
 * Serve JSON to our AngularJS client
 */

var Socket = require('../lib/socket');

exports.name = function (req, res) {

  socket.broadcast.emit('ok', {
    name: 'izheu' 
  })
  res.json({
  	name: 'Bob'
  });
};

exports.test = function(req, res){
    Socket.emit('news',{
        name: 'ok' 
    })
}
