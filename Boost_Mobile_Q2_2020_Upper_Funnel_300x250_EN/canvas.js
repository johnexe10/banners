// vars
var set = TweenMax.set;
var cjs = createjs;

// settings
var w,h;
var size =1; 
var max_particles = 150;
var color = "#fff";
var velocity = 2;
var dead=1;
var mSize = .7;
var rSize = 1;
var pSize = 1;
var particleArr = [];
var stage ;
// utils
function rr(min, max){
	var r = (Math.random() * (max - min)) + min;
    return r;
}


// init
var pContainer = new cjs.Container();
var maskCon = new cjs.Container();;
function initCanvas(){
    canvas = document.getElementById("cvs");
    w = canvas.width = 231;
    h = canvas.height = 161;
	stage = new cjs.Stage(canvas);
    var masker = new cjs.Bitmap('map-mask.png');
    masker.compositeOperation = 'destination-in';
    generateParticles();
    maskCon.addChild(pContainer,masker)
    maskCon.cache(0,0,w,h);
    stage.addChild(maskCon);
}
function startDraw(){
	TweenLite.ticker.addEventListener("tick", draw);
}
function stopDraw(){
	TweenLite.ticker.removeEventListener("tick", draw);
}
function generateParticles(){
    for (var i = 0; i < max_particles; i++) {
          particleArr.push(createParticle());
      }
  }
function createParticle(){
    var particle = {};
    particle.shape = new createjs.Shape();
    particle.shape.graphics.f(color).dc(0, 0, 2);
    particle.shape.x = rr(0,w);
    particle.shape.y = rr(0,h);
    particle.xSpeed = rr( (-1) * velocity , velocity);
    particle.ySpeed = rr( (-1) * velocity , velocity);
    var size;
    if(rSize==1){
        size = rr(.3,mSize);
    }else{
        size = pSize;
    }
    particle.size = size;
    particle.shape.scaleY = particle.shape.scaleX  = particle.size;
    return particle;
}

function draw(){
  for(var i=0; i<max_particles;i++){
      var particle = particleArr[i];
      pContainer.addChild(particle.shape);
      particle.shape.x = particle.shape.x + particle.xSpeed;
      particle.shape.y = particle.shape.y + particle.ySpeed;

      if(dead==1){
        particle.size = particle.size * (0.9 + (rr(7,10)/100));
        particle.shape.scaleY = particle.shape.scaleX  = particle.size;
        if(particle.size<=0.2){
            particleArr[i] = createParticle();
        }
      }else{

        if(particle.x < -(particle.size) ||
           particle.y < -(particle.size) ||
           particle.x > w+particle.size ||
           particle.y > h+particle.size){
           particleArr[i] = createParticle();
        }
      }
  }
  maskCon.updateCache();
  stage.update();
}   
