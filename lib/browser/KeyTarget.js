(function () {
	
	/**
	* KeyTarget
	* @class
	* @requires Keystroke KeyEvent
	*/
	this.KeyTarget = function (type, target, handler) {
		
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
	
	KeyTarget.prototype.save = function () {
		Keystroke.events.push(this);
	};
	
	KeyTarget.prototype.check = function (event) {
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