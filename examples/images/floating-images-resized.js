/**
 * Sketch.js - Floating Images Resized
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-15
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function(){

  var IMAGE_WIDTH = 160,
    IMAGE_HEIGHT = 160,
    images = [],
    IMAGES = [
      '../images/building.jpg',
      '../images/chicken.jpg',
      '../images/jonathan.jpg',
      '../images/lu.jpg'
    ];
  
  var Pic = Particle.extend({
    setup: function () {
      this.resizeImage();
    },
    resizeImage: function() {
      
      var s = this.source_size, 
        n = new Size(), 
        crop = new Point();
      
      if (s.width > s.height) {
        n = new Size(s.height, s.height);
      } else if (s.width < s.height) {
        n = new Size(s.width, s.height);
      }
      
      $c.context.drawImage(
        this.image, 
        crop.x, 
        crop.y, 
        n.width, 
        n.height, 
        0, 
        0, 
        this.size.width, 
        this.size.height
      );
      
      this.image_resized = $c.context.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
      $c.context.clearRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
      
    },
    update: function() {
      
      var acc = new Point(
        Math.round(Math.random() * 1) > 0 ? 0.1 : -0.1,
        Math.round(Math.random() * 1) > 0 ? 0.1 : -0.1
      );
      
      this.acceleration = acc;
      
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration = new Point();
      this.velocity.limit(10);
    },
    draw: function() {
      $c.context.putImageData(this.image_resized, this.location.x, this.location.y);
    }
  });
  
  for (var i = 0; i < IMAGES.length; i++) {
    
    var img = new Image(), 
      img_src = IMAGES[i];
    
    img.id = i;
    img.onload = function() {
      
      var loc = new Point(
        (40 * this.id) + (IMAGE_WIDTH * this.id) + 40,
        100
      );
      
      size = new Size(IMAGE_WIDTH, IMAGE_HEIGHT);
      original_size = new Size(this.width, this.height);
      
      var pic = new Pic ({
        location: loc, 
        size: size, 
        source_size: original_size, 
        image: this
      });
      
      images.push(pic);
      
      pic.run();
      
      return true;
    };
    img.src = img_src;
  };
  
  $pad.clear(false);
  
  // function draw () {
  $pad.play( function () { 
    background('rgba(255,255,255,0.07)');
    for (var i = 0; i < images.length; i++) {
      var p = images[i];
      p.run();
    };
  });
  
});
