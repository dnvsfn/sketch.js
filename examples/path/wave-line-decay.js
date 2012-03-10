/**
 * Sketch.js - Wave Line Decay
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-12
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
	
	var LINE_COUNT = 100,
		center = $pad.center,
		line_spacing = $pad.width / LINE_COUNT;

	$pad.clear(false);
	
	$pad.play(function () {
    
		var point = new Point(0, center.y);
		
    //background('rgba(255,255,255,0.01)');
		stroke('red');
		
		for (var i=0; i < LINE_COUNT; i++) {
			Path.start();
			Path.moveTo(point);

      point = new Point(
       i * line_spacing,
       (Math.cos($pad.frame/(i+(LINE_COUNT/2))) * Math.sin($pad.frame/100) * center.y) + center.y
      );
      
			Path.lineTo(point);
			Path.end();
		};
		
	});

});
