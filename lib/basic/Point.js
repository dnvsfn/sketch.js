var Point = (function () {
	
	
	/**
	 * Creates new Point
	 * @class
	 * @param {float} [x] the x coordinate of point
	 * @param {float} [y] the y coordinate of point
	 * @returns New instance of Point()
	 * @type Point
	 * 
	 * @example
	 * var p = new Point();
	 * console.log( p ); // { x: 0, y: 0 }
	 * 
	 * var p = new Point(50, 100);
	 * console.log( p ); // { x: 50, y: 100 }
	 */
	function Point () {
		
		var self = self || this,
			args = arguments,
			x = 0,
			y = 0;
		
		/** If Point() is called without new, create it */
		if (!(this instanceof Point)) {
			
			var newPoint;
			
			if (args.length === 2) {
				newPoint = new Point(args[0], args[1]);
			} else if (args.length === 1) {
				newPoint = new Point(args[0]);
			} else {
				newPoint = new Point(0, 0);
			}
			
			if (newPoint instanceof Point) {
				return newPoint;
			}
		}
		
		/** Create new point from point */
		if (args.length === 1) {
			if (args[0] instanceof Point) {
				x = args[0].x;
				y = args[0].y;
			}
		
		/** Set x/y */
		} else if (args.length === 2) {
			x = args[0];
			y = args[1];
		}
		
		/** Update current instance */
		this.x = x;
		this.y = y;
		
		/** Return new Point() */
		return this;
	};
	
	/**
	 * Finds the sum of two points
	 * @public
	 * @param {Point} point Point to be added
	 * @returns Modified point
	 * @type Point
	 * 
	 * @example
	 * // add to an existing point
	 * var point1 = new Point(5, 5);
	 * var point2 = new Point(10, 10);
	 * point1.add(point2);
	 * console.log( point1 ); // { x: 15, y: 15 }
	 * 
	 * // create a new point from the sum of two
	 * var point3 = Point.add(point1, point2);
	 * console.log( point3 ); // { x: 15, y: 15 }
	 */
	Point.add = function (point1 /**Point*/, point2 /**Point*/) {
		var a,
			b,
			v = new Point();
			
		if (point1 instanceof Point) {
			a = point1;
		} else if (typeof point1 === "number") {
			a = new Point(point1, point1);
		}
		
		if (point2 instanceof Point) {
			b = point2;
		} else if (typeof point2 === "number") {
			b = new Point(point2, point2);
		}
		
		if (typeof a !== "undefined" && typeof b !== "undefined") {
			v.x = a.x + b.x;
			v.y = a.y + b.y;
		}
		
		return v;
	};
	
	/**
	 * Finds the difference of two points
	 * @public
	 * @param {Point} point Point to be subtracted
	 * @returns Modified point
	 * @type Point
	 * 
	 * @example
	 * var p = new Point(50, 50);
	 * p.sub(new Point(15, 30));
	 * console.log(p); // { x: 35, y: 20 }
	 * 
	 * var p1 = new Point(50, 50);
	 * var p2 = new Point(15, 30);
	 * console.log( Point.sub(p1, p1) ); // { x: 35, y: 30 }
	 */
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
			
		// console.log('Point.random()');
		
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
		norm: function () {
			return this.normalize();
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
		},
		reset: function () {
			this.x = 0;
			this.y = 0;
			
			return this;
		}
	}
	
	this.$p = Point;
	
	return Point;
	
})();