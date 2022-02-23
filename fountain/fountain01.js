//Fountain v. 01
//This tutorial uses a modified version of Fireworks05 to simulate a fountain
//
//This release adds:
//1. boundary test just for fun
//2. boundary test removed
//3. gravity
//4. boundary test returned(REMOVED)
//5. friction removed
//6. particles instanciation has to be inside the loop, creating one each frame
//7. there is a limit for the number of particles
//8. particles have life time
//9. particles have to be shot upwards
//10.testbounds removed
//
//BUGS:
//1. (SOLVED)simulation is failing, some balls are trapped in the bottom;(SOLUTION-the problem was solved
//  by subtracting an offset equals the heigth of the ball in the particle system)
//
//TO DO:
//1. (ADDED)add friction;(ADDED in the particle system)
//2. add collision between balls
//
//By Marcello Silva

//canvas definition
var document;var window;var init;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//get canvas dimensions
var canvasWidth = canvas.width;
var canvasHeigth = canvas.height;
//font size and color
ctx.font = '20px Arial';

// var definitions
var radius = 3;//radius of the ball
var particles = [];//array of particles
//var numParticles = 500;//number of particles to be created

var clearCanvas = function () {
	ctx.clearRect(0,0,canvasWidth,canvasHeigth);
};

function main() {
    init = window.requestAnimationFrame(main);
    // Whatever your main loop needs to do    
    clearCanvas();//clear the canvas
    //instanciate the particles objects, one each frame
    particles.push(particle.create(canvasWidth/2,canvasHeigth/2,Math.random()*2+1,Math.random()*Math.PI/4-5*Math.PI/8,0,0.98,1));//xpos, ypos, speed, direction, gravity, friction, life

    removeDeadParticles();
    for(var i=0;i<particles.length;i++){
        var p=particles[i];
        //p.testBounds(canvasWidth,canvasHeigth,radius,radius);//it makes no sense here
        p.update();
        ctx.beginPath();//only this can erase stroke and arc
        ctx.fillStyle='grey';
        ctx.arc(p.position.getX(),p.position.getY(),radius,0,Math.PI*2,false);
        ctx.fill();
        //ctx.fillText(' ypos = ' + p.position.getY(),50,50);
    }
    
}

function removeDeadParticles() {
		for(var i = particles.length - 1; i >= 0; i -= 1) {
			var p = particles[i];
			if(p.lifeCounter===0) {
			   	particles.splice(i, 1);//remove the dead particle
			}
		}
	}

main();