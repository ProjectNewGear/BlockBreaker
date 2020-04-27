class Paddle {
	constructor(game) {
		this.type = "paddle";
		
		this.image = document.getElementById('img_paddle');
		
		this.width = 140;
		this.height = 20;
		
		this.maxSpeed = 7;
		this.speed = 0;
		
		this.gameWidth = game.gameWidth;
		
		this.position = {
			x: game.gameWidth / 2 - this.width / 2,
			y: game.gameHeight - this.height - 10,
		}
		
		this.edges = {left: this.position.x, right: this.position.x + this.width, upper: this.position.y, lower: this.position.y + this.height};
	}
	
	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
	
	update(deltaTime) {
		this.position.x += this.speed;
		if(this.position.x < 0) this.position.x = 0;
		if(this.position.x + this.width > this.gameWidth)
			this.position.x = this.gameWidth - this.width;
		
		this.edges = {left: this.position.x, right: this.position.x + this.width, upper: this.position.y, lower: this.position.y + this.height};
	}
	
	moveLeft() {
		this.speed = -this.maxSpeed;
	}
	
	moveRight() {
		this.speed = this.maxSpeed;
	}
	
	stop() {
		this.speed = 0;
	}
}