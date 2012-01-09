(function () {
	
	this.Color = function () {
		this.red = 0;
		this.green = 0;
		this.blue = 0;
	};
	
	Color.frame = function () {
		var a = arguments,
			rw = 1,
			gw = 1,
			bw = 1;
		
		if (a.length === 3) {
			rw = a[0],
			gw = a[1],
			bw = a[2];
		}
		
		var r = Math.round(map(Math.cos(($c.frame * rw)/100),-1,1,0,255))
			g = Math.round(map(Math.cos(($c.frame * gw)/100),-1,1,0,255))
			b = Math.round(map(Math.cos($c.frame * bw/100),-1,1,0,255));
			
		return 'rgba(' + r + ',' + g + ',' + b + ',255)';
	};
	
	Color.rgb = function () {
		
	};
	
})();