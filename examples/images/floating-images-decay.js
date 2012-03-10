/**
 * Sketch.js - Floating Images Decay
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-15
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  var images = [],
    IMAGE_WIDTH = 80,
    IMAGE_HEIGHT = IMAGE_WIDTH,
    IMAGES = [
      '../images/building.jpg',
      '../images/chicken.jpg',
      '../images/jonathan.jpg',
      '../images/lu.jpg'
    ];
  
  $pad.clear(false);
  
  for (var i=0; i < IMAGES.length; i++) {
    
    var p, s;
    
    p = new Point(
      Math.random() * $pad.width,
      Math.random() * $pad.height
    );
    
    s = new Size(
      map(i, 0, IMAGES.length, 10, IMAGE_WIDTH),
      map(i, 0, IMAGES.length, 10, IMAGE_HEIGHT)
    );
    
    img = new Image();
    img.onload = function(){
      $c.context.drawImage(this, p.x, p.y, s.width, s.height);
    }
    img.src = IMAGES[i];

    var speed = map(i, 0, IMAGES.length, 2.0, 0.01);

    images.push({
      location: p,
      acceleration: new Point(),
      velocity: new Point(),
      speed: speed,
      size: s,
      image: img
    });

  };
  
  $pad.play( function () {
    stroke('black');
    
    for (var i=0; i < images.length; i++) {
      var img = images[i],
        l = img.location,
        s = img.size;
      
      // add acceleration
      img.acceleration = new Point(
      	Math.cos($pad.frame / 100) + img.speed,
      	Math.sin($pad.frame / 100) + img.speed
      );

      var direction = new Point(
      	map($pad.mouse.x, 0, $pad.width, -2.0, 2.0),
      	map($pad.mouse.y, 0, $pad.height, -2.0, 2.0)
      );

      img.acceleration.add(direction);
      img.velocity.add(img.acceleration);
      img.location.add(img.velocity);
      
      // check bounds
      if (l.x > $pad.width + s.width) {
        l.x = -s.width;
      } else if (l.x < -s.width) {
        l.x = $pad.width + s.width;
      } else {
        l.x += img.velocity.x;
      }
      if (l.y < -s.height) {
        l.y = $pad.height + s.height;
      } else if (l.y > $pad.height + s.height) {
        l.y = -s.height;
      } else {
        l.y += img.velocity.y;
      }
      
      // draw image
      $c.context.drawImage(
       img.image, 
       l.x, 
       l.y, 
       s.width, 
       s.height
      );
      
      // reset velocity
      img.velocity = new Point();
    };
  });
  
});
