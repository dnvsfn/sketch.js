(function () {
	
	this.background = function (color) {
		
		$c.context.fillStyle = color;
		$c.context.fillRect(0, 0, $c.WIDTH, $c.HEIGHT);
		
	};
	
	/*
		Drawing
	*/
	this.stroke = function (color) {
		$c.strokeColor = color;
		$c.context.strokeStyle = color;
		// endPath();
		// console.log($c.context.strokeStyle);
	};
	
	this.strokeSize = function (width) {
		$c.context.lineWidth = width;
	};
	
	this.fill = function (color) {
		$c.fillColor = color;
		$c.context.fillStyle = color;
		// endPath();
	};
	
	this.opacity = function (alpha) {
		return $c.context.globalAlpha = alpha;
	};
	
	/*
		Predefined Shapes
	*/
	this.rectangle = function (x, y, w, h) {
		
		if ($c.fillColor !== false) {
			$c.context.fillRect(x, y, w, h);
		}
		if ($c.strokeColor !== false) {
			$c.context.strokeRect(x, y, w, h);
		}
		
		// return $c.context.fillRect(x, y, w, h);
	};
	
	this.square = function (x, y, s) {
		rectangle(x, y, s, s);
	};
	
	this.circle = function () {
		// $c.context.fillStyle = color;
		
		// var p = arguments[0],
			// r = arguments[1];
		
		var a = arguments,
			p,
			r;
		
		if (a.length === 2 ) {
			p = a[0]
			r = a[1];
			
		} else if (a.length === 3) {
			p = new Point(a[0], a[1]);
			r = a[2];
		}
		
		$c.context.beginPath();
		$c.context.arc(p.x, p.y, r, 0, Math.PI*2, true); 
		$c.context.closePath();
		
		endPath();
		
	}
	
	/*
		Paths
	*/
	this.beginPath = function () {
		// console.log('beginPath()');
		return $c.context.beginPath();
	};
	
	this.endPath = function () {
		// console.log('endPath()');
		
		if ($c.fillColor !== false) {
			$c.context.fill();
		}
		if ($c.strokeColor !== false) {
			$c.context.stroke();
		}
	};
	
	this.moveTo = function () {
		var p = new Point();
		
		if (arguments.length === 1) {
			p = arguments[0];
		} else if (arguments.length === 2) {
			p.x = arguments[0];
			p.y = arguments[1];
		}
		
		// console.log('moveTo(' + p.x + ', ' + p.y +')');
		
		return $c.context.moveTo(p.x, p.y);
	};
	
	this.lineTo = function () {
		var p = new Point();
		
		if (arguments.length === 1) {
			p = arguments[0];
		} else if (arguments.length === 2) {
			p.x = arguments[0];
			p.y = arguments[1];
		}
		
		// console.log('lineTo(' + p.x + ', ' + p.y +')')
		
		return $c.context.lineTo(p.x, p.y);
	};
	
	/*
		Movers
	*/
	this.translate = function (x, y) {
		return $c.context.translate(x, y);
	};
	
	this.rotate = function (angle) {
		return $c.context.rotate(angle);
	};
	
	/*
		Transformation States
	*/
	this.push = function () {
		return $c.context.save();
	};
	
	this.pop = function () {
		return $c.context.restore();
	};
	
	/*
		Math
	*/
	
	this.random = function () {
		var a = arguments;
		
		if (a.length === 1) {
			var max = a[0];
			return Math.random() * max;
			
		} else if (a.length === 2) {
			var min = a[0],
				max = a[1];
			return Math.round(min + (Math.random() * (max-min) ));
			
		} else if (a.length === 3) {
			var min = a[0],
				max = a[1],
				dec = a[2];
			return (Math.round(min + (Math.random() * (max-min) ))).toFixed(dec);
		}
		
	};
	
	this.norm = function (value, low, high) {
	  return (value - low) / (high - low);
	};

	this.map = function (value, istart, istop, ostart, ostop) {
	  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	};

	this.lerp = function (value1, value2, amt) {
	  return ((value2 - value1) * amt) + value1;
	};
	
	/*
		Typography
	*/
	
	this.text = function () {
		var args = arguments,
			text,
			point;
		
		if (args.length === 2) {
			if (typeof args[0] === "string" && args[1] instanceof Point) {
				text = args[0],
				point = args[1];
			}
		}
		
		if (typeof text !== "undefined" && typeof point !== "undefined") {
			return $c.context.fillText(text, point.x, point.y);
		}
		
	};
	
	Sketch.defineProperty(text, "baseline", {
		get: function () {
			console.log('getting text.baseline');
			return $c.context.textBaseline;
		},
		set: function (b) {
			console.log('setting text.baseline');
			return $c.context.textBaseline = b;
		}
	});

	Sketch.defineProperty(text, "align", {
		get: function () {
			console.log('getting text.baseline');
			return $c.context.textAlign;
		},
		set: function (a) {
			console.log('setting text.baseline');
			return $c.context.textAlign = a;
		}
	});
	
	
})();