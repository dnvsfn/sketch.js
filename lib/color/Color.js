var Color = (function () {
	
	// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	// http://www.phpied.com/files/rgbcolor/rgbcolor.js
	var COLOR_NAMES = {
	    aliceblue: 'f0f8ff',
      antiquewhite: 'faebd7',
      aqua: '00ffff',
      aquamarine: '7fffd4',
      azure: 'f0ffff',
      beige: 'f5f5dc',
      bisque: 'ffe4c4',
      black: '000000',
      blanchedalmond: 'ffebcd',
      blue: '0000ff',
      blueviolet: '8a2be2',
      brown: 'a52a2a',
      burlywood: 'deb887',
      cadetblue: '5f9ea0',
      chartreuse: '7fff00',
      chocolate: 'd2691e',
      coral: 'ff7f50',
      cornflowerblue: '6495ed',
      cornsilk: 'fff8dc',
      crimson: 'dc143c',
      cyan: '00ffff',
      darkblue: '00008b',
      darkcyan: '008b8b',
      darkgoldenrod: 'b8860b',
      darkgray: 'a9a9a9',
      darkgreen: '006400',
      darkkhaki: 'bdb76b',
      darkmagenta: '8b008b',
      darkolivegreen: '556b2f',
      darkorange: 'ff8c00',
      darkorchid: '9932cc',
      darkred: '8b0000',
      darksalmon: 'e9967a',
      darkseagreen: '8fbc8f',
      darkslateblue: '483d8b',
      darkslategray: '2f4f4f',
      darkturquoise: '00ced1',
      darkviolet: '9400d3',
      deeppink: 'ff1493',
      deepskyblue: '00bfff',
      dimgray: '696969',
      dodgerblue: '1e90ff',
      feldspar: 'd19275',
      firebrick: 'b22222',
      floralwhite: 'fffaf0',
      forestgreen: '228b22',
      fuchsia: 'ff00ff',
      gainsboro: 'dcdcdc',
      ghostwhite: 'f8f8ff',
      gold: 'ffd700',
      goldenrod: 'daa520',
      gray: '808080',
      green: '008000',
      greenyellow: 'adff2f',
      honeydew: 'f0fff0',
      hotpink: 'ff69b4',
      indianred : 'cd5c5c',
      indigo : '4b0082',
      ivory: 'fffff0',
      khaki: 'f0e68c',
      lavender: 'e6e6fa',
      lavenderblush: 'fff0f5',
      lawngreen: '7cfc00',
      lemonchiffon: 'fffacd',
      lightblue: 'add8e6',
      lightcoral: 'f08080',
      lightcyan: 'e0ffff',
      lightgoldenrodyellow: 'fafad2',
      lightgrey: 'd3d3d3',
      lightgreen: '90ee90',
      lightpink: 'ffb6c1',
      lightsalmon: 'ffa07a',
      lightseagreen: '20b2aa',
      lightskyblue: '87cefa',
      lightslateblue: '8470ff',
      lightslategray: '778899',
      lightsteelblue: 'b0c4de',
      lightyellow: 'ffffe0',
      lime: '00ff00',
      limegreen: '32cd32',
      linen: 'faf0e6',
      magenta: 'ff00ff',
      maroon: '800000',
      mediumaquamarine: '66cdaa',
      mediumblue: '0000cd',
      mediumorchid: 'ba55d3',
      mediumpurple: '9370d8',
      mediumseagreen: '3cb371',
      mediumslateblue: '7b68ee',
      mediumspringgreen: '00fa9a',
      mediumturquoise: '48d1cc',
      mediumvioletred: 'c71585',
      midnightblue: '191970',
      mintcream: 'f5fffa',
      mistyrose: 'ffe4e1',
      moccasin: 'ffe4b5',
      navajowhite: 'ffdead',
      navy: '000080',
      oldlace: 'fdf5e6',
      olive: '808000',
      olivedrab: '6b8e23',
      orange: 'ffa500',
      orangered: 'ff4500',
      orchid: 'da70d6',
      palegoldenrod: 'eee8aa',
      palegreen: '98fb98',
      paleturquoise: 'afeeee',
      palevioletred: 'd87093',
      papayawhip: 'ffefd5',
      peachpuff: 'ffdab9',
      peru: 'cd853f',
      pink: 'ffc0cb',
      plum: 'dda0dd',
      powderblue: 'b0e0e6',
      purple: '800080',
      red: 'ff0000',
      rosybrown: 'bc8f8f',
      royalblue: '4169e1',
      saddlebrown: '8b4513',
      salmon: 'fa8072',
      sandybrown: 'f4a460',
      seagreen: '2e8b57',
      seashell: 'fff5ee',
      sienna: 'a0522d',
      silver: 'c0c0c0',
      skyblue: '87ceeb',
      slateblue: '6a5acd',
      slategray: '708090',
      snow: 'fffafa',
      springgreen: '00ff7f',
      steelblue: '4682b4',
      tan: 'd2b48c',
      teal: '008080',
      thistle: 'd8bfd8',
      tomato: 'ff6347',
      turquoise: '40e0d0',
      violet: 'ee82ee',
      violetred: 'd02090',
      wheat: 'f5deb3',
      white: 'ffffff',
      whitesmoke: 'f5f5f5',
      yellow: 'ffff00',
      yellowgreen: '9acd32'
	};
	
	/** @class */
	function Color () {
		var args = arguments;
		
		this.red = 0;
		this.green = 0;
		this.blue = 0;
		this.alpha = 1.0;
		
		if (args.length === 1) {
			if (typeof args[0] === 'object') {
				var c;
				c = args[0];
				for (var i=0; i < c.length; i++) {
					var prop = c[i];
					if (prop === ('red' || 'blue' || 'green' || 'alpha')) {
						
					}
				};
				
			} else if (typeof args[0] === 'string') {
				this.fromString(args[0]);
			} else if (typeof args[0] === 'number') {
				this.fromNumber(args[0]);
			}
			
		} else if (args.length === 2){
			if (typeof args[0] === 'number' && typeof args[1] === 'number') {
				this.fromNumber(args[0], args[1]);
			}
			
			if (typeof args[1] === 'number') {
				this.setAlpha(args[1]);
			}
			
		} else if (args.length === 3) {
			this.r = args[0];
			this.g = args[1];
			this.b = args[2];
			
		} else if (args.length === 4) {
			this.r = args[0];
			this.g = args[1];
			this.b = args[2];
			this.a = args[3];
		}
		
    // console.log( this.toString() );
		
		return this;
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
		
		var r = Math.round(map(Math.cos(($pad.frame * rw)/100),-1,1,0,255))
			g = Math.round(map(Math.cos(($pad.frame * gw)/100),-1,1,0,255))
			b = Math.round(map(Math.cos($pad.frame * bw/100),-1,1,0,255));
			
		return 'rgba(' + r + ',' + g + ',' + b + ',255)';
	};
	
	Color.random = function () {
	  var color;
	  color = new Color(
	    round(random(255)), 
	    round(random(255)),
	    round(random(255))
	  );
	  return color;
	};
	
	Color.toRgb = function (c) {
		c = '0x' + Color.toHex(c).substring(1);
		c = [ (c>> 16)&255, (c>> 8)&255, c&255 ];
		
		return {
			r: c[0],
			g: c[1],
			b: c[2],
			string: 'rgb(' + c.join(',') + ')'
		}
	}
	
	Color.toHex = function(c){
		var tem, i = 0, c = c ? c.toString().toLowerCase() : '';

		if ( /^#[a-f0-9]{3,6}$/.test(c) ) {
			
			if( c.length < 7 ){
				var A = c.split('');
				c = A[0]+A[1]+A[1]+A[2]+A[2]+A[3]+A[3];
			}
			return c;
		}
		
		if( /^[a-z]+$/.test(c) ) {
			return '#' + COLOR_NAMES[c] || '';
		}
		
		c = c.match(/\d+(\.\d+)?%?/g) || [];
		
		if ( c.length < 3 ) return '';

		c = c.slice(0, 3);
		
		while ( i < 3 ) {
			tem = c[i];
			if ( tem.indexOf('%') != -1 ) {
				tem = Math.round( parseFloat(tem) * 2.55 );
			} else {
				tem = parseInt(tem);
				if ( tem < 0 || tem > 255 ) {
					c.length = 0;
				} else { 
					c[i++] = (function () {
						var t = tem.toString(16);
						while (t.length < 2) {
							return "0" + t;
						}
						return t;
					})()
					
				}
			}
		}
		
		if ( c.length == 3 ) {
			return '#' + c.join('').toLowerCase();
		} 
		
		return '';
	}
	
	Color.prototype = {
		
		fromNumber: function (num, alpha) {
			var c = (function (num) {
				var n;
				if ( num < 100 && num > 0 ) {
					n = map(num, 0, 100, 0, 255);
				} else {
					n = num <= 0 ? 0 : 255;
				}
				return n;
			})(num);
			
			this.r = c;
			this.g = c;
			this.b = c;
			this.a = alpha || 1.0;
			
			return this;
		},
		
		fromString: function(str) {
			var c = Color.toRgb( str );
			
			this.r = c.r;
			this.g = c.g;
			this.b = c.b;
			
			return this;
		},
		
		setAlpha: function (a) {
			
			if ( a > 0 && a < 1.0 ) {
				this.alpha = a;
			} else {
				if ( a < 0 ) {
					this.alpha = 0;
				} else {
					this.alpha = 1.0;
				}
			}
			return this;
		},
		
		toString: function () {
			return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
		},
		
		update: function () {
			this.hex = Color.toHex(this.toString());
		}
		
	};
	
	for ( var c = ['red', 'green', 'blue', 'alpha'], i = 0; i < c.length; i++ ) {
		(function () {
			var name = c[i], prop = name.charAt(0);
			Sketch.defineProperty(Color.prototype, prop, {
				get: function () {
					return this[name];
				},
				set: function (value) {
					var val, max;
					max = name == 'alpha' ? 1.0 : 255;
					if (value < 0) {
						val = 0;
					} else if (value > max) {
						val = max;
					} else {
						val = value;
					}
					this[name] = val;
					this.update();
					// console.log('setting (' + name + ') ' + prop + ' = ' + val);
					return this[name];
				}
			});
		})();
	}
	
	return Color;
})();