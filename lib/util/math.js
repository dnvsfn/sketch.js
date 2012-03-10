(function () {
	
	function random () {
		var a = arguments;
		
		if (a.length === 1) {
			var max = a[0];
			return Math.random() * max;
			
		} else if (a.length === 2) {
			var min = a[0],
				max = a[1];
			return Math.round(min + (Math.random() * (max-min) ));
			
		} else if (a.length === 3) {
			var min = a[0],
				max = a[1],
				dec = a[2];
			return (Math.round(min + (Math.random() * (max-min) ))).toFixed(dec);
		} else {
		  return Math.random();
		}
		
	};
	
	random.toggle = function (amount) {
	  var rand = Math.random() < 0.5 ? -amount : amount;
	  
	  return rand;
	};
	
	this.random = random;
	
	this.norm = function (value, low, high) {
	  return (value - low) / (high - low);
	};

	this.map = function (value, istart, istop, ostart, ostop) {
	  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	};

	this.lerp = function (value1, value2, amt) {
	  return ((value2 - value1) * amt) + value1;
	};
	
	this.cos = function (num) {
	  return Math.cos(num);
	};
	
	this.sin = function (num) {
	  return Math.sin(num);
	}
	
	this.cwave = function (amount) {
	  var num = Math.cos($pad.frame / amount);
	  return num;
	};
	
	this.swave = function (amount) {
	  var num = Math.sin($pad.frame / amount);
	  return num;
	};
	
	
	this.abs = function (num) {
	  return Math.abs(num);
	};
	
	this.round = function (num) {
	  return Math.round(num);
	};
	
})();