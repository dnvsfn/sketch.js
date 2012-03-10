/**
 * Sketch.js - Color Explosion Decay
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
      this.lastLocation = new Point(this.location);
      this.velocity.add(acc);
      this.location.add(this.velocity);
      // this.velocity.limit(10);
      
      this.velocity.normalize();
      this.velocity.mult(3);
      
      if (this.radius < 1) {
        this.removed = true;
        this.end();
      } else {
        this.radius -= this.radius / 100;
      }
    },
    draw: function () {
      // push();
      // opacity(0.2);
      // fill(this.color);
      // stroke(false);
      // stroke('black');
      // strokeSize(2);
      // console.log(this.radius);
       circle(this.location, this.radius);
      // pop();
      
      stroke(Color.frame(0.25,0.5,0.75));
      path.start();
      //strokeSize(this.radius);
      path.moveTo(this.lastLocation.x, this.lastLocation.y);
      path.lineTo(this.location.x, this.location.y);
      path.start();
    },
    run: function () {
      if (this.removed==false) {
        // console.log('run()');
        this.checkBounds();
        this.update();
        this.draw();
      }
    },
    end: function () {
      
      var l = new Point(this.location);
      
      // console.log(l+'');
      
      for (var i=0; i < 6; i++) {

        fill(Color.frame(0.25,0.5,0.75));
        stroke(false);
        circle(
          Point.random(
            l.x-20,
            l.y-20,
            l.x+20,
            l.y+20
          ),
          random(1, 10)
        );
        
      };
      
    }
  });
  
  var orbs = [];
   
  function addOrb (l, s) {
    orbs.push(
      new Orb({
        location: l, 
        velocity: new Point(),
        radius: s || 40,
        removed: false,
        // color: Color.frame()
        // color: Color.frame(0.9, 0.2, 0.2)
        color: Color.frame(0.25, 0.50, 0.75)
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
    
    background(0,0.04);
    
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
