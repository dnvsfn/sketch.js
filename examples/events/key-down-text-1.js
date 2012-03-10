/**
 * Sketch.js - Key Down Text 1
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-28
 * Revised: 2012-02-09
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () { 
  
  text.baseline = 'middle';
  text.align = 'center';
  
  //console.log('$pad.context.textBaseline = ' + $pad.context.textBaseline);
  
  var TextParticle = Particle.extend({
    setup: function () {
      console.log('setup() TextParticle at ' + this.location + ' with "' + this.text + '" as text.');
    },
    update: function () {
      var acc = Point.random(-0.6, 0.6);
      
      // var acc = new Point(
      //   Math.cos($pad.frame/100),
      //   Math.sin($pad.frame/100)
      // );
      
      this.velocity.add(acc);
      this.location.add(this.velocity);
      
      if (this.velocity.mag() > 5) {
        this.velocity = Point();
      }
    },
    draw: function () {
      fill('white');
      stroke('black');
      circle(this.location, this.radius);
      
      fill('black');
      font('bold 42px sans-serif');
      text(this.text, this.location);
    }
  });
  
  var text_particles = [];
  
  $pad.keydown(function (){
    if (this.key.length === 1) {
      var p = Point.random();
      var tp = new TextParticle({
        location: p,
        text: this.key,
        radius: 30
      });
    
      text_particles.push(tp);
    }
  });
  
  $pad.clear(false);
  
  $pad.play(function () {
    
    background('rgba(255,255,255,0.05)');
    
    if ($pad.frame < 1) {
      fill('lightgray');
      font('bold 54px sans-serif');
      text('press a key', $pad.center);
    }
    
    for (var i=0; i < text_particles.length; i++) {
      var tp = text_particles[i];
      
      tp.run();
    };
    
  });
  
});
