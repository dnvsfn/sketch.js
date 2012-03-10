/**
* List
* @class
* @description
* 
* @examples
* // add items to a list, one at a time
* var myList = new List();
* myList.add("item one");
* myList.add("item two");
* console.log( myList.toString() );
* // > [ "item one", "item two" ]
* 
* // loop through list items
* myList.each( function (item, index) {
*     console.log("myList[" + index + "] = " + item);
* });
* // > myList[0] = item one
* // > myList[1] = item two
* 
* // create new list from array
* var myItems = ["item one", "item two", "item three", "item four"];
* var myList2 = new List( myItems );
* console.log( myList2.toString() );
* // > [ "item one", "item two", "item three", "item four" ]
* 
* // remove a item specific index
* myList2.remove(0);
* console.log( myList2.toString() );
* // > [ "item two", "item three", "item four" ]	

* // add multiple items in one call with a function
* var myList3 = new List();
* myList3.add(3, function (item, index) {
*     return "item index = " + index;
* });
* console.log( myList3.toString() );
* // > [ "item index = 0", "item index = 1", "item index = 2" ]
* 
* // add multiple types of items to the same list
* var myList4 = new List();
* myList4.add(false);
* myList4.add(new Object());
* myList4.add("some random thing");
* console.log( myList4.toString() );
* // > [ false, object, "some random thing" ]
*/
var List = (function () {
	
	function List () {
		var args = arguments;
		
		if (!(this instanceof List)) {
			return new List(args[0]);
		}
		
		this.items = [];
		
		if (args.length === 1) {
			
			if ( isInt(args[0]) ) {
				this.items = new Array(args[0]);
				
			} else if ( Array.isArray(args[0]) ) {
				
				for (var i=0; i < args[0].length; i++) {
					this.add(args[0][i]);
				};
				
			}
			
		}
		
		return this;
		
	};
	
	List.prototype = {
		
		add: function () {
			var args = arguments,
				obj, 
				count, 
				callback;
			
			if (args.length === 1) {
				
				callback = args[0];
				
				if (typeof callback === 'function') {
				  obj = callback.call(this);
				}
				
				this.items.push(obj);
				this.length++;
				
			} else if (args.length === 2){
				
				count = args[0];
				callback = args[1];
				
				this.length = count;
				
				this.index = 0;
				while (count--) {
					if (typeof callback === "function") {
						obj = callback.call(this, this.index );
					}
					
					this.items.push(obj);
					this.index++;
				}
			}
			
			this._update();
			
			return this;
		},
		
		cycle: function () {
			
			var items = (function (_args) { 
				var args = [], 
					count = _args.length;
				
				if (count === 1) {
					if ( Array.isArray(_args[0]) ) {
						args = _args[0];
					}
					
				} else {
					while (count--) {
						args.push( _args[ (_args.length-1) - count ] );
					}
				}
				
				return args;
			})(arguments);
			
			
			var index = this.index%items.length,
				currentItem = items[index];
			
			return currentItem;
		},
		
		each: function(func) {
			var total = this.items.length, index;
			while (total--) {
				index = (this.items.length - 1) - total;
				item = this.items[index];
				if (func) {
					func(item, index);
				}
			}
			
			this._update();
			
			return this;
		},
		
		run: function (args) {
			var total = this.items.length, index;
			while (total--) {
				index = (this.items.length - 1) - total;
				item = this.items[index];
        if ( typeof item !== 'undefined' && typeof item.run === 'function' ) {
				  item.run(args);
        }
			}
			
			this._update();
			
			return this;
		},
		
		remove:  function() {
		  var args = arguments;
		  
		  if (args.length === 1 && typeof args[0] === 'object') {
		    obj = args[0];
		    
		    var count = this.items.length,
		      index = 0;
		    
		    while (count--) {
		      index = (this.items.length - 1) - count;
		      item = this.items[index];
		      if (item === obj) {
		        this.remove.call(this, index);
		      }
		    }
		    
		  } else {
		    var startIndex = args[0],
		      endIndex = args[1] || startIndex;
		      
		    var rest = this.items.slice((startIndex || endIndex) + 1 || this.items.length);
		    
		    
  		  this.items.length = endIndex < 0 ? this.items.length + endIndex : endIndex;
  		  this.items.push.apply(this.items, rest);
  		  
  		  return this;
		  }

		},
		
		_update: function () {
			this.length = this.items.length;
		},
		
		update: function (func) {
			
			for (var i=0; i < this.items.length; i++) {
				var item = this.items[i];
				
				this.items[i] = func(item, i);
			}
			
			return this;
		},
		
		toString: function () {
			
			var item_string = [];
			
			for (var i=0; i < this.items.length; i++) {
				var item = this.items[i],
					_str;
				
				switch (typeof item) {
					
					case 'string':
						_str = '"' + item + '"';
						break;
					
					case 'boolean':
					case 'number':
						_str = item;
						break;
					
					case 'object':
						_str = this.constructor.name;
						break;
					
					default:
						_str = (typeof item)
						break;
					
				}
				
				item_string.push(_str);
				
			};
			
			return '[ ' + item_string.join(', ') + ' ]';
			
		}
	};
	
	this.list = List;
	
	return List;
	
})();
