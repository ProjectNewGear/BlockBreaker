class Brick {

	constructor(game, position, color) {
		switch(color) {
			case 1:
				this.image = document.getElementById('img_brick1');
				break;
			case 2:
				this.image = document.getElementById('img_brick2');
				break;
			case 3:
				this.image = document.getElementById('img_brick3');
				break;
			default:
				this.image = document.getElementById('img_brick4');
				break;
		}
		
		this.type = "brick";
		
		this.game = game;
		
		this.width = 50;
		this.height = 20;
		
		this.position = position;
		
		this.markedForDeletion = false;
		
		this.edges = {left: this.position.x, right: this.position.x + this.width, upper: this.position.y, lower: this.position.y + this.height};
	}
	
	update() {}
	
	draw() {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}