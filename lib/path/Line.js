var Line = (function () {
	
	function Line (startPoint, endPoint) {
		var args = arguments;
		
		if (!(this instanceof Line)) {
			if (args.length === 2) {
				return new Line(args[0], args[1]);
			} else {
				SketchError.raise('line() requires two points');
			}
		}
		
		this.start = startPoint || new Point();
		this.end = endPoint || new Point();
		
		this.length = Point.distance(this.start, this.end);
		
		// var p1, p2;
		
		// if (Array.isArray(start_point)) {
		// 	p1 = new Point(start_point[0], start_point[1]);
		// } else {
		// 	p1 = start_point;
		// }
		// if (Array.isArray(end_point)) {
		// 	p2 = new Point(end_point[0], end_point[1]);
		// } else {
		// 	p2 = end_point
		// }
		
		this.draw();
		
		return this;
	};
	
	Line.prototype = {
		
		draw: function () {
			
			var p1 = this.start,
				p2 = this.end;
			
			$c.context.beginPath();
			$c.context.moveTo(p1.x, p1.y);
			$c.context.lineTo(p2.x, p2.y);
			$c.context.stroke();
			
		}
		
	};
	
	this.line = Line;
	
	return Line;
	
})();