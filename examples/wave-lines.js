/**
 * Sketch.js - Wave Lines
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-11
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
	
  var line_count = 500,
      center = $pad.center,
      line_spacing = ($pad.width / line_count),
      line_length = center.y - 10;
  
    $pad.play(function (){
    
      loop(line_count).each(
        function (index) {
      
          var lineStart = $p(
              index * line_spacing,
              center.y
            ),
            lineEnd = $p(
              lineStart.x,
              (Math.cos($pad.frame/100) * Math.sin($pad.frame / 
              (index + (line_count/2))) * line_length) + center.y
            );
      
          // stroke( this.cycle('red', 'black') );
      
          line(lineStart, lineEnd);
        }
      );
  
    });

});
