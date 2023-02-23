
function rr(min, max) {
	return Math.random() * (max - min) + min;
}
var canvas;
var cjs = createjs;
var w,h;
var particle;
var particles = [];
var timer=0;


function initCanvas(){
	canvas = document.getElementById("cvs");
	w = canvas.width = 300;
	h = canvas.height = 250;
	stage = new cjs.Stage(canvas);
	gsap.ticker.add(draw);
	particle = new create_particle({x:0,y:250});

	stage.addChild(
		particle.container
	);
}


function create_particle(b){
    var that = this;
    this.container = new cjs.Container();
    this.g = new cjs.Graphics().f("orange").r(0,0, 8, 4);
	this.c = function(){
		particles.push(new particle_class(that.container,that.g,b))	
	}
}

	
function particle_class(container,g,b){
    var s = new cjs.Shape(g);
    s.regX = s.regY = 9;
    s.size = rr(.3,.5);
    s.x = rr(0,300);
    s.y = b.y;
    s.velX =rr(-.4,.4);
    s.velY = rr(-.3,-.6);
    s.scaleX = s.scaleY = s.size;
    s.alpha = rr(.5,1);
    s.rs = Math.random(); 
    s.rotation = Math.random()*360; 
    container.addChild(s);
    this.move = function(ctr){
		s.x -= s.velX;
        s.y += s.velY;
        s.rotation +=s.rs;
		s.alpha -=.002;
    }
	this.dead = function(){
		if(s.alpha < 0) {container.removeChild(s);}
		return s.alpha < 0 ;
	}
}


function draw(){
	try{
		timer++;
		if(timer%4==0){
			particle.c()
		}
		for(var i = particles.length-1;i--;){
			particles[i].move()
			if(particles[i].dead()){
				particles.splice(i,1);
			}
		}
	}catch(e){}
	stage.update()
}
function particle_stop(){
	gsap.ticker.remove(draw);
}
function particle_play(){
	gsap.ticker.add(draw);
}
