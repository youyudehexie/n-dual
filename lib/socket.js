var Socket = function(){
    this.clients = {}
}

Socket.prototype.connect = function(io){
    this.io = io;
    var self = this;

    io.sockets.on('connection', function(socket){

        socket.on('register', function(data, cb){
            self.clients[data.token] = socket.id;
            cb();
        });

        socket.on('controller', function(data){
            io.sockets.socket(self.clients[data.token]).emit('deck', 'test');
        });

        socket.on('deck', function(data){
            io.sockets.socket(self.clients[data.token]).emit('message', data.msg);
        })
    });
}


Socket.prototype.emit = function(eventName, data, callback){
    this.io.sockets.emit(eventName, data, callback)
}


module.exports = new Socket();
