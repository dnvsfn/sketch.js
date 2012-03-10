var Loop = (function () {
	
	function Loop () {
		var args = arguments,
			count,
			func;
		
		if (!(this instanceof Loop)) {
			if (args.length === 1) {
				return new Loop(args[0]);
			} else if (args.length === 2) {
				return new Loop(args[0], args[1]);
			}
		}
		
		this.index = 0;
		
		if (args.length === 1 ) {
			
			// make sure it's a integer
			if (isInt(args[0])) {
				count = args[0];
				func = false;
			} else {
				throw "[SketchJS] loop(count) requires count [Integer]";
			}
			
		} else if (args.length === 2) {
			
			if (isInt(args[0]) && typeof args[1] === 'function') {
				count = args[0];
				func = args[1];
			} else {
				throw "[SketchJS] loop(count, func) requires count [Interger] and func [Function]";
			}
			
		}
		
		if (typeof count === 'number' && typeof func !== 'undefined') {
			this.count = count;
			this._counter = this.count;
			
			if (typeof func === 'function') {
				this.onLoopFunction = func;
				this.each(func);
			}
		}
		
		return this;
		
	};
	
	Loop.cycle = function (index, cycleItems) {
		
	};
	
	Loop.prototype = {
		
		each: function (onEachMethod) {
			
			// this._onEach = typeof onEachMethod === 'function' ? onEachMethod : false ;
			
			var loop = this;
			
			while (this._counter--) {
				
				if (typeof onEachMethod === 'function') { 
					onEachMethod.call(this, this.index);
				}
				this.index++;
			}
			
			return this;
		},
		
		cycle: function () {
			
			var items = (function (_args) { 
				
				var args = [], 
					count = _args.length;

				while (count--) {
					args.push( _args[ (_args.length-1) - count ] );
				}
				return args;
			})(arguments);
			
			
			var index = this.index%items.length,
				currentItem = items[index];
			
			return currentItem;
		}
		
	};
	
	this.loop = Loop;
	
	return Loop;
	
})();