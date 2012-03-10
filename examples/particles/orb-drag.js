/**
 * Sketch.js - Orb Drag
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-27
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 
  
  var Orb = Particle.extend({
    update: function () {
      var acc = Point.random(-1,1);
      this.velocity.add(acc);
      this.location.add(this.velocity);
      this.velocity.limit(10);
      
      if (this.radius < 1) {
        this.removed = true;
      } else {
        this.radius -= 0.2;
      }
    },
    draw: function () {
      fill(this.color);
      stroke('black');
      strokeSize(2);
      circle(this.location, this.radius);
    },
    run: function () {
      if (this.removed==false) {
        this.checkBounds();
        this.update();
        this.draw();
      }
    }
  });
  
  var orbs = [];
  
  $pad.mouseDrag(function(){
    orbs.push(new Orb({
      location: $pad.mouse, 
      velocity: new Point(),
      radius: 20,
      removed: false,
      color: 'rgba('+random(255,0)+','+random(255,0)+','+random(255,0)+',255)'
    }));
  });
  
  $pad.clear(false);
  
  $pad.play(function () {
    
    background(255,0.04);
    
    for (var i=0; i < orbs.length; i++) {
      var o = orbs[i];
      o.run();
    };
    
  });
  
});
