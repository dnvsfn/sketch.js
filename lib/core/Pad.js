/**
* Pad
* @class
* @ description Creates a new Pad() instance
* 
* @example
* var myPad = new Pad('elementDOM', SketchInstance);
*/
var Pad = (function () {
  
  function Pad (HTMLElement, sketchParent) {
    this.sketch = sketchParent;
    this.element = HTMLElement;
    
    this.layers = [];
    this.layer = false; // active layer
    this.activeLayer = false;
    this.playOnFrame = false;
    this.id = this.sketch.id + '-pad' + (this.sketch.pads.length+1);
    
    this.width = sketchParent.config.width;
    this.height = sketchParent.config.height;
    this.bounds = new Size(new Point(), new Point(this.width, this.height));
    this.center = new Point(this.width/2, this.height/2);
    this.mouse = new Point();
    this.dragging = false;

    this.onFrameMethod = false;
    this.stopMethod = false;
    this.dragMethod = false;
    
    var self = self || this;
    
    if (!this.element) {
      Pad.injectContainerDOM(false, this, function () {
        Pad.initializeDefaultLayers(self, function () {
          Pad.initializeFrameRequest(self);
        });
      });
    } else {
      Pad.initializeDefaultLayers(self, function () {
        Pad.initializeFrameRequest(self);
      });
    }
    
    this.fps = 0;
    this.frame = 0;
    
    // console.log(this);
    
    return this;
  };
  
  Pad.initializeDefaultLayers = function (padObject, callback) {
    
    if (padObject instanceof Pad) {
      
      var interfacerLayerMethod = function () {
        
        if (padObject.playOnFrame) {
        
          fill('rgba(0,0,0,0.6)');
          stroke(false);
          rectangle(new Point(0, padObject.height - 20), new Size(160, 20));
        
          fill('white');
          text.align = 'left';
          font.size = 12;
          text('fps ' + padObject.fps, new Point(4, padObject.height - 6));
        
        }
        
      };
      
      var interfaceLayer = new Layer('interface', padObject, interfacerLayerMethod);
      var defaultLayer = new Layer('default', padObject);
      
      padObject.interfaceLayer = interfaceLayer;
      padObject.defaultLayer = defaultLayer;
      
      padObject.interfaceLayer.canvas.canvas.onmousemove = function ( event ) {
        
        var point = new Point(
          event.pageX - this.offsetLeft,
          event.pageY - this.offsetTop
        );
        
        $pad.mouse = point;
        
        if ( typeof padObject.mouseMoveMethod === 'function' ) {
          padObject.mouseMoveMethod.call(padObject);
        }
        if ( typeof padObject.dragMethod === 'function' && $pad.dragging ) {
          padObject.dragMethod.call(padObject);
        }
      };
      
      padObject.interfaceLayer.canvas.canvas.onmousedown = function ( event ) {
        padObject.dragging = true;

        if ( typeof padObject.mouseDownMethod === 'function' ) {
          padObject.mouseDownMethod.call(padObject);
        }
      };

      padObject.interfaceLayer.canvas.canvas.onmouseup = function ( event ) {
        padObject.dragging = false;
        
        if ( typeof padObject.mouseUpMethod === 'function' ) {
          padObject.mouseUpMethod.call(padObject);
        }
      };

      if (typeof callback === 'function') {
        callback();
      }
      
    } else {
      throw "[SketchJS] Pad.initializeDefaultLayers(padObject, callback) padObject must be instance of Pad()";
    }
    
  };
  
  Pad.initializeFrameRequest = function (padObject) {
    
    var now,
      last_update = (new Date)*1 - 1,
      fps_filter = 50;
    
    (function update () {
      
      if (padObject.playOnFrame) {
      
        var fpsframe = 1000 / ((now = new Date) - last_update);
      
        padObject.fps += (fpsframe - padObject.fps) / fps_filter;
        last_update = now;
      
        for (var i=0; i < padObject.layers.length; i++) {
          var layer = padObject.layers[i];
        
          padObject.activeLayer = layer;
          window.$c = padObject.activeLayer.canvas;
        
          layer.draw();
        }
        padObject.frame++;
        
      }
      
      requestFrame(update);
    })();
    
  };
  
  Pad.injectContainerDOM = function (targetElement, padInstance, callback) {
    
    // make a empty <div> to use as a pad container
    var sketchPadContainer = document.createElement('sketch');
    
    // give it the same name as the sketch
    sketchPadContainer.id = 'sketch-container-' + (Sketch.sketches.length + 1);
    sketchPadContainer.style.width = padInstance.width + 'px';
    sketchPadContainer.style.height = padInstance.height + 'px';
    sketchPadContainer.style.display = 'block';
    sketchPadContainer.style.position = 'relative';
    
    if (!padInstance.sketch.config.hasOwnProperty('fullscreen')) {
      sketchPadContainer.style.backgroundColor = '#222';
      sketchPadContainer.style.border = '1px solid #ccc';
    }
    
    padInstance.element = sketchPadContainer.id;
       
    appendToElement = document.getElementsByTagName('body')[0];
    
    
    Sketch.ready(function () {
      appendToElement.appendChild(sketchPadContainer);
      
      if (typeof callback === 'function') {
        callback(this);
      }
    });
    
  };
  
  Pad.prototype = {
    
    addLayer: function (layerName, layerMethod) {
      var layerID, layer, index;
      
      if (typeof layerName === 'string') {
        layerID = layerName;
      } else if (this.layers.length === 0){
        layerID = "default";
      } else {
        layerID = "Layer " + this.layers.length;
      }
      
      if (layerMethod === 'undefined') {
        layerMethod = false;
      }
        
      layer = new Layer( layerID, this, layerMethod );
      
      index = this.layers.length - 1;
      this.setActiveLayer(index);
      
    },
    
    clear: function (value) {
      this.activeLayer.clear(value);
      return value;
    },
   
    mouseDrag: function ( onDrag ) {
      if ( typeof onDrag === 'function' ) {
        this.dragMethod = onDrag;
      }
    },

    mouseDown: function ( onDown ) {
      if ( typeof onDown === 'function' ) {
        this.mouseDownMethod = onDown;
      }
    },

    mouseMove: function ( onMove ) {
      if ( typeof onMove === 'function' ) {
        this.mouseMoveMethod = onMove;
      }
    },

    mouseUp: function ( onUp ) {
      if ( typeof onUp === 'function' ) {
        this.mouseUpMethod = onUp;
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
    },

    pause: function () {
      this.playOnFrame = false;
    },
    
    play: function (playMethod) {
      
      this.playOnFrame = true;
      
      if (typeof playMethod === 'function') {
        this.onFrameMethod = playMethod;
        
        var i = this.layers.length;
        while (i--) {
         var layer = this.layers[i];
         if (layer.name == 'default') {
           layer.layerMethod = playMethod;
         }
        }
        
        this.defaultLayer.layerMethod = playMethod;
      }
      
    },
    
    stop: function (stopMethod) {
      
      if (typeof stopMethod === 'function') {
        this.stopMethod = stopMethod;
      }
      
    },
    
    setActiveLayer: function (index) {
      this.activeLayerIndex = index;
      this.activeLayer = this.layers[index];
      
      for (var i=0; i < this.layers.length; i++) {
        var layer = this.layers[i];
        layer.setZIndex(i);
      }
      
      window.$c = this.activeLayer.canvas;
      
    },
    
    setLayerIndex: function () {
      
    }
    
  };
  
    return Pad;
  
})();
