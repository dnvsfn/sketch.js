(function () {
	
	/**
	* Keystroke
	* @class
	* @requires KeyEvent KeyTarget
	*/
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
	
	Keystroke.addKeyTarget = function (type, target, handler) {
		var args = arguments;
		
		if (typeof type !== "undefined" && typeof target !== "undefined" && typeof handler !== "undefined") {
			var evt = new KeyTarget(type, target, handler);
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
	
})();