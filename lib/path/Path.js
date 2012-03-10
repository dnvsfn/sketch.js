var Path = (function () {
  
  function Path () {
    var args = arguments;
    
     if (!(this instanceof Path)) {
       if (args.length === 1) {
         if (Array.isArray(args[0]) || args[0] instanceof List) {
           return new Path(args[0]);
         }
       } else {
         return new Path();
       }
       
     } 
      
    this.points = [];
    
    if (args.length === 1) {
      if (Array.isArray(args[0])) {
        var pts = args[0],
          valid_pts = [],
          count = pts.length,
          index = 0;

        while (count--) {
          var pt = pts[index];

          if (pt instanceof Point) {
            valid_pts.push(pt);
          } else {
            SketchError.warn('Path([points]) points must be instance of Point()');
          }

          index++;
        }
        
        this.points = new List(valid_pts);
        
        this.location = this.points[0];
        
        // this.points = pts;

      } else if (args[0] instanceof List) {
        
        this.points = args[0];
        
      }
    }
    
    // console.log(this.points);
    
    return this;
    
  };
  
  Path.start = function () {
     //console.log('beginPath()');
    return $c.context.beginPath();
  };
  
  Path.end = function () {
     //console.log('endPath()');
    
    if ($c.fillColor !== false) {
      $c.context.fill();
    }
    if ($c.strokeColor !== false) {
      $c.context.stroke();
    }
  };
  
  Path.moveTo = function () {
    var p = new Point();
    
    if (arguments.length === 1) {
      p = arguments[0];
    } else if (arguments.length === 2) {
      p.x = arguments[0];
      p.y = arguments[1];
    }
    
    return $c.context.moveTo(p.x, p.y);
  };
  
  Path.lineTo = function () {
    var p = new Point();
    
    if (arguments.length === 1) {
      p = arguments[0];
    } else if (arguments.length === 2) {
      p.x = arguments[0];
      p.y = arguments[1];
    }
    
    return $c.context.lineTo(p.x, p.y);
  };
  
  Path.prototype = {
    
    draw: function () {
      
      var points = this.points.items,
        count = points.length,
        index = 0;
      
      push();
      move(this.location);
      
      Path.start();
      
      while (count--) {
        Path.moveTo( points[index] );
        
        if (index < (points.length-1)) {
          Path.lineTo( points[index+1] );
        } else {
          if (this.closed) {
            Path.lineTo( points[0] );
          }
        }
        
        index++;
      }
      
      Path.end();
      
      pop();
      
      
      return this;
    },
    
    move: function (location) {
      
      if (location instanceof Point) {
        this.location = location;
      }
      
      return this;
    }
    
  };
  
  this.path = Path;
  
  return Path;
  
})();
