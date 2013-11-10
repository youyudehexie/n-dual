define(function(require, exports, module) {

  function Widget() {

    var widget = document.createElement("iframe");
    var qrGoogle = 'https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=L|4&chl='  
    var widgetUrl = qrGoogle + 'http://127.0.0.1:3000/controller?token=1234';

    widget.setAttribute("style", "border: none; position:fixed; z-index:10000; right:0; top: 90px;");
    widget.setAttribute("id", "remotes-widget");
    widget.setAttribute("scrolling", "no");
    widget.setAttribute("src", widgetUrl);

    document.body.appendChild(widget)
  }

  module.exports = Widget;


});


