/** @class */
var Canvas = (function () {
	
	/** @constructor */
	function Canvas (canvasElement, layerObject) {
		
		var self = self || this;
		
		var body = document.getElementsByTagName("body")[0];

		// this.WIDTH = body.clientWidth;
		// this.HEIGHT = body.clientHeight;
		
		this.layer = layerObject;
		this.pad = layerObject.pad;
		
		// console.log(this.pad);
		
		this.WIDTH  = this.pad.width;
		this.HEIGHT = this.pad.height;
		
		this.canvas = typeof canvasElement === "object" ? canvasElement : document.getElementById(canvasElement);
		
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.size = new Size(this.WIDTH, this.HEIGHT);
		// this.center = new Point(this.WIDTH/2, this.HEIGHT/2);
		
		this.context = this.canvas.getContext("2d");
		
		// console.log('new canvas "' + canvasElement + '" - ' + this.WIDTH + ', ' + this.HEIGHT);
		
		// this.mouse = new Point();
		
		// this.frame = 0;
		// this.clear_screen = true;
		
		this.strokeColor = 'black';
		this.fillColor = false;
		
		/*
		this.dragging = false;
		this.dragMethod = false;
		
		this.mouseDown(function(){});
		this.mouseUp(function(){});
		this.mouseMove(function(){});
		*/
		
		/*
		var fps = 0, now, lastUpdate = (new Date)*1 - 1;

		// The higher this value, the less the FPS will be affected by quick changes
		// Setting this to 1 will show you the FPS of the last sampled frame only
		var fpsFilter = 50;

		function drawFrame(){
		  // ... draw the frame ...

		  var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
		  fps += (thisFrameFPS - fps) / fpsFilter;
		  lastUpdate = now;

		  setTimeout( drawFrame, 1 );
		}

		var fpsOut = document.getElementById('fps');
		setInterval(function(){
		  fpsOut.innerHTML = fps.toFixed(1) + "fps";
		}, 1000);
		
		*/
		
		/*
		this.fps = 0;
		
		var now,
			last_update = (new Date)*1 - 1,
			fps_filter = 50;
		
		(function update () {
			var fpsframe = 1000 / ((now = new Date) - last_update);
			
			self.fps += (fpsframe - self.fps) / fps_filter;
			last_update = now;
			
			// console.log(self.fps);
			
			// document.getElementById('fps').innerHTML = 'fps ' + Math.round(self.fps);
			
			self.draw();
			requestFrame(update, this.canvas);
		})();
		*/
		
		return this;
		
	};

	Canvas.prototype = {
		
		initialize: function () {
			
		},
		clearScreen: function () {
			// console.log('clear()');
			
			// if (this.pad.frame < 10) {
			// 	console.log(this.layer.name);
			// 	console.log(this.context);
			// 	console.log(this.WIDTH);
			// 	console.log(this.HEIGHT);
			// }
			
			// if (this.pad.frame < 10) {
			// 	console.log('frame ' + this.pad.frame + ': clearing canvas ' + this.layer.name);
			// }
			
			this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		
		}
		
		/*
		draw: function () {
			
			if (typeof this.drawScreen === "function") {
				if (this.clear_screen) {
					this.clear();
				}
			
					this.drawScreen();
			
				this.frame++;
			}
		},
		
		play: function () {
		
			if (typeof arguments[0] === 'function') {
				this.drawScreen = arguments[0];
			}
		},
		
		mouseDown: function () {
			var a = arguments,
				fn;
			
			if (a.length === 1) {
				if (typeof a[0] === "function") {
					fn = a[0];
					
					var self_ = self_ || this;
					
					this.canvas.onmousedown = function () {
						self_.dragging = true;
						fn();
					};
				}
			}
		},
		
		mouseUp: function () {
			var a = arguments,
				fn;
			
			if (a.length === 1) {
				if (typeof a[0] === "function") {
					fn = a[0];
					
					var self_ = self_ || this;
					
					this.canvas.onmouseup = function () {
						self_.dragging = false;
						fn();
					};
				}
			}
		},
		
		mouseMove: function () {
			var a = arguments,
				fn;
			
			if (a.length === 1) {
				if (typeof a[0] === "function") {
					fn = a[0];
					
					var self_ = self_ || this;
					
					this.canvas.onmousemove = function (event) {
						self_.mouse = new Point(
							event.pageX - this.offsetLeft,
							event.pageY - this.offsetTop
						);
						
						fn();
						
						if (self_.dragging && typeof self_.dragMethod === "function") {
							// console.log('is draggin');
							self_.dragMethod();
						}
					};
				}
			}
		},
		
		mouseDrag: function () {
			var a = arguments;
			
			if (a.length === 1) {
				if (typeof a[0] === "function") {
					this.dragMethod = a[0];
				} else {
					this.dragMethod = false;
				}
			}
		},
		
		addKeyMethod: function () {
			var args = arguments,
				type = args[0],
				a = args[1],
				key,
				handler;
			
			if (a.length === 1) {
				handler = a[0];
				key = false;
				
				if (typeof handler !== "function") {
					handler = false;
				}
				
			} else if (a.length === 2) {
				key = a[0];
				handler = a[1];

				if (typeof key !== "string") {
					key = false;
				}
				if (typeof handler !== "function") {
					handler = false;
				}
			}
			Keystroke.addKeyTarget(type, key, handler);
		},
		keypress: function () {
			this.addKeyMethod('keypress', arguments);
		},
		keydown: function () {
			this.addKeyMethod('keydown', arguments);
		},
		keyup: function () {
			this.addKeyMethod('keyup', arguments);
		}
		*/
	};
	
	return Canvas;
	
})();