(function () {
	
	this.Particle = Base.extend({
		init: function () {
			// console.log(arguments);
			// console.log(this.name);
			
			if (arguments.length === 1 && typeof arguments[0] === "object") {
				
				for (var key in arguments[0]) {
					var obj = arguments[0];
					// console.log(key + " = " + obj[key]);
					this[key] = obj[key];
				}
				
			}
			
			if (!this.hasOwnProperty('location')) {
				this.location = new Point();
			}
			
			if (!this.hasOwnProperty('velocity')) {
				this.velocity = new Point();
			}
			
			if (!this.hasOwnProperty('radius')) {
				this.radius = 2.0;
			}
			
			this.outOfBounds = false;
			this.setup();
		},
		setup: function () {
			
		},
		checkBounds: function () {
			var l = this.location,
				r = this.radius;
			
			if (l.x < -r) {
				l.x = $c.WIDTH + r;
			} else if (l.x > $c.WIDTH + r) {
				l.x = -r;
			}
			if (l.y < -r) {
				l.y = $c.HEIGHT + r;
			} else if (l.y > $c.HEIGHT + r) {
				l.y = -r;
			}
			
		},
		update: function () {
			// console.log('update()');
		},
		draw: function () {
			// console.log('draw()');
		},
		run: function () {
			// console.log('run()');
			this.checkBounds();
			this.update();
			this.draw();
		},
		remove: function () {
			
		}
	});
	
	
	
})();