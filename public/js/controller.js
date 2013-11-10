var socket = io.connect();

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


//var debug_el = $("#debug");
//function debug(text) {
    //debug_el.text(text);
//}


/**
* requestAnimationFrame and cancel polyfill
*/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
                window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


/**
* super simple carousel
* animation between panes happens with css transitions
*/
function Carousel(element)
{
    var self = this;
    element = $(element);

    var container = $(">ul", element);
    var panes = $(">ul>li", element);

    var pane_width = 0;
    var pane_count = panes.length;

    var current_pane = 0;


    /**
    * initial
    */
    this.init = function() {
        setPaneDimensions();

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
            //updateOffset();
        })
    };


    /**
    * set the pane dimensions and scale the container
    */

    function setPaneDimensions() {
        pane_width = element.width();
        panes.each(function() {
            $(this).width(pane_width);
        });
        container.width(pane_width*pane_count);
    };

    var status = true

    var token = getUrlVars()['token']
    socket.emit('deck',{
        token: token ,
        msg: 'logined'
    })

    function handleHammer(ev){
    //            debug(ev.type)
        if(ev.type == 'dragright' || ev.type == 'dragleft'){

            if(status){
                socket.emit('deck',{
                    token: token ,
                    msg: ev.type
                })
                status = false
            } 
        }

        if(ev.type == 'release'){
            status = true 
        }   
    }

    var hammertime = new Hammer(element[0], { drag_lock_to_axis: true });
    element.on("release dragleft dragright", handleHammer);
}


var carousel = new Carousel("#carousel");
carousel.init();


