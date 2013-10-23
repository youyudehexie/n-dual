/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  socket.emit('send:name', {
    name: 'Bob'
  });

  socket.on('ad:publish', function(data, cb){
    socket.broadcast.emit('test', {
      name: 'lizhengfu' 
    })
    cb();
  });


};
