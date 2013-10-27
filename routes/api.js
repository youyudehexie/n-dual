/*
 * Serve JSON to our AngularJS client
 */

var Socket = require('../lib/socket');

exports.name = function (req, res) {

  socket = Socket.getInstance();
  console.log(socket);
  socket.broadcast.emit('ok', {
    name: 'izheu' 
  })
  res.json({
  	name: 'Bob'
  });
};
