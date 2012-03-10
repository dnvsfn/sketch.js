var Size = (function () {
	
	/**
	 * Creates a new Size() instance
	 * @class
	 * @author me
	 */
	function Size (width, height) {
		this.width = width !== undefined && typeof width === "number" ? width : 0;
		this.height = height !== undefined && typeof height === "number" ? height : 0;
		
		return this;
	};
	
	Size.prototype = {
		toString: function () {
			return '{ width: ' + this.width + ', height: ' + this.height + '}';
		}
	};
	
	return Size;
	
})();