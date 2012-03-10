/**
 * Sketch.js - Neon Orbs Decay
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
      push();
      // opacity(0.2);
      fill(this.color);
      stroke(false);
      // stroke('black');
      // strokeSize(2);
      // console.log(this.radius);
      circle(this.location, this.radius);
      pop();
    },
    run: function () {
      if (this.removed==false) {
        // console.log('run()');
        this.checkBounds();
        this.update();
        this.draw();
      }
    }
  });
  
  var orbs = [];
   
  function addOrb (l) {
    orbs.push(
      new Orb({
        location: l, 
        velocity: new Point(),
        radius: 20,
        removed: false,
        // color: Color.frame()
        color: Color.frame(0.9, 0.2, 0.2)
      })
    );
  };

  $pad.mouseDrag(function(){
    addOrb($pad.mouse);
  });
  
  $pad.clear(false);
  
  var grid = new Grid($pad.WIDTH, $pad.HEIGHT);
  // var p = $pad.center;
  
  $pad.play(function () {
    
    if ($pad.frame==1) {
      grid.draw();
    }
    
    background(0,0.03);
    if ($pad.frame%10==0) {
      addOrb(new Point(Math.cos($pad.frame/1000) * $pad.WIDTH, $pad.center.y));
      
      // p.add(Point.random(-10,10));
    }
    
    for (var i=0; i < orbs.length; i++) {
      var o = orbs[i];
      o.run();
    };
    
    push();
    opacity(0.02);
    // background(Color.frame(0.8, 0.6, 0.3));
    pop();
  });
  
});
