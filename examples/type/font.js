/**
 * Sketch.js - Font
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-31
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 
  
  console.log('font.weight = ' + font.weight);
  console.log('font = ' + font.get());
  
  font.weight = 'bold';
  console.log('font.weight = ' + font.weight);
  console.log(font.get());
  
  var font_str = 'bold 20px times';
  console.log('font("' + font_str + '")');
  font(font_str);
  console.log(font.get());

});
