/**
 * Sketch.js - Layers
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-03
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  font.size = 20;
  text.align = 'center';
  
  background('red');
  
  fill('white');
  text('Sketch 1', $c.center);
  
  layer("squares", function (){
    fill('yellow');
    stroke(false);
    square(25, 40, 30);
    text('Square Layer', new Point(60, 60));
  });
  
  layer("circles", function () {
    font.size = 14;
    fill('green');
    stroke(false);
    circle(new Point(40,100), 20);
    text('Circle Layer', new Point(70, 100));
  });
  
});
