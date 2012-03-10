/**
 * Sketch.js - Orb Particle
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-16
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  var ORB_COUNT = 400,
      orbs = [];
  
  var Orb = Particle.extend({
    update: function () {
      var direction = Point.sub($pad.mouse, this.location);
      direction.normalize();
      direction.mult(random(0.2));
      
      this.velocity.add(direction);
      this.location.add(this.velocity);
      
      this.velocity.limit(2);
    },
    draw: function () {
      var distance = Point.distance($pad.center, this.location),
          radius = map(distance, 0, $pad.width, 2, 10);
      
      circle(this.location, radius);
    }
  });
  
  $pad.activeLayer.clear(false);
  
  stroke(false);
  
  for (var i=0; i < ORB_COUNT; i++) {
    var point = Point.random();
    var orb = new Orb({
      location: point
    });
    orbs.push(orb);
  };
  
  $pad.play( function () { 
    background(255,0.07);
    fill('black');
    
    for (var i=0; i < orbs.length; i++) {
      var orb = orbs[i];
      orb.run();
    }
    
  });
  
});
