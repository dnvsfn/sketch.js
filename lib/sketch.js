(function (window, undefined) {
	
	var Sketch, 
		INCLUDE_DIR, 
		MODULES, 
		loaded_modules;
	
	Sketch = function(){};
	
	INCLUDE_DIR = '';
	
	MODULES = [
		'base',
		'canvas',
		'point',
		'line',
		'size',
		'helpers',
		'font',
		'color',
		'particle',
		'grid',
		'keystroke'
	];
	
	loaded_modules = [];
	
	Sketch.createMethod = false;
	Sketch.setupMethod = false;
	Sketch.drawMethod = false;
	
	/*
		http://ejohn.org/projects/flexible-javascript-events/
	*/
	Sketch.addEvent = function ( obj, type, fn ) {
		if ( obj.attachEvent ) {
			obj['e'+type+fn] = fn;
			obj[type+fn] = function(){
				obj['e'+type+fn]( window.event );
			};
	    	obj.attachEvent( 'on'+type, obj[type+fn] );
	  	} else {
			obj.addEventListener( type, fn, false );
		}
	};
	Sketch.removeEvent = function ( obj, type, fn ) {
		if ( obj.detachEvent ) {
			obj.detachEvent( 'on'+type, obj[type+fn] );
			obj[type+fn] = null;
		} else {
			obj.removeEventListener( type, fn, false );
		}
	};
	
	/*
		http://goo.gl/QuLSN
	*/
	Sketch.ready = ( function () {
		function ready( f ) {
			if( ready.done ) {
				return f();
			}
			if( ready.timer ) {
				ready.ready.push(f);
			} else {
				Sketch.addEvent( window, "load", isDOMReady );
				ready.ready = [ f ];
				ready.timer = setInterval(isDOMReady, 13);
			}
		};

		function isDOMReady() {
			if( ready.done ) {
				return false;
			}
			if( document && document.getElementsByTagName && document.getElementById && document.body ) {
				clearInterval( ready.timer );
				ready.timer = null;
				for( var i = 0; i < ready.ready.length; i++ ) {
					ready.ready[i]();
				}
				ready.ready = null;
				ready.done = true;
			}
		};

	  return ready;
	})();
	
	Sketch.create = function (callback) {
		this.createMethod = callback;
	};
	
	Sketch.initialize = function () {
		Sketch.initializeDefaultCanvas(function () {
			if ( typeof Sketch.createMethod === "function" ) {
				Sketch.createMethod();
			}
		});
	};
	
	Sketch.run = function () {
		for (var i=0; i < arguments.length; i++) {
			var func = arguments[i];
			
			// console.log('func.name ' + func.name);
			
			if (func.name == "setup") {
				// console.log('Sketch.run() has setup()');
				Sketch.setupMethod = func;
			}
			if (func.name == 'draw') {
				// console.log('Sketch.run() has draw()');
				Sketch.drawMethod = func;
			}
		};
		$c.init(Sketch.setupMethod, Sketch.drawMethod);
	};
	
	Sketch.initializeDefaultCanvas = function (callback) {
		// console.log('Sketch.initializeDefaultCanvas()');
		var canvasElement = document.getElementsByTagName('canvas');
		var canvasTarget = canvasElement[0];
		var canvas = new Canvas(canvasTarget);
		
		window.$c = canvas;
		
		$c.init(Sketch.setupMethod, Sketch.drawMethod);
		
		if (typeof callback !== "undefined") {
			callback();
		}
		
	};
	
	Sketch.include = function (id, script_src, callback) {
		var script = document.createElement('script');
		script.setAttribute('type','text/javascript');
		script.onload = callback;
		script.setAttribute("src", script_src);
		script.id = id;
		if (typeof script !== "undefined") {
			document.getElementsByTagName("head")[0].appendChild(script)
		}
	};
	
	Sketch.addModule = function (mod) {
		loaded_modules.push(mod);
		// console.log('[' + mod + '] module loaded.');
		
		if (loaded_modules.length == MODULES.length) {
			Sketch.initialize();
		}
	};
	
	/*
		This is just a wrapper for defineProperty since 
		additional browser support will be needed.
	*/
	Sketch.defineProperty = function (obj, propName, propObj) {
		
		if (Object.hasOwnProperty('defineProperty')) {
			Object.defineProperty(obj, propName, propObj);
		}
	
	};
	
	(function () {
		for (var i=0; i < MODULES.length; i++) {
			var s = MODULES[i],
				script = INCLUDE_DIR + s + '.js';

			Sketch.include(s, script, function () {
				Sketch.addModule(this.id);
			});
		};
	})();
	
	window.Sketch = window.$s = Sketch;
	
})(window);