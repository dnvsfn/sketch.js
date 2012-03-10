/**@class*/
var Text = (function () {
	
	function Text (/**String*/ /**Point*/) {
		var args = arguments,
			text,
			textPoint;
		
		if (args.length === 2) {
			if (typeof args[0] === "string" && args[1] instanceof Point) {
				text = args[0],
				textPoint = args[1];
			}
		} else if ( args.length === 1) {
			if (typeof args[0] === "string") {
				text = args[0];
				textPoint = new Point();
			}
		}
		
		if (typeof text !== "undefined" && typeof textPoint !== "undefined") {
			return $c.context.fillText(text, textPoint.x, textPoint.y);
		}
		
		return this;
	};
	
	Text.defineProperty = (function () {
		
		Sketch.defineProperty(Text, "baseline", {
			get: function () {
				// console.log('getting text.baseline');
				return $c.context.textBaseline;
			},
			set: function (b) {
				// console.log('setting text.baseline');
				return $c.context.textBaseline = b;
			}
		});

		Sketch.defineProperty(Text, "align", {
			get: function () {
				// console.log('getting text.baseline');
				return $c.context.textAlign;
			},
			set: function (a) {
				// console.log('setting text.baseline');
				return $c.context.textAlign = a;
			}
		});
		
	})();
	
	this.text = Text;
	
	return Text;
	
})();