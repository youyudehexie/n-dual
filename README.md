#N-dual.js

##Control Web Application with phone or pad

Create by [youyudehexie](https://github.com/youyudehexie)

Refer to [controldeck.js](https://github.com/johnpolacek/controldeck.js), [remote.js](https://github.com/Remotes/Remotes)

##Getting Started
1. Go to http://ndual.whattoc.com/example1 to view demo1
2. Scan the qrcode on screen with your phone and jump to the url
3. Wait for a few second, you can control your web application by drag.

**Attention**:

1.wechat bowser performance is terrible, please use chrome.


##Make your own

	<script src="/socket.io/socket.io.js"></script>
    <script src="/ndual.js"></script>
    <script>
        Ndual(function(message){
            if(message === 'dragright') Reveal.navigateRight(); //doSomething you want to do,here is an example 
            else if (message === 'dragleft') Reveal.navigateLeft();
        })
    </script>
        
the phone controller will send message to your application.you can catch the message and do something you wantto do.such as click something, move element.

##Example

- [example1](http://ndual.whattoc.com/example1)
- [example2](http://ndual.whattoc.com/example2)


##Download

https://github.com/youyudehexie/n-dual/tree/master/public/build

##My Seed Project

https://github.com/youyudehexie/ndual-seed
