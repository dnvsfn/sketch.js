
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , path = require('path');

var app = module.exports = express.createServer();

var EXAMPLES_DIR = path.resolve(__dirname, '..', 'examples');

function NotFound(msg){
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

NotFound.prototype.__proto__ = Error.prototype;

// Configuration

app.configure(function(){
  app.set('views', __dirname );
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
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
  fs.readdir( EXAMPLES_DIR, function ( err, files ) {
    if (err) throw err;

    var sketches;

    sketches = [];
    
    // TODO: the following is rough but works for examples. Needs DRY love.
    files.forEach( function ( file ) {
      if ( !file.match(/^\./) ) {
        var _file = EXAMPLES_DIR + '/' + file
          , stats = fs.statSync(_file);

        if ( stats.isDirectory() ) {
          var dirFiles = fs.readdirSync( _file );

          dirFiles = dirFiles
            .filter( function ( dirfile ) {
              if ( !dirfile.match(/^\./) ) {
                return dirfile;
              }
            })
            .map( function ( dirfile ) {
              var name = dirfile.replace('.js', '');
              return {
                file: dirfile
              , name: name
              , url: 'examples/' + file + '/' + name + '.html'
              };
            });

          sketches.push({ 
            title: file
          , files: dirFiles
          });
        } else if ( stats.isFile() ) {
          var name = file.replace('.js', '');
          sketches.push({
            file: file
          , name: name
          , url: 'examples/' + name + '.html'
          });
        }
      }
    })
    
    sketches.sort( function ( a, b ) {
      if ( a.files || a.file < b.file ) {
        return -1;
      }
      if ( b.files || a.file > b.file ) {
        return 1;
      }
      return 0;
    });
    
    res.render('index.jade', { title: 'Sketch.js Examples', sketches: sketches });
  });
});

app.get('/examples/*', function(req, res) {
   
  var sketch = path.resolve( EXAMPLES_DIR, req.params[0].replace('.html','.js') );

  fs.readFile( sketch, function ( err, data ) {
    //if (err) throw err;
    res.render( 'sketch.jade', {
      title: path.basename( sketch )
    , sketch: data.toString()
    });
  });

});

app.get('/404', function(req, res){
  throw new NotFound;
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
