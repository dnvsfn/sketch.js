/**
 * Sketch.js - Basic Point
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-23
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create(function () { 
  
  var p1 = new Point();
  console.log('p1: ' + p1.x + ', ' + p1.y);
  
  p1.add(new Point(100,100));
  console.log('p1: ' + p1.x + ', ' + p1.y);
    
  var p2 = Point.add(p1, new Point(50,50));
  console.log('p2: ' + p2.x + ', ' + p2.y);
  
  console.log('fillStyle: ' + $c.fillColor);
  fill(false);
  stroke('blue');
  circle(p1, 10);
  
  console.log('fillStyle: ' + $c.fillColor);
  fill('red');
  stroke(false);
  circle(p2, 20);

});
