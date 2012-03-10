/**
 * Sketch.js - Square Tunnel
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-19
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  var show_grid = true,
    count = 20,
    boxes = new List(),
    destination = $pad.center,
    speed = 0.005,
    spinspeed = 0.01;

  var grid = new Grid($pad.WIDTH, $pad.HEIGHT);
  
  var Box = Particle.extend({
    update: function () {
      var dest = Point.sub(destination, this.location);
      dest = dest.mult(speed*(this.index+1));
      this.location.add(dest);
      this.spin(spinspeed/this.index);
    },
    draw: function () {
      var location = this.location,
        size = this.size,
        angle = this.angle;
      
      push();
      translate(location.x, location.y);
      rotate(angle);
      translate( -(size/2), -(size/2) );
      
      stroke('black');
      opacity(0.4);
      //strokeSize(this.index*1);
      square(0, 0, size);
      pop();
    }
  });
  
  boxes.add(count, function (index) {
    return new Box({
      location: Point.random(),
      size: (this.index+1) * 20,
      index: index
    });
  });
  
  $pad.mouseMove( function (event) {
    destination = $p( $pad.mouse );
  });
  
  $pad.keydown( function (event) {
    if (event.keyCode == 67) {
      $pad.clear( $pad.clear() ^= true )
    }
    if (event.keyCode == 82) {
      boxes.each(function (box) {
        box.destination = Point.random();
      });
    }
  })
  
  $pad.play( function () {
    background(0,0.06);
    boxes.run();
    spinspeed = cwave(10) * 0.1;
  });
  
});
