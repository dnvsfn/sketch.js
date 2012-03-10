/**
 * Sketch.js - Trailing Dots
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-07
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create({ fullscreen: true }, function () {
  
  var Thing = Particle.extend({
    draw: function () {
      // console.log('draw');
      // fill('black');
      // console.log($pad.activeLayer);
      circle(this.location, this.radius);
    },
    update: function () {
      var direction = $p.random(-1,1);
      this.velocity.add(direction);
      this.velocity.norm();
      this.velocity.mult(3.5);
    }
  });
  
  var Things = list(10)
    .update( 
      function (thing, index) { 
        return new Thing({
          location: $p.random(),
          // velocity: new Point(1,1),
          velocity: $p.random(-2.0, 2.0),
          radius: index * 2
        }
      );
    }
  );
  
  layer("decay", function () {
    this.clear(false);
    fill(Color.frame());
    Things.each().run();
  });
  

  $pad.play();
});
