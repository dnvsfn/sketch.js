/**
 * Sketch.js - Layers 2
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-05
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  background('darkgray');
  
  fill('lightgray');
  font.size = 48;
  text.align = 'right';
  
  text('Sketch', new Point($pad.width - 20, $pad.height - 20));
  
  layer("squares", function (){
    
    if ($pad.frame < 10) {
      // console.log(this);
    }
    
    var square_position = new Point( Math.cos($pad.frame/100) * 100, 0);
    square_position.add($pad.center);
    
    stroke('red');
    square(square_position, 30);
    
    fill('red');
    font.size = 14;
    text('Square Layer', new Point(20, 30));
    
  });
  
  layer("circles", function () {
    
    fill('white');
    stroke(false);
    
    var circle_position = new Point( Math.sin($pad.frame/100) * 100, 30);
    circle_position.add($pad.center);
    
    font.size = 14;
    circle(circle_position, 20);
    text('Circle Layer', new Point(20, 60));
  });
  
});
