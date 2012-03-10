/**
 * Sketch.js - Mouse Drag
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-27
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 
  
  fill('black');
  stroke(false);
  opacity(0.2);
  
  var p = new Point();
  
  $pad.mouseDown(function(){
    console.log('mouse down: ' + $pad.mouse);
    p = $pad.mouse;
  });
  
  $pad.mouseUp(function(){
    console.log('mouse up: ' + $pad.mouse + ' | dragging: ' + $pad.dragging);
  });
  
  $pad.mouseMove(function (){
    console.log($pad.dragging); // TODO: doesn't work
  });

  $pad.mouseDrag(function(){
    
    stroke('black');
    
    $c.context.lineWidth = 1;
    $c.context.beginPath();
    $c.context.moveTo(p.x,p.y);
    
    p = $pad.mouse;
    
    $c.context.lineTo(p.x,p.y);
    $c.context.stroke();

    circle(p.x,p.y,10);
  });

  $pad.clear(false);
  //background(0);
  //$pad.play( function () {} );
});
