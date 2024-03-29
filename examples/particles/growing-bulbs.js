/**
 * Sketch.js - Glowing Bulbs
 * Copyright (C) 2011-2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * 
 * Created: 2011-08-18
 * Revised: 2012-02-08
 *
 * Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/
*/

// Array Remove - By John Resig (MIT Licensed)
// from http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Sketch.create( { fullscreen: true }, function () {

	var PARTICLE_COUNT = 10,
		particles = [],
		explosions = [],
		VEL_MAX = 5;
	
	var Explosion = function (location, radius_max) {
		this.pos = location;
		this.radius = 1;
		this.radius_max = radius_max ? radius_max : 50;
		this.color = 'rgba(' + Math.round(Math.random()*255)+ ',' + Math.round(Math.random()*255)+ ',' + Math.round(Math.random()*255)+ ',255)';
		this.canvas = $c;
		this.context = $c.context;
	};
	
	Explosion.prototype = {
		update: function () {
			this.radius += 0.5;
			if (this.radius > this.radius_max) {
				this.remove();
			}
		},
		draw: function () {
			fill(false);
			stroke(this.color);
			circle(this.pos, this.radius);
		},
		run: function () {
			this.update();
			this.draw();
		},
		remove: function () {
			for (var i=0; i < explosions.length; i++) {
				var e = explosions[i];
				
				if (this == e) {
					explosions.remove(i);
				}
			};
		}
	};
	
	function Particle (location) {
		this.location = location;
		this.velocity = new Point();
		this.acceleration = new Point();
		this.radius = 1;
		this.canvas = $c;
		this.context = $c.context;
	};

	Particle.prototype = {
		update: function () {
			
			if (this.velocity.mag() > VEL_MAX) {
				this.velocity.limit(VEL_MAX);
				this.velocity.normalize();
				// this.velocity.mult(5);
				this.explode();
			}
			
			var l = this.location;
			var acc = new Point(
				// Math.cos($c.frame/100) * Math.random() < 0.5 ? -1 : 1,
				// Math.sin($c.frame/100) * Math.random() < 0.5 ? -1 : 1
				// Math.random() < 0.5 ? -(Math.random()) : Math.random() * Math.sin($c.frame/1000),
				// Math.random() < 0.5 ? -(Math.random()) : Math.random() * Math.sin($c.frame/1000)
				Math.random() < 0.5 ? -(Math.random()) : Math.random(),
				Math.random() < 0.5 ? -(Math.random()) : Math.random()
			);
			
			this.acceleration = acc;
			this.velocity.add(this.acceleration);
			this.location.add(this.velocity);
			
			this.radius = map(this.velocity.mag(), 0, VEL_MAX, 0.1, VEL_MAX);
		},
		draw: function () {
			stroke(false);
			fill('white');
			circle(this.location, this.radius);
		},
		checkBounds: function () {
			if (this.location.x > $c.WIDTH + this.radius) {
				this.location.x = 0 - this.radius;
			} else if (this.location.x < 0 - this.radius) {
				this.location.x = $c.WIDTH + this.radius;
			};
			if (this.location.y > $c.HEIGHT + this.radius) {
				this.location.y = -this.radius;
			} else if (this.location.y < -this.radius) {
				this.location.y = $c.HEIGHT + this.radius;
			};
		},
		run: function () {
			this.checkBounds();
			this.update();
			this.draw();
		},
		explode: function () {
			var loc = new Point(this.location.x, this.location.y);
			var e = new Explosion(loc, Math.random() * 30 + 10);
			explosions.push(e);
		}
	};

	for (var i=0; i < PARTICLE_COUNT; i++) {
		var loc = new Point(Math.random() * $c.WIDTH, Math.random() * $c.HEIGHT);
		particles.push(new Particle(loc));
	};
		
  $pad.clear(false);
	
	$pad.play(function () {
		
		background(0, 0.01);
		
		for (var i=0; i < particles.length; i++) {
			var p = particles[i];
			p.run();
		};
		
		for (var i=0; i < explosions.length; i++) {
			var e = explosions[i];
			e.run();
		};
		
	});
	
});
