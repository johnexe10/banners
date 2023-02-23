// vars
var set = TweenMax.set;
var cjs = createjs;

// settings
var w,h;
var size =2; 
var max_particles = 700;
var velocity = 4;
var dead=1;
var mSize = 1;
var particleArr = [];
var stage ;
// utils
function rr(min, max) {
	if (max == null) { max = min; min = 0; }
	if (min > max) { var tmp = min; min = max; max = tmp; }
	return min + (max - min) * Math.random();
  }

// init
var pContainer = new cjs.Container();
var maskCon = new cjs.Container();;
function initCanvas(){
	canvas = document.getElementById("cvs");
	canvas2 = document.getElementById("cvs-girl");
	canvas3 = document.getElementById("cvs-logo");
	w = canvas.width = canvas2.width = 600;
	h = canvas.height = canvas2.height = 500;
	canvas3.width = 402;canvas3.height = 127;
	stage = new cjs.Stage(canvas);
	gsap.ticker.add(draw);

	//------------hero canvas
	stage2 = new cjs.Stage(canvas2);
	hero = new cjs.Bitmap('img1.png'); 
	hero = hero.clone();
	hero.filters = [new createjs.ColorFilter(0,0,0,1, 0,0,0,0)];
	hero.cache(0, 0, w, h);

	var origHero = hero.clone();
	mask = new createjs.Shape();
	mask.graphics.lf(["#000","rgba(0,0,0,0)"], [0.5, 1], 0, 0, 0, 500).dr(150, 0, 300, 700);
	mask.compositeOperation = 'destination-out';
	maskcon = new cjs.Container();
	maskcon.addChild(origHero,mask);
	maskcon.cache(0,0,w,h);
	stage2.addChild(hero,maskcon)
	//-----------end hero

	//------------logo canvas
	stage3 = new cjs.Stage(canvas3);
	logo = new cjs.Bitmap('logo.png'); 
	stage3.addChild(logo)
	stage3.update()
	//-----------end logo

    stage.addChild(pContainer);

}

function generateParticles(){
    for (var i = 0; i < max_particles; i++) {
          particleArr.push(createParticle());
      }
  }
function createParticle(){
    var particle = {};
    particle.shape = new createjs.Shape();
    particle.shape.graphics.f((Math.random()>.5) ? "yellow" : "orange").dc(0, 0, rr(1,rr(1,3)));
	particle.angle = rr(Math.PI*2)
	particle.force = rr(5,10);
    particle.shape.x = 300;
    particle.shape.y = 250;
	
	// console.log(particle.shape.x)
	particle.vx = Math.sin(particle.angle) * particle.force;
	particle.vy = Math.cos(particle.angle) * particle.force;    
    particle.shape.alpha = rr(.8,1);
	particle.shape.rotation =  Math.atan2(particle.vy, particle.vx);    
    particle.drag = rr(0.82, 0.97);
	particle.wander = rr( 0.5, 1 )
    particle.shape.scaleY = particle.shape.scaleX  = rr(0.05, 1);

    return particle;
}
var t=0;
function draw(){
	t+=.01;
  	try{
		for(var i = max_particles-1;i--;){
			var particle = particleArr[i];
			pContainer.addChild(particle.shape);

			particle.shape.x += particle.vx;
			particle.shape.y += particle.vy;
			particle.vx *= particle.drag;
			particle.vy *= particle.drag;
			particle.angle += rr( -0.5, 0.5 ) * particle.wander
			particle.vx += Math.sin( particle.angle ) * 0.2
			particle.vy += Math.cos( particle.angle ) * 0.2


			if(particle.shape.x > w+200 || particle.shape.x < -200 ||particle.shape.y > h+200 || particle.shape.y < -200  ){
				pContainer.removeChild(particle.shape);
				
				particleArr[i] = createParticle();
			}

				
		}
	}catch(e){

	}
  stage.update();
  maskcon.updateCache()
  stage2.update();
}   



function particle_stop(){
	gsap.ticker.remove(draw);
}
function particle_play(){
	gsap.ticker.add(draw);
}
