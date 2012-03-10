/**
 * Sketch.js - Key Press
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-28
 * Revised: 2012-02-09
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 
  
  $pad.keypress(function () {
    console.log(''+this);
  });
  
  $pad.keypress('d', function() {
    console.log('executing "' + this.key + '"');
  });
  
  $pad.keypress('space', function() {
    console.log('spacebar is pressed');
  });
  
  $pad.keydown('f', function () {
    console.log('f is down');
  })
  
  $pad.keyup('f', function () {
    console.log('f is up');
  });
  
  $pad.play(function () {
    
  });
  
});
