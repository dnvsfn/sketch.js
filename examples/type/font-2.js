/**
 * Sketch.js - Font 2
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-31
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 
  
  var p = new Point(20,20),
    str = "The quick brown fox jumps over the lazy dog";
  
  font('bold 10px Helvetica Neue')
  
  for(var size = 10; size < 36; size+=2) {
    
    font.size = size + 'px';
    console.log('font.size = ' + font.size);
    text(font.size + ' - ' + str, p);
    
    p.add(new Point(0, size + 10));
  }
  
});
