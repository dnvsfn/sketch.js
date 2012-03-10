/** 
* Font
* @class
* @param fontString Shorthand CSS font string
* 
* @example
* font('12px sans-serif');
* 
* console.log( Font.get() ); // 12px sans-serif
*/
var Font = (function () {
	
	function Font () {
		var args = arguments;
		
		// console.log(args);
		
		if (args.length === 1) {
			if (typeof args[0] === "string") {
				// $c.context.font = args[0];
				Font.set( args[0] );
			}
		}
		
		// Font.parse($c.context.font);
		
		return Font.get();
	};
	
	var font_property_list = {
		style: "normal",
		variant: "normal",
		weight: "normal",
		size: "12px",
		lineheight: "normal",
		family: "sans-serif"
	};
	
	Font.properties = {};
	Font.str = null;
	
	Font.get = function () {
		var f = [];
		
		for (var prop in Font.properties) {
			var p = Font.properties[prop];
			
			if (typeof p !== "undefined" && p != 'normal') {
				f.push(p);
			}
		}
		
		return f.join(' ');
	};
	
	Font.set = function (fontString) {
		// console.log('Font.set()');
		
		this.parse(fontString);
		this.str = this.get();
		
		$c.context.font = this.str;
		
		// console.log('str = ' + this.str);
		
		return this.str;
	};
	
	/**
	* Font.style
	* @public
	* @param {String} styleString Desired font style (italic, oblique)
	* @returns Font style
	* @type String
	* 
	* @example
	* font("bold 12px sans-serif");
	* 
	* font.style = "italic";
	* 
	* console.log( Font.style ); // italic
	* 
	* console.log( Font.get() ); // italic bold 12px sans-serif
	*/
	Font.style = function () {};
	
	Font.toString = function () {
		return Font.get();
	};
	
	Font.getProperties = function () {
		return Font.properties;
	};
	
	Font.parse = function (fontString) {
		// console.log('Font.parse()');
		
		// http://goo.gl/PWOi2
		
		var family,
			size,
			style = "normal",
			weight = "normal",
			variant = "normal",
			lineheight = "normal";

		var tokens = fontString.split(/\s+/);
		
		outer: while (token = tokens.shift()) {
			
			switch (token)
			{
				case "normal":
					break;

				case "italic":
				case "oblique":
					style = token;
					break;

				case "small-caps":
					variant = token;
					break;

				case "bold":
				case "bolder":
				case "lighter":
				case "100":
				case "200":
				case "300":
				case "400":
				case "500":
				case "600":
				case "700":
				case "800":
				case "900":
					weight = token;
					break;

				default:
					if (!size) {
						var size_tokens = token.split("/");
						size = size_tokens[0];
						
						if (size_tokens.length > 1) {
							lineheight = size_tokens[1];
						}
						break;
					}

					family = token;
					if (tokens.length) {
						family += " " + tokens.join(" ");
					}
					
					break outer;
				}
			}
		
		if (typeof style !== "undefined") {
			Font.properties.style = style;
		}
		if (typeof variant !== "undefined") {
			Font.properties.variant = variant;
		}
		if (typeof weight !== "undefined") {
			Font.properties.weight = weight;
		}
		if (typeof size !== "undefined") {
			Font.properties.size = size;
		}
		if (typeof lineheight !== "undefined") {
			Font.properties.lineheight  = lineheight;
		}
		if (typeof family !== "undefined") {
			Font.properties.family = family;
		}
		
	};
	
	Font.defineProperty = (function () {
		
		/*
		* this doesn't work, pulls last item from last for "prop"
		* 
		
		for (var prop in font_property_list) {
			Sketch.defineProperty(Font, prop, {
				get: function () {
					return Font.properties[prop];
				},
				set: function (value) {
					Font.properties[prop] = value;
					return $c.context.font = Font.get();
				}
			});
			Font.properties[prop] = font_property_list[prop];
		}
		*/
		
		/*
		* do it ghetto for the time being
		*/
		
		Sketch.defineProperty(Font, "style", {
			get: function () { return Font.properties.style },
			set: function (val) { 
				Font.properties.style = val; 
				return $c.context.font = Font.get(); 
			}
		});
		
		Sketch.defineProperty(Font, "variant", {
			get: function () { return Font.properties.variant; },
			set: function (val) { 
				Font.properties.variant = val; 
				return $c.context.font = Font.get(); 
			}
		});
		
		Sketch.defineProperty(Font, "weight", {
			get: function () { return Font.properties.weight },
			set: function (val) { 
				Font.properties.weight = val; 
				return $c.context.font = Font.get(); 
			}
		});
		
		Sketch.defineProperty(Font, "size", {
			get: function () { return Font.properties.size; },
			set: function (val) { 
				if (typeof val === "number") {
					val += 'px';
				}
				
				Font.properties.size = val; 
				return $c.context.font = Font.get(); 
			}
		});
		
		Sketch.defineProperty(Font, "lineheight", {
			get: function () { return Font.properties.lineheight; },
			set: function (val) { 
				Font.properties.lineheight = val; 
				return $c.context.font = Font.get(); 
			}
		});
		
		Sketch.defineProperty(Font, "family", {
			get: function () { return Font.properties.family; },
			set: function (val) { 
				Font.properties.family = val; 
				return $c.context.font = Font.get(); 
			}
		});
		
		for (var prop in font_property_list) {
			var val = font_property_list[prop];
			Font.properties[prop] = val;
		};
		
	})();
	
	/**
	* Assign font() as global shortcut of Font()
	*/
	this.font = Font;
	
	return Font;
	
})();