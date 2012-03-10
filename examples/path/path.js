/**
 * Sketch.js - Path (WIP)
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-09
 * Revised: 2012-02-09
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  var points = new List();
  
  points.add(
    10,
    function () {
      return $p(
        this.cycle(30, 60, 90, 120, 150, 180, 210, 240, 270, 300),
        this.cycle(-5, 5, -10, 10, -15, 15, -20, 20)
      );
    }
  );
  
  var mypath = path(points);
  mypath.location = $p(-200,0).add($pad.center);
  mypath.closed = true;
  
  stroke('black');

  mypath.draw();
  background(0);

  $pad.play( function () {
    
    mypath.points.each(
      function (point, index) {
        
        if (index%2==0) {
          point.y = point.y + Math.cos($pad.frame/100) * 0.1;
        } else {
          point.y = point.y + Math.cos($pad.frame/100) * -0.1;
        }
        
      }
    );
    
    mypath.draw();
    
  });
  
});
