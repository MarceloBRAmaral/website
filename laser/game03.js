//ANIMATION GAME v. 03
//This release adds:
//1. bullets to the player
//2. bullet sound
//3. player image added
//4. bullet collision with bullet and enemy destruction
//
//BUGS:
//1. some error appears when enemy is shot; this bug does not crash the game
//
//TO DO:
//1. correct bullet collision; it happens from left outside the enemy to somewhere 
//inside it
//2. sound when enemy dies
//3. player HP / loose HP when colliding with the enemy / enemy dies with collision
//4. name anonymous functions
//
//By Marcello Silva

//canvas definition
var document;var window;var init;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//get canvas dimensions
var canvasWid = canvas.width;
var canvasHig = canvas.height;
//font size and color
ctx.font = '20px Arial';
//define scene speed
var speed = 4;
//sounds
var Audio;
var shoot = new Audio("../assets/Laser_Shoot3.wav");
//images
var Image;
var playerImg = new Image();
playerImg.src = 'player.png';
//player/enemy properties
var player = {color:'green', type:'player', img:playerImg};
var enemy = {color:'red', energy:0.5, type:'enemy'};
var bullet = {color:'orange', energy:2, type:'bullet'};
var enemId = 0;//variable to be used as enemy.id
var enemyList ={};//create enemy list to add more enemies, now is empty
var bulletId = 0;
var bulletList ={};
var frameCount = 0;//used to spawn enemies from time to time
var fps = 60;//to be used to calculate the enemy rate
var spe = 3;//to spawn one enemy each spe seconds
var spb = 0.5;//to shoot a bullet each spb seconds

function createEnemy () {//enemy creator
    enemyList[enemId] = enemy;
    enemyList[enemId] = new BoxEnemy(enemy);
    enemId++;
}
function createBullet () {//bullet creator
    bulletList[bulletId] = enemy;
    bulletList[bulletId] = new Bullet(bullet);
    shoot.play();
    bulletId++;
}
//bullet object constructor
function Bullet (bullet) {
    this.xpos = player.xpos+21;
    this.ypos = player.ypos;
    this.position = function () {
        this.ypos-=speed*bullet.energy;};//only updates bulllet y position    
    this.print = function () {//draws the bullet
        ctx.fillStyle = bullet.color;//defines the bullet color
        ctx.fillRect (this.xpos,this.ypos,8,20);};//draw the bullet
}

//player object constructor
function BoxPlayer(box) {
    this.position = function () {//defines the box position
    //player is controlled by mouse
    document.onmousemove = function(mouse) {
    player.xpos = mouse.clientX-25;
    player.ypos = mouse.clientY-25;
    //to not get player off canvas
    if(player.xpos>canvasWid-50){player.xpos=canvasWid-50;
        }else if(player.xpos<0){player.xpos=0;}
    if(player.ypos>canvasHig-50){player.ypos=canvasHig-50;
        }else if(player.ypos<0){player.ypos=0;}
                                            };
    };
    this.print = function () {
        ctx.drawImage(box.img, this.xpos-37, this.ypos);//draws the ship
    };
}

//enemy object constructor
function BoxEnemy(box) {
    var xDirect = 1;//initial directions
    var yDirect = 1;
    this.xpos = Math.floor((Math.random() * (canvasWid-50)) + 1);
    this.ypos = -99;
    this.testDirection = function () {
        if (this.xpos<-100 || this.xpos>canvasWid+50) {
            xDirect*=-1;
        }
        if (this.ypos<-100 || this.ypos>canvasHig+50) {
            yDirect*=-1;
        }
    }; 
    this.position = function () {//defines the box position
        //enemy moves by itself
            this.xpos+=speed*box.energy*xDirect; this.ypos+=speed*box.energy*yDirect;   
                                };
    this.print = function () {
        ctx.fillStyle = box.color;//defines the box color
        ctx.fillRect (this.xpos,this.ypos,50,50);//draw the box
    };
}

//collision functions
var getDistBetEnt = function(entity1, entity2) {
    var vx = entity1.xpos - entity2.xpos;
    var vy = entity1.ypos - entity2.ypos;
    return Math.sqrt(vx*vx+vy*vy);
};
var testCollEnt = function(entity1, entity2) {
    var distance = getDistBetEnt(entity1, entity2);
    return distance < 30;
};

//clears the canvas function
var clearCanvas = function () {
    ctx.fillStyle = 'white';
	ctx.fillRect(0,0,canvasWid,canvasHig);
};
//main loop
function main() {
    init = window.requestAnimationFrame(main);
    // Whatever your main loop needs to do.
    
    clearCanvas();
    frameCount++;//to do: reset frameCount to avoid overflow
    
    //player stuff
    player.position();
    player.print();
    
    //enemy stuff
    if (frameCount%(spe*fps)===0){//more enemies
       createEnemy();
    }
    for(var key in enemyList){//spawn the enemy
        enemyList[key].testDirection();
        enemyList[key].position();
        enemyList[key].print();}    

    //bullet stuff
    if (frameCount%(spb*fps)===0){//bullet rate
        createBullet();
    }
    for(var keyB in bulletList){//shoot
        bulletList[keyB].position();
        bulletList[keyB].print();} 
    
    //test for collisions betweeen bullet and enemy
    for(var keyC in bulletList) {
        for(var keyD in enemyList) {
            var isColliding = testCollEnt(bulletList[keyC], enemyList[keyD]);
            if(isColliding) {delete bulletList[keyC]; delete enemyList[keyD];}
        }
    }
}
    
//create player
player = new BoxPlayer(player);
//this runs the game
main();


