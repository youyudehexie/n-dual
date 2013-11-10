function Ndual(cb){

    var self = this;

    function Widget(widgetUrl){
        var widget = document.createElement('iframe') 
        
        widget.setAttribute("style", "border: none; position:fixed; z-index:10000; right:0px; top:90px;");
        widget.setAttribute("id", "remotes-widget");
        widget.setAttribute("scrolling", "no");
        widget.setAttribute("src", widgetUrl); 
        document.body.appendChild(widget);
    }


    function randomString(length) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        
        if (! length) {
            length = Math.floor(Math.random() * chars.length);
        }
        
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function createWdiget(){
        var token = randomString(5) 
        var googleQrApi = 'https://chart.googleapis.com/chart?cht=qr&chld=H&chs=150x150&chl=' 
        var wdigetUrl = googleQrApi + 'http://ndual.whattoc.com/controller?token=' + token;
        Widget(wdigetUrl);
    }

    createWdiget();
    var iosocket = io.connect('http://ndual.whattoc.com');

    iosocket.on('connect', function () {
        console.log('connected');
    });

    iosocket.emit('register', {
        token: token
    }, function(){
        console.log('register')
    })

    iosocket.on('message', function(message) {
        if(message == 'logined'){
            var widget = document.getElementById("remotes-widget"); 
            if(widget){ 
                document.body.removeChild(widget)
            }
        }
        cb(message)
    });
}


