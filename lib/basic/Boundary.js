var Boundary = (function () {
	
	function Boundary () {
		var args = arguments;
		
		// this.location = $p();
		// this.size = new Size();
		
		if (args.length === 2) {
			
			if (args[0] instanceof Point && args[1] instanceof Size) {
				this.location = args[0];
				this.size = args[1];
			} 
			
		}
		
	};
	
	Boundary.prototype = {
		
	};
	
	return Boundary;
	
})();