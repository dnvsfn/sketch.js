(function () {
	
	/**
	* Grid
	* @class
	* @returns New Grid() instance
	*/
	this.Grid = function (width, height, options) {

		this.color1 = "white";
		this.color2 = "lightgray";
		this.rect_size = 20;

		this.row = Math.ceil(height / this.rect_size);
		this.col = Math.ceil(width / this.rect_size);
		this.grid_blocks = this.row * this.col;

		var x=0, 
			y=0, 
			r=0, 
			c=0, 
			index = 0,
			i = this.grid_blocks, 
			color, 
			m=0;

		while (i--) {

			if (x + this.rect_size > width) {
				c = 0;
				r++;
				m = r % 2 == 0 ? 0 : 1;
			} else if (i != this.grid_blocks - 1){
				c++;
				m++;
			}

			x = c * this.rect_size;
			y = r * this.rect_size;

			color = m % 2 == 0 ? this.color1 : this.color2;

			$c.context.fillStyle = color;
			$c.context.fillRect(x, y, this.rect_size, this.rect_size);
		};

		this.image = $c.context.getImageData(0, 0, $pad.width, $pad.height);
		
		return this;
	};
	
	/**
	 * Draws Grid() pixels
	 * @public
	 */
	Grid.prototype.draw = function () {
		$c.context.putImageData(this.image, 0, 0);
	};
	
})();