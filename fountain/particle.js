//particle.js v. 01
//This framework contains particle related functions
//
//INFO:
//1. Particle life: 
// - when set to 0, the life is infinite;
// - when set to 100, the life is as short as possible, let's say 1 frame
// - the life counter starts with 100;it is subtracted the life value from life counter each frame
// - the particle dies when the life counter is 0
// - the boolean "dead" has to be handled externally to kill the particle
//
//This release adds:
//1. 
//
//BUGS:
//1. 
//
//TO DO:
//1. create utils library; add function to convert angle from degrees to radius 
//2. make the life in seconds
//3. receive a friction number directly proportional and convert here
//
//By Marcello Silva
var particle = {
    position:null,
    velocity:null,
    lifeCounter:100,
    
    create:function(x,y,speed,direction,grav,fric,lif){
        var obj=Object.create(this);
        obj.position=vector.create(x,y);
        obj.velocity=vector.create(0,0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity=vector.create(0,grav||0);
        obj.friction=fric||1;//default friction v1 is 1 (no friction) and v2 is 0
        obj.life=lif||0;//default life is infinite
        return obj;
    },
    
    accelerate:function(accel){
        this.velocity.addTo(accel);
    },
    
    update:function(){
        this.velocity.addTo(this.gravity);
        this.velocity.multiplyBy(this.friction);//2 versions of friction;this one uses less processing, but is really sensitive near <1, like 0.95 is almost useless
        //bellow is the second version of friction, less sensitive, but with more processing
        //this.velocity.setLength(this.velocity.getLength()-this.friction);//2v of friction
        //if(this.velocity.getLength()<this.friction){this.velocity.setLength(0);}//2v of friction
        this.position.addTo(this.velocity);
        if(this.lifeCounter>0){//calculating the remaining particle life
        this.lifeCounter-=this.life;}else{this.lifeCounter=0;}
    },
    
    testBounds:function(canvasWidth,canvasHeigth,width,heigth){
        if(this.position.getX()>canvasWidth-width||this.position.getX()<0+width){
        this.velocity.setAngle(Math.PI-this.velocity.getAngle());
    }else if (this.position.getY()>canvasHeigth-heigth){
        this.position.setY(canvasHeigth-heigth);//to avoid the ball being trapped into the bottom
        this.velocity.setAngle(-this.velocity.getAngle());
        
        
    }else if (this.position.getY()<0+heigth){
        this.position.setY(heigth);//to avoid the ball being trapped into the top ceiling
        this.velocity.setAngle(-this.velocity.getAngle());
}
}
};