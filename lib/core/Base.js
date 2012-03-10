(function () {
	
	// http://ejohn.org/blog/simple-javascript-inheritance/
	
	/** @class */
	this.Base = function(){};
	
	var initializing = false, 
		fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	Base.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" && 
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn){
				return function() {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
			  };
			  })(name, prop[name]) :
			  prop[name];
		}

		function Base() {
			if ( !initializing && this.init )
				this.init.apply(this, arguments);
		}
		Base.prototype = prototype;
		Base.prototype.constructor = Sketch;
		Base.extend = arguments.callee;

		return Base;
	};
	
})();