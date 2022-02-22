var game;

window.onload = function() {	
	game = new Phaser.Game(640, 480, Phaser.AUTO, "");
    game.state.add("PlayGame",playGame);
	game.state.start("PlayGame");
}
	
var playGame = function(game){};
var circle;

playGame.prototype = {
	preload: function(){
		game.load.image("ball", "ball32.png");
		game.load.image("ground", "ground.png"); 
		game.load.image("wall", "groundRight.png");
		//to make game responsive
		game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;
		game.scale.setShowAll();
		game.scale.refresh(); 
	},
  	create: function(){
				
  		game.stage.backgroundColor = "#222222";
  		// in the same way we initialized other Phaser physics engines, this is how we initialize Box2D engine
		game.physics.startSystem(Phaser.Physics.BOX2D);
		// setting gravity
		game.physics.box2d.gravity.y = 500;
		// we add the sprite which will represent the ground.
		// notice are placing it as if the registration point were in the center
		var groundSprite = game.add.sprite(320, 460, "ground");
        var wallLeft = game.add.sprite(20, 480/2, "wall");
        var wallRight = game.add.sprite(620, 480/2, "wall");
            
    	// enabling the physics on the body
    	game.physics.box2d.enable(groundSprite);
        game.physics.box2d.enable(wallLeft);
        game.physics.box2d.enable(wallRight);
    	// making the body/sprite static
    	groundSprite.body.static = true;
        wallLeft.body.static = true;
        wallRight.body.static = true;
        groundSprite.body.restitution = 0.5;    
        wallLeft.body.restitution = 1;
		wallRight.body.restitution = 1;
			
    	// waiting for player input
    	game.input.onDown.add(addBall, this);
	}
}

function addBall(e){
	// this is how we get an array of bodies at a certain cordinate, in this case player input coordinate
	var currentBody = game.physics.box2d.getBodiesAtPoint(e.x, e.y);
	// if there is at least one body (but it can't be more than one in this example)...
	if(currentBody.length>0){	
		// if the body is not static (it's not the ground)
		if(!currentBody[0].static){
			// destroy the sprite and the body
			currentBody[0].sprite.destroy();
		}
	}
	else{
		// otherwise create a ball in the same way we created the ground
		var ballSprite = game.add.sprite(e.x, e.y, "ball");
			game.physics.box2d.enable(ballSprite);
			ballSprite.body.setCircle(ballSprite.width/2);//make the body shape a circle
            ballSprite.body.restitution=0.5;

    }
}

