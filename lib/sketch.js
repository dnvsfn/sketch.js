/**
 * @namespace Sketch
 * @author me
 * @version $Rev$
 */
(function (window, undefined) {
	
	var Sketch, 
		INCLUDE_DIR, 
		MODULES, 
		loaded_modules;
	
	/** 
	* Initialize new sketch with main sketch method only
	* 
	* @example
	* // create a new sketch
	* Sketch.create( function () {
	* 
	*     // sketch code goes here
	* 
	* });
	*
	* // Assign new sketch to a variable
	* var mySketch = Sketch.create( function () {
	* 
	*     // sketch code goes here
	* 
	* });
	* console.log( mySketch ); // Sketch
	* 
	* // Initialize new sketch with domElementID and main method
	* var mySketch = Sketch.create("myCanvas" function () {
	* 
	*     // sketch code goes here
	* 
	* });
	*/
	function Sketch (sketchConfig) {
		
		if (this instanceof Sketch) {
			// console.log(arguments);
			
			// var self = self || this;
			
			// console.log(sketchConfig);
			
			this.initialize(sketchConfig);
			
		}
		
		return this;
	};
	
	Sketch.sketches = [];
	
	Sketch.defaults = {
		width: 400,
		height: 300
	};
	
	Sketch.getIncludePath = (function () {
		var scripts = document.getElementsByTagName('script'),
			path_elements;
		
		for (var i=0; i < scripts.length; i++) {
			var path = scripts[i].getAttribute('src');
			
			if ( path.match(/sketch\.js/) ) {
				path_elements = path.split('/');
				path_elements.pop();
				
				INCLUDE_DIR = path_elements.join('/') + '/';
			}
			
		};
		
	})();
	
	/** @constant **/
	MODULES = [
		// core components
		'core.Base',
		'core.Canvas',
		'core.Layer',
		'core.Pad',
		'core.SketchError',
		
		// primatives
		'basic.Point',
		'basic.Size',
		'basic.List',
		'basic.Group',
		
		// browser
		'browser.Keystroke',
		'browser.KeyEvent',
		'browser.KeyTarget',
		
		// color
		'color.Color',
		
		// path items
		'path.Line',
		'path.Path',
		
		// reusable things
		'things.Boid',
		'things.Particle',
		
		// tools
		'tools.Grid',
		'tools.helpers',
		
		// typeography
		'type.Font',
		'type.Text',
		'type.FillerText',
		
		// utilities
		'util.loop',
		'util.math'
	];
	
	loaded_modules = [];
	
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
			// Sketch.initialize();
			// console.log('modules loaded');
			Sketch.setupSketches();
		}
	};
	
	(function () {
		for (var i=0; i < MODULES.length; i++) {
			var s = MODULES[i],
				script = INCLUDE_DIR + s.replace('.', '/') + '.js';

			Sketch.include(s, script, function () {
				Sketch.addModule(this.id);
			});
		};
	})();
	
	
	Sketch.createMethod = false;
	// Sketch.setupMethod = false;
	// Sketch.drawMethod = false;
	
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
	
	/*
		This is just a wrapper for defineProperty since 
		additional browser support will be needed.
	*/
	Sketch.defineProperty = function (obj, propName, propObj) {
		
		if (Object.hasOwnProperty('defineProperty')) {
			Object.defineProperty(obj, propName, propObj);
		}
	
	};
	
	Sketch.create = function () {
		var args = arguments,
			sketchMainMethod,
			domElement,
			config = {},
			sketchConfig = {},
			add_container = false;
		
		// console.log('Sketch.create()');
		
		var i = args.length;
		outer: while (i--) {
			
			inner: switch(typeof args[i]) {
				
				case 'string':
					domElement = args[i];
					break inner;
				
				case 'object':
					config = args[i];
					break inner;
				
				case 'function':
					sketchMainMethod = args[i];
					break inner;
					
				default:
					break inner;
			}
		}
		
		/**
		* If no domElement target is provided
		* this figures out where the sketch gets inject in the DOM
		*/
		if (typeof domElement === 'undefined') {
			
			/**
			* Assuming the script is embedded in the page,
			* lets dig through the scripts to find the current
			* that's executing Sketch.create()
			*/
			var scripts = document.getElementsByTagName( 'script' ),
				embeddedScripts = [],
				scriptDOMElement;
			
			for (var i=0; i<scripts.length; i++) {
				var script = scripts[i];
				
				/**
				* We don't want any <script src=""> or other scripts in the <head>
				*/
				if (script.getAttribute('src') === null && script.parentNode.nodeName != 'HEAD') {
					embeddedScripts.push(script);
				}
			}
			
			if (embeddedScripts.length > 0) {
				/**
				* The current <script> should be the last loaded in the DOM
				*/
				this.scriptDOMElement = embeddedScripts[ embeddedScripts.length - 1 ];
				
				// if (typeof scriptDOMElement.nextSibling == null) {
				// 	scriptDOMElement.parentNode.appendChild(sketchPadContainer);
				// } else {
				// 	scriptDOMElement.parentNode.insertBefore(sketchPadContainer, scriptDOMElement.nextSibling);
				// }
				
			}
			
			add_container = true;
			
			sketchConfig.element = this.id;
		
		} else {
			
			var targetElement = document.getElementById(sketchConfig.element);
			
			// console.log('var targetElement = document.getElementById(sketchConfig.element);');
			
			if (targetElement == null) {
				add_container = true;
			}
			
		}
		
		if (typeof config === 'undefined') {
			config = false;
		} else {
			for (var prop in config) {
				sketchConfig[prop] = config[prop];
			}
		}
		
		if (typeof sketchMainMethod === 'undefined') {
			sketchConfig.main = false;
		} else {
			sketchConfig.main = sketchMainMethod;
		}
		
		
		for (var prop in Sketch.defaults) {
			if (!sketchConfig.hasOwnProperty(prop)) {
				sketchConfig[prop] = Sketch.defaults[prop];
			}
		}
		
		Sketch.ready(function () {
		  var sketch = new Sketch(sketchConfig);

  		return sketch;
		});
	};
	
	Sketch.setupSketches = function () {
		
		for (var i=0; i < Sketch.sketches.length; i++) {
			var _sketch = Sketch.sketches[i];
			_sketch.setupSketch();
		}
		
	};
	
	Sketch.prototype = {
		
		setupSketch: function () {
			
			for (var i=0; i < this.on_setup.length; i++) {
				
				var setupMethod = this.on_setup[i];
				setupMethod.call(this);
				
			}
			
		},
		
		initialize: function (sketchConfig) {
			
			if (typeof sketchConfig === 'object') {
				
				this.pads = [];
				this.on_setup = [];
				this.config = sketchConfig;
				
				if (this.config.hasOwnProperty('main')) {
					this.mainFunction = sketchConfig.main;
				}
				
				if (this.config.hasOwnProperty('id')) {
					this.id = sketchConfig.id;
				} else {
					this.id = 'sketch' + (Sketch.sketches.length + 1);
				}
				
				if (!this.config.hasOwnProperty('element')) {
					sketchConfig.element = false;
				}
				
				if (this.config.hasOwnProperty('fullscreen')) {
					var body = document.getElementsByTagName('body')[0];
					
					this.config.width = body.clientWidth;
					this.config.height = body.clientHeight;
					
					body.style.overflow = 'hidden';
					
					// console.log('this.config: width = ' + this.config.width + ' | height = ' + this.config.height);
				}
				
				this.onModuleReady.call(this, function () {
					
					var pad = new Pad(this.config.element, this);
					
					this.addPad(pad, function() {
						
						Sketch.ready( function () {
							
							window.$pad = pad;
							
							pad.sketch.mainFunction();
						});
						
					});
					
					
				});
				
				Sketch.sketches.push(this);
				
			} else {
				throw "[SketchJS] Sketch.initialize(sketchConfig) sketchConfig required";
			}
			
		},
		
		onModuleReady: function (func) {
			this.on_setup.push(func);
		},
		
		addPad: function (padObject, callback) {
			
			if (padObject instanceof Pad) {
				this.pads.push(padObject);
				
				Sketch.activePad = padObject;
				
				if (typeof callback === 'function') {
					callback();
				}
				
			} else {
				throw '[SketchJS] Sketch.pad(padObject) must be Pad() instance';
			}
			
		},
		
		play: function () {
			console.log('Sketch.prototype.play();');
		},
		
		stop: function () {
			console.log('Sketch.prototype.stop()');
		}
		
	};
	
	/*
	* Until we can find a better place for this
	* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	*/
	window.requestFrame = (function(){
		return  window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	
	
	window.Sketch = window.$s = Sketch;
	
})(window);