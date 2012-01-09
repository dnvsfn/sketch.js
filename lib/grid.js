(function () {
	
	this.Grid = function (WIDTH, HEIGHT, context) {

		var color1 = "rgba(255,255,255,255)", // white
			color2 = "rgba(220,220,220,255)", // gray
			color;

		var rect_size = 20;
		var index = 0;

		var row = Math.ceil(HEIGHT / rect_size);
		var col = Math.ceil(WIDTH / rect_size);
		var grid_blocks = row * col;

		var x=0, y=0, r=0, c=0, i = grid_blocks, color, m=0;

		while (i--) {

			if (x + rect_size > WIDTH) {
				c = 0;
				r++;
				m = r % 2 == 0 ? 0 : 1;
			} else if (i != grid_blocks - 1){
				c++;
				m++;
			}

			x = c * rect_size;
			y = r * rect_size;

			color = m % 2 == 0 ? color1 : color2;

			$c.context.fillStyle = color;
			$c.context.fillRect(x, y, rect_size, rect_size);
		};

		this.image = $c.context.getImageData(0, 0, WIDTH, HEIGHT);

	};
	
	Grid.prototype.draw = function () {
		$c.context.putImageData(this.image, 0, 0);
	};
	
})();