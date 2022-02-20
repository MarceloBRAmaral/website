var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var xgreen = 10;
var xred = 10;
var ygreen = 20;
var yred = 80;
var xGreenDirection = 1;//controls the direction for the green box
var yGreenDirection = 1;//controls the direction for the green box
var xRedDirection = 1;//controls the direction for the red box
var yRedDirection = 1;//controls the direction for the red box
var speed1 = 4;//controls the speed
var speed2 = 5;//controls the speed
var buttonRed = document.querySelector('#red');//grabs hold of the first button to buttonRed
var buttonGreen = document.querySelector('#green');//grabs hold for buttonGreen
var callMain = true;//variable to call main only one time, otherwise clicking button more than once 
                    //would accelerate the box
var red = false;//if true the red box is moving
var green = false;//if true the green box is moving
var redStarted = false;//if true the red box is already in the canvas
var greenStarted = false;//if true the green box is already in the canvas

var clearCanvas = function () {
    ctx.fillStyle = "black";//clears the canvas
	ctx.fillRect(0,0,400,400);

};

var drawGreen = function () {
    ctx.fillStyle = "green";//style for a green box
	ctx.fillRect (xgreen,ygreen,50,50);//draw the green rectangle
};

var main = function () {
    
    var init =  window.requestAnimationFrame( main );
  
  // Whatever your main loop needs to do.
    
    clearCanvas();
    if (greenStarted) {
        if (green) {
	drawGreen();
	        if ((xgreen>350)||(xgreen<0)){
            xGreenDirection=xGreenDirection*(-1);
            }//reverse direction if boundary touched
	        xgreen=xgreen+(xGreenDirection*speed1);
            if ((ygreen>350)||(ygreen<0)){
                yGreenDirection=yGreenDirection*(-1);
            }//reverse direction if boundary touched
    ygreen=ygreen+(yGreenDirection*speed2);
        }   else {
            ctx.fillStyle = "green";
	        ctx.fillRect (xgreen,ygreen,50,50);//draw the green at same position
            }
    }
    if (redStarted) {
        if (red) {
	        ctx.fillStyle = "red";//style for a red box
	        ctx.fillRect (xred,yred,50,50);//draw the red rectangle
	        if ((xred>350)||(xred<0)){
                xRedDirection=xRedDirection*(-1);
            }//reverse direction if boundary touched
	        xred=xred+(xRedDirection*speed2);
            if ((yred>350)||(yred<0)){
                yRedDirection=yRedDirection*(-1);
            }//reverse direction if boundary touched
            yred=yred+(yRedDirection*speed1);
        }   else {
            ctx.fillStyle = "red";
	        ctx.fillRect (xred,yred,50,50);//draw the red at same position
            }
    }

	
};

var startLoop = function () {
    if (callMain) {main();}
    callMain = false;
};

var startRed = function() {
    redStarted = true;
    if (!red) {
    red = true;
    }   else { 
        red = false;
        }
    startLoop();
};

var startGreen = function() {
    greenStarted = true;
    if (!green) {
    green = true;
    }   else { 
        green = false;
        }
    startLoop();
};

//button.onclick= startLoop();
buttonRed.addEventListener('click', startRed);
buttonGreen.addEventListener('click', startGreen);


