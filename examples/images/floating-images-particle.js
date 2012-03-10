/**
 * Sketch.js - Floating Images Particle
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-15
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  var images = [];
    IMAGE_WIDTH = 80,
    IMAGE_HEIGHT = IMAGE_WIDTH,
    IMAGES = [
      '../images/building.jpg',
      '../images/chicken.jpg',
      '../images/jonathan.jpg',
      '../images/lu.jpg'
    ];
    
  var Pic = Particle.extend({
    update: function () {
      var acc = new Point(
        Math.cos($pad.frame / 100) + this.speed,
        Math.sin($pad.frame / 100) + this.speed
      );

      var dir = new Point(
        map($pad.mouse.x, 0, $pad.width, -2.0, 2.0),
        map($pad.mouse.y, 0, $pad.height, -2.0, 2.0)
      );

      this.velocity.add(acc);
      this.velocity.add(dir);

      this.location.add(this.velocity);

      this.velocity = new Point();
    },
    draw: function () {
      $c.context.drawImage(
        this.image, 
        this.location.x, 
        this.location.y, 
        this.size.width, 
        this.size.height
      );
    }
  });
  
  for (var i=0; i < IMAGES.length; i++) {
    
    var point, size, image, speed;
    
    point = new Point(
      Math.random() * $pad.width,
      Math.random() * $pad.height
    );
    
    size = new Size(
      map(i, 0, IMAGES.length, 10, IMAGE_WIDTH),
      map(i, 0, IMAGES.length, 10, IMAGE_HEIGHT)
    );
    
    speed = map(i, IMAGES.length, 0, 0.1, 1.0);
    
    image = new Image();
    image.onload = function(){
      $c.context.drawImage(this, point.x, point.y, size.width, size.height);
    };
    image.src = IMAGES[i];
    
    var pic = new Pic({
      location: point, 
      size: size, 
      speed: speed, 
      image: image
    });
    images.push(pic);
  };

  $pad.play( function () {
    for (var i=0; i < images.length; i++) {
      var img = images[i];
      img.run();
    };
  });
	
});
