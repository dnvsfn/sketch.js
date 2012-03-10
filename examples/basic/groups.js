/**
 * Sketch.js - Groups
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-08
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  var spacing = 70;
  
  var myGroup = group(
    function () {
      fill('black');
    
      loop(5).each(
        function (index) {
          circle( $p( index * spacing, 0), 20);
          square( $p( index * spacing, spacing), 20);
        }
      );
    }
  );
  
  myGroup.move($pad.center);
  // myGroup.draw();
  // opacity(0.2);
  // myGroup.move( $p(10,10).add(10, 10) );
  // myGroup.draw();
  // myGroup.move($pad.center);
  // myGroup.draw();
  // group1.rotate(90);
  
  layer("guides", function () {
    fill('red');
    circle($pad.center, 5);
  });
  
  $pad.play(function () {
    
    // group1.angle += 0.005;
    
    myGroup
      .spin(0.05)
      .draw()
    
  });
  
});
