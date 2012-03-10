/**
 * Sketch.js - Orbiting Squares
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-19
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {

  var destination = $pad.center, 
    radius = 100,
    count = 16,
    boxes = new List(),
    grid, 
    speed = 0.05; // 0.0 = none, 1.0 = fastest

  var Box = Particle.extend({
    update: function () {
      this.angle += 0.005;
      
      var direction = $p(
        cwave(this.size) * 30,
        swave(this.size) * 10
      );
      
      var vector = Point.sub(destination, this.location);
      vector = vector.mult(speed);
      
      this.location.add(vector);
      this.location.add(direction);
    },
    draw: function () {
      push();
      translate(this.location.x, this.location.y);
      rotate(this.angle);
      translate(-(this.size/2), -(this.size/2));
      fill(this.color.toString());
      square(0, 0, this.size);
      pop();
    }
  });
  
  $pad.mouseDown( function (event) {
    destination = $pad.mouse;
  });
  $pad.mouseMove( function (event) {
  });
  
  grid = new Grid($pad.width, $pad.height);
  
  
  boxes.add(count, function () {
    return new Box({
      location: $p($pad.center.x, $pad.center.y+this.index),
      color: new Color(255),
      angle: (this.index+1) * 2,
      size: (this.index+1) * 5
    });
  })
  
  layer('grid', function () {
    grid.draw();
  });
  
  layer('boxes', function() {
    boxes.run();
  });
  
  $pad.clear(false);
  $pad.play();
  
});
