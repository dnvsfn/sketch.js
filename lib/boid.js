var Boid = (function () {

	function Boid (id, location, radius, max_speed, max_force, canvasContext) {
		this.id = id;
		this.acceleration = new Point();
		this.velocity = new Point(Math.random() < 0.5 ? -0.5 : 0.5, Math.random() < 0.5 ? -0.5 : 0.5);
		this.location = location;
		this.radius = radius;
		this.max_speed = max_speed;
		this.max_force = max_force;
		this.canvas = canvasContext;
		this.context = canvasContext.context;
		
		return this;
	}

	Boid.prototype = {
		run: function (flock) {
			this.flock(flock);
			this.update();
			this.borders();
			this.render();
		},
		flock: function (flock) {
			var sep = this.separate(flock),
				ali = this.align(flock),
				coh = this.cohesion(flock);
			
			sep.mult(1.5);
			ali.mult(1.0);
			coh.mult(1.0);
			
			this.acceleration.add(sep);
			this.acceleration.add(ali);
			this.acceleration.add(coh);
		},
		update: function () {
			// this.acceleration.add(new Point(Math.random()<0.5?-1:1, Math.random()<0.5?-1:1));
			this.velocity.add(this.acceleration);
			this.velocity.limit(this.max_speed);
			this.location.add(this.velocity);
			this.acceleration = new Point();
		},
		seek: function (target) {
			this.acceleration.add(this.steer(target, false));
		},
		arrive: function (target) {
			this.acceleration.add(this.steer(target, true));
		},
		steer: function (target, slowdown) {
			var steer,
				desired = Point.sub(target, this.location),
				d = desired.mag();
				
			if (d > 0) {
				desired.normalize();
				
				if ((slowdown) && (d < 100.0)) {
					desired.mult(this.max_speed * (d/100.0));
				} else {
					desired.mult(this.max_speed);
				}
				
				steer = Point.sub(desired, this.velocity);
				steer.limit(this.max_force);
			} else {
				steer = new Point();
			}
			
			return steer;
		},
		render: function () {
			var theta = this.velocity.heading() + (Math.PI/2);
			
			this.context.fillStyle = 'black';
			this.context.save();
			this.context.translate(this.location.x, this.location.y);
			this.context.rotate(theta);
			this.context.translate(-(this.radius/2), -(this.radius/2));
			this.context.fillRect(0, 0, this.radius/2, this.radius);
			
			// this.context.fillRect(0, 0, Math.abs(this.velocity * 50), Math.abs(this.velocity * 5));
			
			this.context.restore();
		},
		borders: function () {
			if (this.location.x < -this.radius) {
				this.location.x = this.canvas.WIDTH + this.radius;
			}
			if (this.location.y < -this.radius) {
				this.location.y = this.canvas.HEIGHT + this.radius;
			}
			if (this.location.x > this.canvas.WIDTH + this.radius) {
				this.location.x = -this.radius;
			}
			if (this.location.y > this.canvas.HEIGHT + this.radius) {
				this.location.y = -this.radius;
			}
		},
		separate: function (flock) {
			// var desiredseparation = 20.0,
			var desiredseparation = this.radius * 2,
				steer = new Point(),
				count = 0;
			
			for (var i=0; i < flock.length; i++) {
				var other = flock[i],
					d = Point.distance(this.location, other.location);
				
				if ((d > 0) && (d < desiredseparation)) {
					var diff = Point.sub(this.location, other.location);
					diff.normalize();
					diff.div(d);
					steer.add(diff);
					count++;
				}
			};
			
			if (count > 0) {
				steer.div(count);
			}
			
			if (steer.mag() > 0) {
				steer.normalize();
				steer.mult(this.max_speed);
				steer.sub(this.velocity);
				steer.limit(this.max_force);
			}
			return steer;
		},
		align: function (flock) {
			// var neighbordist = 25.0,
			var neighbordist = this.radius * 2,
				steer = new Point(),
				count = 0;
			
			for (var i=0; i < flock.length; i++) {
				var other = flock[i],
					d = Point.distance(this.location, other.location);
				
				if ((d > 0) && (d < neighbordist)) {
					steer.add(other.velocity);
					count++;
				}
			};
			
			if (count > 0) {
				steer.div(count);
			}
			
			if (steer.mag() > 0) {
				steer.normalize();
				steer.mult(this.max_speed);
				steer.sub(this.velocity);
				steer.limit(this.max_speed);
			}
			return steer;
			
		},
		cohesion: function (flock) {
			// var neighbordist = 25.0,
			var neighbordist = this.radius,
				sum = new Point(),
				count = 0;
			
			for (var i=0; i < flock.length; i++) {
				var other = flock[i],
					d = Point.distance(this.location, other.location);
				
				if ((d > 0) && (d < neighbordist)) {
					sum.add(other.location);
					count++;
				}
			};
			
			if (count > 0) {
				sum.div(count);
				return this.steer(sum, false);
			}
			return sum;
		}
		
	};
	
	return Boid;
	
}());