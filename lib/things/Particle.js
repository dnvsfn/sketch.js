(function () {
	
	/** @class */
	this.Particle = Base.extend({
		
		/** @constructor */
		init: function () {
			
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
			
			if (!this.hasOwnProperty('angle')) {
				this.angle = 0;
			}
			
			this.outOfBounds = false;
			this.setup(arguments); // pass arguments to setup()
			
			return this;
		},
		
		/** @function **/
		setup: function () {
			
		},
		
		/** @function **/
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
		
		/** @function **/
		_update: function () {
			// console.log('_update()');
			
			this.location.add(this.velocity);
		},
		
		update: function () {
			// console.log('update()');
		},
		
		/** @function **/
		draw: function () {
			// console.log('draw()');
		},
		
		/** @function **/
		run: function () {
			// console.log('run()');
			this.checkBounds();
			this._update();
			this.update();
			this.draw();
		},
		
		/** @function **/
		remove: function () {
			
		},
		
		spin: function (spinIncrement) {
			this.angle += spinIncrement;
		}
	});
	
	
	
})();