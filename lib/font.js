(function () {
	
	this.font = function () {
		var args = arguments;
		
		if (args.length === 1) {
			if (typeof args[0] === "string") {
				$c.context.font = args[0];
			}
		}
		
		font.parse($c.context.font);
		
		// return font.get();
		
		return {
			toString: function () {
				return font.get();
			}
		}
	};
	
	var font_property_list = {
		style: "normal",
		variant: "normal",
		weight: "normal",
		size: "12px",
		lineheight: "normal",
		family: "sans-serif"
	};
	
	font.properties = {};
	
	font.get = function () {
		var f = [];
		
		for (var prop in font.properties) {
			var p = font.properties[prop];
			
			if (typeof p !== "undefined" && p != 'normal') {
				f.push(p);
			}
		}
		
		return f.join(' ');
	};
	
	(function () {
		
		/*
		* this doesn't work, pulls last item from last for "prop"
		* 
		
		for (var prop in font_property_list) {
			Sketch.defineProperty(font, prop, {
				get: function () {
					return font.properties[prop];
				},
				set: function (value) {
					font.properties[prop] = value;
					return $c.context.font = font.get();
				}
			});
			font.properties[prop] = font_property_list[prop];
		}
		*/
		
		/*
		* do it ghetto for the time being
		*/
		
		Sketch.defineProperty(font, "style", {
			get: function () { return font.properties.style },
			set: function (val) { font.properties.style = val; return $c.context.font = font.get(); }
		});
		
		Sketch.defineProperty(font, "variant", {
			get: function () { return font.properties.variant; },
			set: function (val) { font.properties.variant = val; return $c.context.font = font.get(); }
		});
		
		Sketch.defineProperty(font, "weight", {
			get: function () { return font.properties.weight },
			set: function (val) { font.properties.weight = val; return $c.context.font = font.get(); }
		});
		
		Sketch.defineProperty(font, "size", {
			get: function () { return font.properties.size; },
			set: function (val) { font.properties.size = val; return $c.context.font = font.get(); }
		});
		
		Sketch.defineProperty(font, "lineheight", {
			get: function () { return font.properties.lineheight; },
			set: function (val) { font.properties.lineheight = val; return $c.context.font = font.get(); }
		});
		
		Sketch.defineProperty(font, "family", {
			get: function () { return font.properties.family; },
			set: function (val) { font.properties.family = val; return $c.context.font = font.get(); }
		});
		
		for (var prop in font_property_list) {
			var val = font_property_list[prop];
			font.properties[prop] = val;
		};
		
		// console.log(font.get());
		
	})();
	
	font.toString = function () {
		return font.get();
	};
	
	font.getProperties = function () {
		return font.properties;
	};
	
	font.parse = function (f) {
		
		// http://goo.gl/PWOi2
		
		var family = null,
			size = null,
			style = "normal",
			weight = "normal",
			variant = "normal",
			lineheight = "normal";

		var tokens = f.split(/\s+/);
		
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
						var t_ = token.split("/");
						size = t_[0];
						
						if (t_.length > 1) {
							lineheight = t_[1];
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
		
		font.properties.style = style;
		font.properties.variant = variant;
		font.properties.weight = weight;
		font.properties.size = size;
		font.properties.lineheight  = lineheight;
		font.properties.family = family;
		
	};
	
})();