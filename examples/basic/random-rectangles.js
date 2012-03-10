/**
 * Sketch.js - Random Rectangles
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-11
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  background('red');
  fill('fill');
  stroke('black');
  
  $pad.play( function () {
    this.clear(false);
    
    loop(100).each(
      function (index) {
        rectangle(
          Point.random(), 
          new Size( Math.random()*30 + 10, Math.random()*30 + 10)
        );
      }
    );
  });
  
});
