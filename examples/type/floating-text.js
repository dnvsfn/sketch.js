/**
 * Sketch.js - Floating Text
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-09-01
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

Sketch.create( { fullscreen: true }, function () {
  
  var FloatingText = Particle.extend({
    
    update: function () {
      
      var acceleration = new Point(
          Math.cos(($c.frame/100)),
          1
        );
        
      acceleration.add(Point.random(1));
      
      this.velocity.add(acceleration);
      this.location.add(this.velocity);
      
      this.velocity.reset();
      
      // this.spin(0.01);
      // this.spin(this.angle * 0.001);
    },
    
    draw: function () {
      
      font.size = this.fontSize;
      
      push();
      move(this.location);
      rotate(this.angle);
      text(this.textString);
      pop();
    }
  });
  
  var FLOATER_COUNT = 100,
    Floaters = new List(),
    fillers = FillerText.lorem.list( FLOATER_COUNT );
  
  console.log('Floaters.add()',Floaters);
  
  // add one
  Floaters.add(
    new FloatingText({
      location: Point.random(),
      radius: 50,
      textString: 'TEST'
    })
  );
  
  // add several
  Floaters.add(
    // the amount of items to add
    FLOATER_COUNT, 
    
    // the results of this function get added to Floaters
    function ( floater, index ) { 
      
      // return the new FloatingText instance
      // that gets added to Floaters
      return new FloatingText({
        location: Point.random(),
        radius: 50,
        fontSize: map(index, 0, FLOATER_COUNT, 10, 32),
        textString: fillers[index] // filler lorem text
      });
      
    }
  );
  
  // $c.clear_screen = false;
  console.log('Floaters',Floaters);
  
  
  $pad.play(function () {
    //background('rgba(255,255,255,0.05)');
    background(255,0.05);
    fill('gray');
    text.align = 'center';
    // font.size = this.fontSize;
    //console.log('Floaters',Floaters);
    try{
    Floaters.run();
    } catch (e) {

    };
    headline();
  });
  
  function headline () {
    
    fill('black');
    
    // get 10 words of ipsum text and assign it to a variable name
    var filler = FillerText.lorem(10);
    font("42px times"); // nice and big
    text.align = 'center'; 
    text(filler, $c.center);
    
  };
  
});
