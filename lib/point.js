(function () {
	
	this.Point = function () {
		
		var self = self || this,
			args = arguments,
			x = 0,
			y = 0;
		
		if (!(this instanceof Point)) {
			return new Point();
		}
		
		if (args.length === 1) {
			if (args[0] instanceof Point) {
				x = args[0].x;
				y = args[0].y;
			}
		} else if (args.length === 2) {
			x = args[0];
			y = args[1];
		}
		
		this.x = x;
		this.y = y;
		
		/*
		Object.defineProperty(self, "", {
			get: function () {
			},
			set: function (val) {
			}
		});
		*/
		
		return this;
	};
	
	Point.add = function () {
		var a = arguments[0],
			b = arguments[1],
			v = new Point();
		v.x = a.x + b.x;
		v.y = a.y + b.y;
		return v;
	};
	
	Point.sub = function () {
		var a = arguments[0],
			b = arguments[1],
			v = new Point();
			
		v.x = a.x - b.x;
		v.y = a.y - b.y;
		
		return v;
	};
	
	Point.mult = function () {
		var a = arguments[0],
			b = arguments[1],
			v = new Point();
		
		if (typeof b === 'number') {
			v.x = a.x * b;
			v.y = a.y * b;
		} else if (typeof b === 'object') {
			v.x = a.x * b.x;
			v.y = a.y * b.y;
		}
		return v;
	};
	
	Point.div = function () {
		var a = arguments[0],
			b = arguments[1],
			v = new Point();
		
		if (typeof b === 'number') {
			v.x = a.x / b;
			v.y = a.y / b;
		} else if (typeof b === 'object') {
			v.x = a.x / b.x;
			v.y = a.y / b.y;
		}
		return v;
	};
	
	Point.distance = function () {
		var a = arguments[0];
			b = arguments[1],
			v = new Point();
			
		v.x = a.x - b.x;
		v.y = a.y - b.y;
		
		return Math.sqrt(v.x * v.x + v.y * v.y);
	};
	
	Point.heading = function () {
		var v = arguments[0];
		return (-Math.atan2(-v.y, v.x));
	};
	
	Point.random = function () {
		var v = new Point(), 
			rand, 
			rx, 
			ry;
		
		if (arguments.length === 1) {
			rand = arguments[0];
			
			/*
				example:
				var point = new Point(100,100);
				var randPoint = Point.random(point);
			*/
			if (rand instanceof Point) {
				rx = rand.x;
				ry = rand.y;
				
			/*
				example:
				var randPoint = Point.random([100,100]);
			*/
			} else if (Array.isArray(rand)) {
				rx = rand[0];
				ry = rand[1];
			
			/*
				example:
				var randPoint = Point.random(100);
			*/
			} else if (typeof rand === 'number') {
				rx = rand;
				ry = rand;
			}
			
			v.x = random(rx);
			v.y = random(ry);
			
		} else if (arguments.length === 2) {
			var p1 = arguments[0],
				p2 = arguments[1],
				rand1,
				rand2,
				v;
			
			if (p1 instanceof Point) {
				rand1 = p1;
			
			} else if (Array.isArray(p1)) {
				rand1 = new Point(p1[0], p1[1]);
				
			} else if (typeof p1 === 'number') {
				rand1 = new Point(p1, p1);
			}
			
			if (p2 instanceof Point) {
				rand2 = p2;
			
			} else if (Array.isArray(p2)) {
				rand2 = new Point(p2[0], p2[1]);
			
			} else if (typeof p2 === 'number') {
				rand2 = new Point(p2, p2);
			}
			
			v.x = random(rand1.x, rand2.x);
			v.y = random(rand1.y, rand2.y);
			
		} else if (arguments.length === 4) {
			v.x = random(arguments[0], arguments[2]);
			v.y = random(arguments[1], arguments[3]);
		} else {
			v.x = random($c.WIDTH);
			v.y = random($c.HEIGHT);
		}
		
		// console.log('random(' + v.x + ',' + v.y + ')');
		
		return v;
	};
	
	Point.prototype = {
		add: function () {
			var v = arguments[0];
			this.x += v.x;
			this.y += v.y;
			return this;
		},
		sub: function () {
			var v = arguments[0];
			this.x -= v.x;
			this.y -= v.y;
			return this;
		},
		mult: function () {
			var v = arguments[0];
			
			if (typeof v === 'number') {
				this.x *= v;
				this.y *= v;
			} else if (typeof v === 'object') {
				this.x *= v.x;
				this.y *= v.y;
			}
			return this;
		},
		div: function () {
			var v = arguments[0];
			if (typeof v === 'number') {
				this.x /= v;
				this.y /= v;
			} else if (typeof v === 'object') {
				this.x /= v.x;
				this.y /= v.y;
			}
			return this;
		},
		limit: function (max) {
			if (this.mag() > max) {
				this.normalize();
				this.mult(max);
			}
			return this;
		},
		mag: function () {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		},
		normalize: function () {
			var n = this.mag();
			if (n > 0) {
				return this.div(n);
			}
			return n;
		},
		distance: function () {
			var a = arguments[0],
				v = new Point();
			v.x = this.x - a.x;
			v.y = this.y - a.y;
			return Math.sqrt(v.x * v.x + v.y * v.y);
		},
		heading: function () {
			return (-Math.atan2(-this.y, this.x));
		},
		toString: function () {
			return '{ x: ' + this.x + ', y: ' + this.y + ' }';
		}
	}
	
})();