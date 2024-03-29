/**
 * Sketch.js - Red Black Tracer
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-23
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 

  var Particle,
    Dot,
    Box,
    particles,
    PARTICLE_COUNT,
    VEL_LIMIT,
    ACC_LIMIT;
  
  particles = [];
  PARTICLE_COUNT = 10;
  VELOCITY_LIMIT = 0.1;
  ACC_LIMIT = 0.5;
  
  Particle = Base.extend({
    init: function (location, size) {
       this.location = location;
      this.acceleration = new Point();
      this.velocity = new Point();
      this.size = size;
      this.canvas = $c;
      this.context = $c.context;
    },
    update: function () {
      
      var acc = new Point(
        Math.random()<0.5?-(ACC_LIMIT):ACC_LIMIT, 
        Math.random()<0.5?-(ACC_LIMIT):ACC_LIMIT
      );
      
      this.acceleration.add(acc);
      this.velocity.sub(this.acceleration);
      this.location.add(this.velocity);
      
      if (this.velocity.mag() > VEL_LIMIT) {
        this.velocity.limit(VELOCITY_LIMIT);
        this.velocity.normalize();
        // this.velocity.mult(VEL_LIMIT);
        // this.velocity = new Point();
      }
      this.acceleration = new Point();
    },
    draw: function () {
      
    },
    bounds: function () {
      var l = this.location,
        s = this.size,
        w = this.canvas.WIDTH,
        h = this.canvas.HEIGHT;
        
      if (l.x > w) l.x = -s.width;
      if (l.x < -s.width) l.x = w;
      if (l.y > h) l.y = -s.height;
      if (l.y < -s.height) l.y = h;
    },
    run: function () {
      this.bounds();
      this.update();
      this.draw();
      // this.update();
    }
  });

  Box = Particle.extend({
    draw: function () {
      this.context.fillStyle = 'black';
      this.context.fillRect(this.location.x, this.location.y, this.size.width, this.size.height);
    }
  });
  
  Dot = Particle.extend({
    draw: function () {
      this.context.fillStyle = 'red';
      this.context.beginPath();
      this.context.arc(this.location.x, this.location.y, this.size.width, 0, Math.PI*2, true); 
      this.context.closePath();
      this.context.fill();
    }
  });
  
    for (var i=0; i < PARTICLE_COUNT; i++) {
      var p, loc, rsize, size;
      
      rsize = (Math.random() * 8) + 2;
      size = new Size(rsize, rsize);
      loc = new Point(Math.random() * $c.WIDTH, Math.random() * $c.HEIGHT);
      
      p = Math.random()<0.5? new Box(loc, size) : new Dot(loc, size);
      
      particles.push(p);
    };
    
  $pad.clear(false);
  
  $pad.play( function () {
    
    $c.context.fillStyle = 'rgba(255,255,255,0.1)';
    $c.context.fillRect(0,0,$c.WIDTH,$c.HEIGHT);
    
    for (var i=0; i < particles.length; i++) {
      var p = particles[i];
      p.run();
    };
    
  });
  
});
