var Socket = function(socket){
    this.socket = null;
}

Socket.prototype.getInstance = function(){
    return this.socket;
}

Socket.prototype.setSocket = function(socket){
    this.socket = socket;
}

module.exports = new Socket();
