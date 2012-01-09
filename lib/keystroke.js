(function () {
	
	this.Keystroke = function () {};
	
	Keystroke.events = [];
	Keystroke.buffer = [];
	
	Keystroke.keys = {
		32: 'space',
		13: 'enter',
		9: 'tab',
		8: 'backspace',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		20: 'caps',
		144: 'numlock',
		145: 'scrolllock',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		33: 'pageup',
		34: 'pagedown',
		36: 'home',
		35: 'end',
		45: 'insert',
		46: 'delete',
		27: 'escape',
		19: 'pause',
		222: "'"
	};
	
	Keystroke.addKeyEventTarget = function (type, target, handler) {
		var args = arguments;
		
		if (typeof type !== "undefined" && typeof target !== "undefined" && typeof handler !== "undefined") {
			var evt = new KeyEventTarget(type, target, handler);
			evt.save();
		}
		
	};
	
	Keystroke.isModifier = function (code) {
		var key;
		
		if (code == 16) {
			key = 'shift';
		} else if (code == 17) {
			key = 'ctrl';
		} else if (code == 18) {
			key = 'alt';
		}
		
		if (code == 'ctrl') {
			key = true;
		} else if (code == 'alt') {
			key = true;
		} else if (code == 'shift'){
			key = true;
		}
		
		if (typeof key !== "undefined") {
			return key;
		} else {
			return false;
		}
		
	}
	
	Keystroke.getChar = function (code, is_shift) {
		var keyChar,
			is_modifier = Keystroke.isModifier(code);
		
		if (typeof Keystroke.keys[code] !== "undefined") {
			keyChar = Keystroke.keys[code];
		} else if (is_modifier) {
			keyChar = is_modifier;
		} else if (!is_shift) {
			keyChar = (String.fromCharCode(code)).toLowerCase();
		} else {
			keyChar = String.fromCharCode(code);
		}
		
		return keyChar;
	};
	
	Keystroke.onKeyEvent = function (event) {
		
		var type = event.type,
			keyCode = event.keyCode,
			keyChar = Keystroke.getChar(keyCode, event.shiftKey);
		
		for (var i=0; e = Keystroke.events[i], i < Keystroke.events.length; i++) {
			e.check(event);
		};
		
	};
	
	(function () {
		var keytypes = ['keydown', 'keypress', 'keyup'];
		for (var i=0; i < keytypes.length; ++i) {
			var type = keytypes[i];
			Sketch.addEvent(document, type, Keystroke.onKeyEvent);
		}
	})();
	
	this.KeyEvent = function (event, handler) {
		
		this.type = event.type;
		this.event = event;
		this.code = event.keyCode;
		this.key = Keystroke.getChar(event.keyCode, event.shiftKey);
		this.handler = handler;
		
		if (typeof this.handler === "function") {
			this.handler();
		}
	};
	
	KeyEvent.prototype.toString = function () {
		return '{ type: ' + this.type + ', code: ' + this.code + ', key: ' + this.key + ', handler: ' + (typeof this.handler ) + ' }';
	};
	
	this.KeyEventTarget = function (type, target, handler) {
		
		this.type = type;
		this.target = target;
		this.handler = handler;
		
		this.shift = false;
		this.alt = false;
		this.ctrl = false;
		
		// parse target string
		if (typeof target === "string") {
			
			var _target = this.target.split('+');
			
			if (_target.length > 1) {

				for (var i=0; k = _target[i], i < _target.length; i++) {
					var is_mod = Keystroke.isModifier(k);
					
					if (is_mod) {
						this[k] = true;
					} else {
						this.targetKey = k;
					}
				}

			} else {
				this.targetKey = _target[0];
			}
		}
		
		return this;
	};
	
	KeyEventTarget.prototype.save = function () {
		Keystroke.events.push(this);
	};
	
	KeyEventTarget.prototype.check = function (event) {
		var fire = false;
		
		if (event.type == this.type) {
		
			if (this.target == false) {
				fire = true;
		
			} else if (this.shift == event.shiftKey && this.alt == event.altKey && this.ctrl == event.ctrlKey ) {
			
				if (Keystroke.getChar(event.keyCode, event.shiftKey) == this.targetKey) {
					fire = true;
				}
			
			}
		
			if (fire) {
				// Keystroke.fireKeyEventTarget(event, this.handler);
				var keyEvent = new KeyEvent(event, this.handler);
			}
		
		}
	};
	
	
	
})();