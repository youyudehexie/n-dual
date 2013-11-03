/*
 * Serve content over a socket
 */

var Socket = require('../lib/socket');

module.exports = function (socket) {
  Socket.setSocket(socket); 
  socket.on('ad:publish', function(data, cb){
    socket.broadcast.emit('test', {
      name: 'lizhengfu' 
    })
    cb();
  });

  socket.on('login', function(data, cb){
    var token = data.token;
    socket.broadcast.emit('login:' + token, {token: token});
  
  })

  socket.on('controller', function(data){
    var token = data.token;
    socket.broadcast.emit('desk:' + token, data);
 
  })

    socket.on('message', function(message){
        console.log(message)
        var obj = JSON.parse(message);
        var token = obj.token;
        var command = obj.command;
		socket.broadcast.emit('message:' + token, command);
	});


};
