
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , path = require('path');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname );
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.register('.html', {
    compile: function(str,options){
      return function(locals){
        return str;
      };
    }
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static( path.join(__dirname, '../', '/lib') ));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function (req, res) {
  var sketches = fs.readdirSync('./sketches');
  res.render('index.jade', { title: 'Sketch Examples', sketches: sketches });
});

app.get('*\.html', function(req, res) {
  res.render('./sketches/' + req.params[0] + '.html');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
