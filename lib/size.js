var Size = (function () {
	
	function Size (width, height) {
		this.width = width !== undefined && typeof width === "number" ? width : 0;
		this.height = height !== undefined && typeof height === "number" ? height : 0;
	};
	
	Size.prototype = {
		toString: function () {
			return '{ width: ' + this.width + ', height: ' + this.height + '}';
		}
	};
	
	return Size;
	
}());