(function () {
	
	/**
	* KeyEvent
	* @class
	* @requires Keystroke
	*/
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
	
})();