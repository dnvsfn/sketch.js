/**
 * Sketch.js - Snake Wave
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-06
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create({ fullscreen: true }, function () {
  
  var Thing = Particle.extend({
    update: function () {
      this.velocity = new Point(-1, Math.sin($pad.frame/10)*0.2);
      this.location.add(this.velocity);
    },
    draw: function () {
      circle(this.location, 10);
    }
  });

  var thing_count=10, things = new List();

  things.add( thing_count, function () {
    return new Thing({
      location: Point.random()
    });
  });

  background(0);

  layer("things", function () {
    this.clear(false);
    fill('red');
    opacity(0.2);
    stroke(false);
    things.run();
  });

  layer("things2", function () {
    fill(false);
    stroke('blue');
    things.run();
  });
   
  $pad.clear(false);

  $pad.play(function () {
    background(0,0.2);
  });

});
