/**
 * Sketch.js - Dot Blizzard
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-18
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {

  var DOT_COUNT = 200,
    dots = new List(),
    speed = 0.1;
  
  var Dot = Particle.extend({
    update: function () {
      this.velocity.limit(10);

      var acc = new Point(
        cwave(100) * random() < 0.5 ? -speed : speed,
        swave(100) * random() < 0.5 ? -speed : speed
      );

      this.velocity.add(acc);
      this.location.add(this.velocity);

      this.radius = map(Math.abs(this.velocity.x), 0, 1, 0.5, 5);
      this.velocity.limit(2);
    },
    draw: function () {
      var cos_color = Math.round(map(Math.cos($pad.frame/100), -1.0, 1.0, 0, 255)),
      sin_color = Math.round(map(Math.sin($pad.frame/100), -1.0, 1.0, 0, 255));
      
      this.color.r = cos_color;
      this.color.g = sin_color;
      this.color.b = cos_color;

      fill(this.color);
      circle(this.location, this.radius);
    }
  });
  
  stroke(false);

  dots.add(DOT_COUNT, function() {
    return new Dot({
      location: $p.random(),
      color: new Color()
    });
  });
  
  $pad.clear(false);
  
  $pad.play( function () {
    background(100, 0.08);
    dots.run();
  });
  
});
