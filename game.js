const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	GAMEOVER: 2,
	WIN: 3
}

class Game {
	
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
	}
	
	start() {
		this.gameState = GAMESTATE.RUNNING;
		this.ball = new Ball(this);
		this.paddle = new Paddle(this);
		
		let bricks = [];
		
		for (let i = 0; i < 1; i++)
		{
			for (let j = 0; j < 1; j++)
			{
				let color = (i+j)%4;
				bricks.push(new Brick(this, {x:50 * i, y:20 * j + 40}, color));
			}
		}
		
		this.gameObjects = [this.ball, this.paddle, ...bricks];
		
		new InputHandler(this);
	}
	
	update(deltaTime) {
		if (this.gameState == GAMESTATE.RUNNING)
		{
			this.gameObjects.forEach((object) => object.update(deltaTime));
			this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
			
			let bricks = this.gameObjects.filter(object => !object.markedForDeletion && object.type == "brick");
			if (bricks == 0){
				this.gameState = GAMESTATE.WIN;
			}
		}
	}
	
	draw(ctx) {
		this.gameObjects.forEach((object) => object.draw(ctx));
		
		if(this.gameState == GAMESTATE.GAMEOVER)
		{
			ctx.rect(0,0,this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(100,0,0,0.5)";
			ctx.fill();
			
			ctx.font = "60px Comic Sans MS";
			ctx.fillStyle = "pink";
			ctx.textAlign = "center";
			ctx.fillText("Game Over!", this.gameWidth / 2, this.gameHeight / 2);
		}
		
		if(this.gameState == GAMESTATE.WIN)
		{
			ctx.rect(0,0,this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,100,0,0.5)";
			ctx.fill();
			
			ctx.font = "60px Comic Sans MS";
			ctx.fillStyle = "springgreen";
			ctx.textAlign = "center";
			ctx.fillText("You Win!", this.gameWidth / 2, this.gameHeight / 2);
		}
		
		if(this.gameState == GAMESTATE.PAUSED)
		{
			ctx.rect(0,0,this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fill();
			
			ctx.font = "60px Comic Sans MS";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("Paused...", this.gameWidth / 2, this.gameHeight / 2);
		}
	}
	
	togglePause() {
		if(this.gameState == GAMESTATE.PAUSED)
		{
			this.gameState = GAMESTATE.RUNNING;
		}
		else if(this.gameState == GAMESTATE.RUNNING)
		{
			this.gameState = GAMESTATE.PAUSED;
		}
		console.log(this.gameState);
	}
}