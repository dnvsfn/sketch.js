var Group = (function () {
	
	function Group () {
		var args = arguments;
		
		if (!(this instanceof Group)){
			return new Group(args[0]);
		}
		
		this._draw = false;
		this.items = new List();
		
		this.location = $p();
		this.angle = 0;
		
		if (args.length === 1) {
			
			if (typeof args[0] === 'function') {
				this._draw = args[0];
			}
			
		}
		
		// this.draw();
		
		return this;
		
	};
	
	Group.prototype = {
		
		add: function () {
			
			return this;
		},
		
		draw: function () {
			if (typeof this._draw === 'function') {
				
				push();
				move(this.location.x, this.location.y);
				rotate(this.angle);
				this._draw();
				pop();
				
			}
			
			return this;
		},
		
		move: function () {
			var args = arguments;
			
			if (args.length === 1) {
				if (args[0] instanceof Point) {
					this.location.add(args[0]);
				}
			} else if (args.length === 2) {
				if (typeof args[0] === 'number' && typeof args[1] === 'number') {
					this.location.add(new Point(args[0], args[1]));
				}
			}
			
			return this;
		},
		
		rotate: function (amount) {
			
			this.angle = amount * Math.PI/180;
			
			return this;
		},
		
		spin: function (amount) {
			
			var degrees = amount * Math.PI/180;
			
			this.angle += degrees;
			
			return this;
		}
		
	};
	
	Sketch.defineProperty(Group.prototype, 'location', {
		get: function () {
			return this._location;
		},
		set: function (location) {
			if (location instanceof Point) {
				this._location = location;
			}
		}
	});
	
	this.group = Group;
	
	return Group;
	
})();