/**
 * Sketch.js - Snake Wave 2
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-06
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
    var Thing = Particle.extend({
      update: function () {
        this.velocity = new Point(Math.sin($pad.frame/10)*0.2, this.speed);
        this.location.add(this.velocity);
      },
      draw: function () {
        circle(this.location, this.radius);
      }
    });
  
    var thing_count=100, things = new List();
    
    background(0);

    things.add( thing_count, function () {
      var radius = this.index * 0.1,
        speed = radius * 0.1;
      return new Thing({
          location: Point.random(),
          radius: radius,
          speed: speed 
        })
    });
    
    layer("things", function () {
      this.clear(false);
      fill(Color.frame(0.1,0.5,0.5));
      fill('black');
      opacity(0.2);
      stroke(false);
      things.run();
    });
    
    layer("things2", function () {
      fill('white');
      things.run();
    });

    $pad.clear(false);
    
    $pad.play( function () {
      background(0,0.2);
    });

});
