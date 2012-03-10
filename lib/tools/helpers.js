/**
* helper shortcuts
* @class
*/
(function () {
	
	/**
	* Set background color
	* @function
	* @param [color] Desired background color
	*/
	this.background = function () {
		var args = arguments;
		
		if (args.length === 1) {
		  
		  if (!(args[0] instanceof Color)) {
		    color = new Color(args[0]);
		  } else {
		    color = args[0];
		  }
		  
		} else if (args.length === 2) {
		  color = new Color(args[0], args[1]);
		} else if (args.length === 3) {
		  color = new Color(args[0], args[1], args[2]);
		} else if (args.length === 4) {
		  color = new Color(args[0], args[1], args[2], args[3]);
		}
    
    color = color.toString();
    
		$c.context.fillStyle = color;
		$c.context.fillRect(0, 0, $c.WIDTH, $c.HEIGHT);
		
	};
	
	/**
	* Drawing Shortcuts
	*/
	
	/**
	* Set current stroke
	* @function
	* @param [color] Desired stroke color
	*/
	 function stroke (color) {
		
		if (color instanceof Color) {
			color = color.toString();
		}
		
		$c.strokeColor = color;
		$c.context.strokeStyle = color;
	};
	
	this.stroke = stroke;
	
	/**
	* Set current stroke width
	* @function
	* @param [width] Desired stroke size
	*/
	function strokeSize (width) {
		$c.context.lineWidth = width;
	};
	
  this.strokeSize = strokeSize;
  
	//this.stroke.size = function (width) {
		//return strokeSize(width);
	//};
	
	/**
	* Set current fill color
	* @function
	* @param [color] Desired fill color
	*/
	this.fill = function (color) {
    
		if (color instanceof Color) {
			color = color.toString();
		}
		
		$c.fillColor = color;
		$c.context.fillStyle = color;
		// endPath();
	};
	
	/**
	* Set alpha level for current context
	* @function
	* @param [alpha] Desired alpha level (0.0 - 1.0)
	*/
	this.opacity = function (alpha) {
		return $c.context.globalAlpha = alpha;
	};
	
	/*
		Drawing Predefined Shapes
	*/
	
	/**
	* Draw rectangle()
	* @function
	* @description Draws a rectangle on canvas. 
	* Requires two arguments (point, size), three arguments (point, width, height), or four arguments (x, y, width, height);
	*
	* @param {Point} [point] The position where rectangle will be drawn
	* @param {Size} [rectSize] Size() instance specifing height and width
	* @param {Number} [x] The X coordinate where rectangle will be drawn
	* @param {Number} [y] The Y coordinate where rectangle will be drawn
	* @param {Number} [width] Desired width of rectangle
	* @param {Number} [height] Desired height of rectangle
	* 
	* @example
	* rectangle(new Point(100, 100), new Size(75, 50));
	*
	* var rectPosition = new Point(100, 100),
	*     rectWidth = 75,
	*     rectHeight = 50;
	* rectangle(rectPosition, rectWidth, rectHeight);
	* 
	* rectangle(100, 100, 75, 50); // x, y, width, height
	*/
	this.rectangle = function () {
		var args = arguments,
			position,
			rectSize;
		
		if (args.length === 2) {
			
			if (args[0] instanceof Point && args[1] instanceof Size) {
				position = args[0];
				rectSize = args[1];
				
			} else {
				throw "[SketchJS] rectangle(postion, rectSize) invalid arguments, requires position [Point] and rectSize [Size]";
			}
			
		} else if (args.length === 3) {
			
			if (args[0] instanceof Point &&
				typeof args[1] === 'number' &&
				typeof args[2] === 'number') {
				
				position = new args[0];
				rectSize = new Size(args[1], args[2]);
				
			} else {
				throw "[SketchJS] rectangle(position, width, height) invalid arguments, requires position [Point], width [Number], and height [Number]";
			}
			
		} else if (args.length === 4) {
			
			if (typeof args[0] === 'number' &&
				typeof args[1] === 'number' &&
				typeof args[2] === 'number' &&
				typeof args[3] === 'number') {
				
				position = new Point(args[0], args[1]);
				rectSize = new Size(args[2], args[3]);
				
			} else {
				throw "[SketchJS] rectangle(x, y, width, height) invalid arguments, requires x [Number], y [Number], width [Number], and height [Number]";
			}
			
		}
		
		if (position instanceof Point && rectSize instanceof Size) {
			
			// draw rectangle fill
			if ($c.fillColor !== false) {
				$c.context.fillRect(position.x, position.y, rectSize.width, rectSize.height);
			}
			
			// draw rectangle stroke
			if ($c.strokeColor !== false) {
				$c.context.strokeRect(position.x, position.y, rectSize.width, rectSize.height);
			}
		
		}
	};
	
	/**
	* Draw square()
	* @function
	* @description Draws a square on canvas. 
	* Requires two arguments (point, squareSize) or three arguments (x, x, squareSize). 
	* square() is a shortcut of rectangle() that doesn't require width and height and 
	* uses squareSize to set both at runtime instead.
	* 
	* @param {Point} [point] The position where square will be drawn
	* @param {Number} [x] The X coordinate where square will be drawn
	* @param {Number} [y] The Y coordinate where square will be drawn
	* @param {Number} [squareSize] Desired size (width/height) of square
	* 
	* @example
	* var squarePosition = new Point(100, 100);
	* square(squarePosition, 50); // draws a square at x: 100, y: 100 with a width & height of 50
	* 
	* var x = 100, y = 100, squareSize = 50;
	* square(x, y, squareSize); // does the exact same thing
	*/
	this.square = function () {
		// rectangle(x, y, s, s);
		
		var args = arguments,
			position,
			squareSize;
		
		if (args.length === 2) {
			
			if (args[0] instanceof Point && typeof args[1] === 'number') {
				position = args[0];
				squareSize = new Size(args[1], args[1]);
			} else {
				throw "[SketchJS] square() invalid arguments, requires position [Point] and squareSize [Number]";
			}
			
		} else if (args.length === 3) {
			
			if (typeof args[0] === 'number' &&
				typeof args[1] === 'number' &&
				typeof args[2] === 'number') {
					position = new Point(args[0], args[1]);
					squareSize = new Size(args[2],args[2]);
				} else {
					throw "[SketchJS] square() invalid arguments, requires x [Number], y [Number], and squareSize [Number]";
				}
			
		}
		
		if (position instanceof Point && squareSize instanceof Size) {
			// console.log('square(' + position.toString() + ', ' + squareSize.toString() + ')');
			
			rectangle(position, squareSize);
			
		}
		
	};
	
	/**
	* Draw circle()
	* @function
	* @description Draws circle on canvas. Requires two arguments (Point, radius) or three arguments (x, y, radius)
	* @param {Point} [point] The position where circle will be drawn
	* @param {Number} [x] The X coordinate where circle will be drawn
	* @param {Number} [y] The Y coordinate where circle will be drawn
	* @param {Number} [radius] Desired radius of circle
	*
	* @example
	* var circlePosition = new Point(100, 100);
	* circle(circlePosition, 50); // Draws a circle at x: 100, y: 100, with a radius of 50
	* 
	* var x = 100, y = 100, radius = 50;
	* circle(x, y, radius); // does the exact same thing
	*/
	this.circle = function () {
		var args = arguments,
			position,
			radius;
		
		if (args.length === 2 ) {
			
			if (args[0] instanceof Point && typeof args[1] === 'number') {
				position = args[0];
				radius = args[1];
			} else {
				throw "[SketchJS] circle(position, radius) invalid arguments, requires position [Point] and radius [Number]";
			}
			
		} else if (args.length === 3) {
			
			if (typeof args[0] === 'number' &&
				typeof args[1] === 'number' &&
				typeof args[2] === 'number') {
					position = new Point(args[0], args[1]);
					radius = args[2];
				} else {
					throw "[SketchJS] circle(x, y, radius) invalid arguments, requires x [Number], y [Number], and radius [Number]";
				}
			
		}
		
		if (position instanceof Point && typeof radius === 'number') {
			
			$c.context.beginPath();
			$c.context.arc(position.x, position.y, radius, 0, Math.PI*2, true); 
			$c.context.closePath();
		
			Path.end();
		}
		
	}
	
	/*
		Paths
	*/
	
	/*
		Movers
	*/
	this.translate = function () {
		var args = arguments,
			v = new Point();
		
		if (args.length === 2) {
			if (typeof args[0] === "number") {
				v.x = args[0];
			}
			if (typeof args[1] === "number") {
				v.y = args[1];
			}
		} else if (args.length === 1) {
			if (args[0] instanceof Point) {
				v = args[0];
			}
		}
		
		return $c.context.translate(v.x, v.y);
	};
	
	this.move = translate;
	
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
	* Misc
	*/
	
	this.isInt = function (numberValue) {
		if (parseFloat(numberValue) == parseInt(numberValue) && !isNaN(numberValue) ) {
			return true;
		} else {
			return false;
		}
	};
	
})();
