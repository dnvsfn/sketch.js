var Canvas = (function () {
	
	function Canvas (canvasElement) {
		
		var self = self || this;
		
		var body = document.getElementsByTagName("body")[0];

		this.WIDTH = body.clientWidth;
		this.HEIGHT = body.clientHeight;
		
		this.canvas = typeof canvasElement === "object" ? canvasElement : document.getElementById(canvasElement);
		
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.size = new Size(this.WIDTH, this.HEIGHT);
		this.center = new Point(this.WIDTH/2, this.HEIGHT/2);
		
		this.context = this.canvas.getContext("2d");
		
		console.log('new canvas "' + canvasElement + '" - ' + this.WIDTH + ', ' + this.HEIGHT);
		
		this.mouse = new Point();
		
		this.frame = 0;
		this.clear_screen = true;
		
		this.strokeColor = 'black';
		this.fillColor = false;
		
		this.dragging = false;
		this.dragMethod = false;
		
		this.mouseDown(function(){});
		this.mouseUp(function(){});
		this.mouseMove(function(){});
		
		this.update = window.setInterval(function () { 
			self.draw(); 
		}, 1000 / 60);
		
		return this;
		
	};

	Canvas.prototype = {
		
		init: function (setupCallback, drawCallback) {
			// console.log('Canvas.prototype.init()');
			// console.log('setupCallback() ' + (typeof setupCallback) + ' | drawCallback() ' + (typeof drawCallback));
			
			if (typeof setupCallback !== "function") {
				// console.log('setup() not found.');
				setupCallback = false;
			}
			if (setupCallback) {
				setupCallback();
			}
			
			if (typeof drawCallback !== "function") {
				// console.log('draw() not found.');
				drawCallback = false;
			}
			if (drawCallback) {
				// console.log('has drawCallback.');
				this.drawScreen = drawCallback;
			} else {
				// console.log('no drawCallback.');
				this.drawScreen = false;
			}
		},
		
		draw: function () {
			// console.log(typeof this.drawScreen);
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
		clear: function () {
			this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
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
			Keystroke.addKeyEventTarget(type, key, handler);
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
	};
	
	return Canvas;
	
}());

// window.$c = new Canvas();