$(function(){
    var iosocket = io.connect();
    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }  

    var token = getUrlVars()['token']
    iosocket.on('connect', function () {
        console.log('connected');
        console.log(token);
        iosocket.emit('login', {token: token }); 

    });
    iosocket.on('disconnect', function() {
        console.log('disconnected');
    });

    $(window).keydown(function(e) {
        console.log('Sending keyboard command: '+e.keyCode);
        iosocket.emit("key down", { keyCode: e.keyCode, shiftKey: e.shiftKey, altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });
    });

    $(window).keyup(function(e) {
        console.log('Sending keyboard command: '+e.keyCode);
        iosocket.emit("key up", { keyCode: e.keyCode, shiftKey: e.shiftKey, altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });
    });

    var press = Modernizr.touch ? 'touchstart' : 'click';
    $('body').on(press,'.btn', function(e) {
        e.preventDefault();
        if ($(this).attr('data-key')) {
            // console.log('sending button command: '+$(this).attr('data-key'));
            iosocket.send($(this).attr('data-key'));
        }
        else if ($(this).attr('data-goto')) {
            iosocket.send('goto:'+$(this).attr('data-goto'));
        }
        else if ($(this).attr('data-command')) {
            var message = {};
            message.token = token;
            message.command = $(this).attr('data-command');  

			iosocket.send(JSON.stringify(message));
		}
    });

    iosocket.on('flowtime minimap complete', function(data){
        var minimap = $('<div class="minimap ft-default-progress"></div>');
        $('body').append(minimap);
        minimap.append(data.dom);
        var ftThumbs = document.querySelectorAll('.ft-page-thumb');
        $('body').on(press,'.ft-page-thumb', function(e) {
            e.preventDefault();
            for (var i = 0; i < ftThumbs.length; i++) {
                ftThumbs[i].classList.remove('actual');
            } 
            e.target.classList.add('actual');
            var s = e.target.getAttribute('data-section').replace('__', '');
            var p = e.target.getAttribute('data-page').replace('__', '');
            iosocket.emit("navigate", { section: Number(s), page: Number(p) });
            console.log("e.target", s, p);
        });

        iosocket.on('navigate', function(data){
            for (var i = 0; i < ftThumbs.length; i++) {
                ftThumbs[i].classList.remove('actual');
            }
            var actualThumb = document.querySelector('.ft-page-thumb[data-section=__' + data.section + '][data-page=__' + data.page + ']');
            actualThumb.classList.add('actual');
        });

    });
});
