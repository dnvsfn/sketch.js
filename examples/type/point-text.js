/**
 * Sketch.js - Point Text
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-01
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {

  font("bold 16px");
  
  // Create some new Points
  var point1 = new Point(25, 50);
  var point2 = new Point(150, 100);
  
  // Modify point1 by adding point2
  point1.add(point2);
  console.log( point1 ); // { x: 175, y: 150 }
  
  text("p1", point1);
  
  font.size = 32;
  text("p2", point2);
  
  // Create a new point by adding two with Point.add()
  var point3 = Point.add(point1, point2); // { x: 175, y: 150 } + { x: 150, y: 100 }
  console.log( point3 ); // { x: 325, y: 250 }
  
  fill("red"); // change color to 'red'
  text("p3", point3);
  
  // Using $p shortcut
  var point4 = $p.add(new Point(100, 25), point3);
  console.log( point4 );
  
  push(); // wrap the following so we don't mess with the rest of the context
  
  move(point4); // shortcut for translate()
  rotate(0.3); // rotate the context
  fill("blue"); // change color to 'blue'
  text("p4"); // add our Text() instance, if you don't pass a point as the second argument it will render at [0,0]
  
  pop(); // end wrap
});
