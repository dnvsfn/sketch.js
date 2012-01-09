(function () {
	
	this.Line = function (p1, p2) {
		
		if (Array.isArray(p1)) {
			p1 = new Point(p1[0], p1[1]);
		}
		if (Array.isArray(p2)) {
			p2 = new Point(p2[0], p2[1]);
		}
		
		$c.context.beginPath();
		$c.context.moveTo(p1.x, p1.y);
		$c.context.lineTo(p2.x, p2.y);
		$c.context.stroke();
	};
	
	Line.prototype = {
		
	};
	
})();