var express = require('express');

var port = process.env.PORT || 3000;

var createServer = function (port) {
    var server = express();

    server.configure(function(){
        server.use(express.json());
        server.use(express.urlencoded());
        server.set('view engine', 'jshtml');
        server.use(express.cookieParser('mmmcheese'));
        server.use(express.static(__dirname + '/client'));
  });

    server.configure('development', function(){
        server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    server.configure('production', function(){
        server.use(express.errorHandler());
    });

    server.listen(port, function(){
        console.log("Express server listening on port %d in %s mode", port, server.settings.env);
    });
};

createServer(port);

