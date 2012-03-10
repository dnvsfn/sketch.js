/**
 * Sketch.js - Key Press 2
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-28
 * Revised: 2012-02-09
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 
  
  $pad.keypress(function (){
    console.log('pressed: ' + this);
  });

  $pad.keydown('space', function () {
    console.log('space is down');
  });
  
  $pad.keyup('space', function () {
    console.log('space is up');
  });
  
  $pad.keydown('left', function () {
    console.log('left is down');
  });
  
  $pad.keyup('left', function () {
    console.log('left is up');
  });
  
  $pad.keypress('d', function () {
    console.log('d fired');
  });
  
  $pad.keypress('D', function () {
    console.log('D fired');
  });
  
  $pad.keydown('ctrl+a', function (){
    console.log('ctrl+a fired');
  });
  
  $pad.keydown('alt+a', function (){
    console.log('alt+a fired');
  });
  
});
