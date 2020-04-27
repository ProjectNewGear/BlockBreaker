class Ball {

	constructor(game) {
		this.type = "ball";
		
		this.image = document.getElementById('img_ball');	
		
		this.speed = {x:4, y:4};
		
		this.size = 20;
		
		this.gameWidth = game.gameWidth;
		
		this.gameHeight = game.gameHeight;
		
		this.position = {x:this.gameWidth / 2, y:this.gameHeight / 2};
		
		this.game = game;
		
		this.edges = {left: this.position.x, right: this.position.x + this.size, upper: this.position.y, lower: this.position.y + this.size};
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
		
	}
	
	detectCollisionWithObject(collider)
	{
		this.edges = {left: this.position.x, right: this.position.x + this.size, upper: this.position.y, lower: this.position.y + this.size};
		
		if (
			this.edges.left <= collider.edges.right &&
			this.edges.right >= collider.edges.left &&
			this.edges.lower >= collider.edges.upper &&
			this.edges.upper <= collider.edges.lower
		) {
			return true;
		}
		else {
			return false;
		}
	}


	update(deltaTime) {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
		
		if (this.edges.lower >= this.gameHeight) {this.game.gameState = GAMESTATE.GAMEOVER;}
		
		if ((this.position.x + this.size) > this.gameWidth || this.position.x < 0) {
			this.speed.x = -this.speed.x;
		}
		if ((this.position.y + this.size) > this.gameHeight || this.position.y < 0) {
			this.speed.y = -this.speed.y;
		}
		
		if (this.detectCollisionWithObject(this.game.paddle) &&
			this.speed.y > 0){	//Ball is not already moving up
			this.speed.y = -this.speed.y;
			let contactPoint = this.game.paddle.edges.right - this.edges.right;
			if (contactPoint < 10)
			{
				this.speed.x = 7;
			}
			else if (contactPoint < 20)
			{
				this.speed.x = 6;
			}
			else if (contactPoint < 30)
			{
				this.speed.x = 5;
			}
			else if (contactPoint < 40)
			{
				this.speed.x = 4;
			}
			else if (contactPoint < 50)
			{
				this.speed.x = 3;
			}
			else if (contactPoint < 60)
			{
				this.speed.x = 2;
			}
			else if (contactPoint < 70)
			{
				this.speed.x = 1;
			}
			else if (contactPoint < 80)
			{
				this.speed.x = -1;
			}
			else if (contactPoint < 90)
			{
				this.speed.x = -2;
			}
			else if (contactPoint < 100)
			{
				this.speed.x = -3;
			}
			else if (contactPoint < 110)
			{
				this.speed.x = -4;
			}
			else if (contactPoint < 120)
			{
				this.speed.x = -5;
			}
			else if (contactPoint < 130)
			{
				this.speed.x = -6;
			}
			else
			{
				this.speed.x = -7;
			}
		}
		
		let bricks = this.game.gameObjects.filter(object => object.type == "brick");
		
		let speedChangeApplied = false;
		
		bricks.forEach((thisBrick) => 
		{
			if (this.detectCollisionWithObject(thisBrick))
			{
				if (speedChangeApplied == false)
					{
					if(this.speed.x > 0 && this.speed.y < 0)	//moving up-right
					{
						let h_overlap = this.edges.right - thisBrick.edges.left;
						let v_overlap = thisBrick.edges.lower - this.edges.upper;
						if (h_overlap > v_overlap) {this.speed.y = -this.speed.y;} else {this.speed.x = -this.speed.x;}
					}
					else if(this.speed.x < 0 && this.speed.y < 0)	//moving up-left
					{
						let h_overlap = thisBrick.edges.right - this.edges.left;
						let v_overlap = thisBrick.edges.lower - this.edges.upper;
						if (h_overlap > v_overlap) {this.speed.y = -this.speed.y;} else {this.speed.x = -this.speed.x;}
					}
					else if(this.speed.x > 0 && this.speed.y > 0)	//moving down-right
					{
						let h_overlap = this.edges.right - thisBrick.edges.left;
						let v_overlap = this.edges.lower - thisBrick.edges.upper;
						if (h_overlap > v_overlap) {this.speed.y = -this.speed.y;} else {this.speed.x = -this.speed.x;}
					}
					else if(this.speed.x < 0 && this.speed.y > 0)	//moving down-left
					{
						let h_overlap = thisBrick.edges.right - this.edges.left;
						let v_overlap = this.edges.lower - thisBrick.edges.upper;
						if (h_overlap > v_overlap) {this.speed.y = -this.speed.y;} else {this.speed.x = -this.speed.x;}
					}
					speedChangeApplied = true;
				}
				thisBrick.markedForDeletion = true;
			}
		});
	}
}