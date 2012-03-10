(function () {
	
	this.SketchError = function () {
		
	};
	
	SketchError.ERROR_PREFIX = '[SketchJS]';
	
	SketchError.raise = function (msg) {
		var message = msg || undefined;
		
		message = this.ERROR_PREFIX + ' ' + message;
		
		throw new Error(message);
		
	}
	
	SketchError.warn = function (msg) {
		var message = msg || undefined;
		
		message = this.ERROR_PREFIX + ' ' + message;
		
		console.warn(message);
	}
	
	SketchError.prototype = {
		
	};
	
})();