var Layer = (function () {
	
	function Layer (layerName, padParent, layerMethod) {
		this.pad = padParent || Sketch.activePad;
		this.index = this.pad.layers.length;
		this.name = layerName || 'Layer ' + (this.index);
		
		this.clearOnFrame = true;
		this.layerMethod = layerMethod || false;
		
		if (typeof layerMethod === 'function') {
			this.layerMethod = layerMethod;
		}
		
		this.initialize();
	};
	
	Layer.register = function (layer, padParent, callback) {
		
		padParent.layers.push(layer);
		
		padParent.setActiveLayer(layer.index);
		
		if (typeof callback === 'function') {
			callback();
		}
		
	};
	
	Layer.prototype = {
		
		initialize: function () {
			
			this.createCanvasLayer();
			
			var self = self || this;
			
			Layer.register(self, self.pad, function () {
				if (typeof self.layerMethod === 'function') {
					self.layerMethod();
				}
				
			});
		},
		
		clear: function (value) {
			this.clearOnFrame = value;
		},
		
		draw: function () {
			
			// if (this.pad.frame < 10) {
			// console.log('frame ' + this.pad.frame + ': layer ' + this.name + '.draw() | clearOnFrame = ' + this.clearOnFrame + ' | layerMethod = ' + (typeof this.layerMethod === 'function' ? 'function' : this.layerMethod));
			// }
			
			if (this.clearOnFrame) {
        // console.log('clearscreen ' + this.name);
				this.canvas.clearScreen();
			}
			if (typeof this.layerMethod === 'function') {
				this.layerMethod();
			}
			
		},
		
		createCanvasLayer: function () {
			
			var canvasDOMElement = document.createElement('canvas');
			canvasDOMElement.id = this.pad.id + '-layer' + (this.name ? '-' + this.name : this.pad.layers.length + 1)
			canvasDOMElement.style.display = 'block';
			canvasDOMElement.style.width = this.pad.width;
			canvasDOMElement.style.width = this.pad.height;
			canvasDOMElement.style.position = 'absolute';
			canvasDOMElement.style.top = 0;
			canvasDOMElement.style.left = 0;
			canvasDOMElement.style.zIndex = this.zindex;
			
			this.canvasDOMElement = canvasDOMElement;
			
			var canvas = new Canvas(canvasDOMElement, this);
			
			var containerDOM = document.getElementById(this.pad.element);
			
			containerDOM.appendChild(canvasDOMElement);
			
			var self = self || this;
			
      // if (this.name == 'interface') {
      // 
      //  canvas.canvas.onmousemove = function ( event ) {
      //    var point = new Point(
      //      event.pageX - this.offsetLeft,
      //      event.pageY - this.offsetTop
      //    );
      //    self.pad.mouse = point;
      //  };
      // }
			
			this.canvas = canvas;
			
		},
		
		setZIndex: function (index) {
			var zindex;
			
			if (this.name == 'interface') {
				zindex = this.pad.layers.length;
			} else {
				zindex = index;
			}
			this.zindex = zindex;
			this.canvasDOMElement.style.zIndex = this.zindex;
			
		},
		
		
	};
	
	this.layer = function (layerName, layerMethod) {
		
		if (typeof layerName === 'string' && typeof layerMethod === 'function') {
			Sketch.activePad.addLayer(layerName, layerMethod);
		} else {
			throw "[SketchJS] layer(layerName, layerMethod) requires layerName (string) and layerMethod (function)";
		}
		
	};
	
	return Layer;
	
})();