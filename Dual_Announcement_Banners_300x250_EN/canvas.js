
function rr(min, max) {
return Math.random() * (max - min) + min;
}

var canvas;
var cjs = createjs;
var w,h;
var smoke1;
var smoke2;
var smoke3;
var smoke4;
var smokes = [];
var timer=0;
var stage;

function initCanvas(){
	canvas = document.getElementById("cvs");
	w = canvas.width = 300;
	h = canvas.height = 250;
	stage = new cjs.Stage(canvas);
	gsap.ticker.add(draw);

	for(var i=1; i<=4; i++){
		window['smoke'+i] = new createSmoke({x:$('.car'+i).position().left+173,y:$('.car'+i).position().top+27});
		stage.addChild(window['smoke'+i].container)
	}
}


function createSmoke(b){
    var that = this;
    this.container = new cjs.Container();
    this.smokeimg = new Image()
    this.smokeimg.src = "smoke.png";
	this.c = function(){
		smokes.push(new smokeclass(that.container,that.smokeimg,b))	
	}

}

	
function smokeclass(container,smokeimg,b){
    var s = this.smoke;
    s = new cjs.Bitmap(smokeimg);
    s.regX = s.regY = 9;
    s.size = rr(.5,.3);
    s.x = b.x;
    s.y = b.y;
    s.velX =rr(.5,3);
    s.velY = -.2;
    s.scaleX = s.scaleY = s.size;
    s.alpha = rr(.1,.5);
    s.rs = Math.random();
    s.rotation = Math.random()*360;
    container.addChild(s);
    this.move = function(ctr){
		s.x += s.velX;
        s.y += s.velY;
        s.rotation +=s.rs;
		s.alpha -=.003;
		s.scaleX = s.scaleY +=.05;
    }
	this.dead = function(){
		if(s.alpha < 0) {container.removeChild(s);}
		return s.alpha < 0 ;
	}
}

function draw(){
	try{
		timer++;
		if(timer%5==0){
			smoke1.c()
			smoke2.c()
			smoke3.c()
			smoke4.c()
		}
		for(var i = smokes.length-1;i--;){
			smokes[i].move()
			if(smokes[i].dead()){
				smokes.splice(i,1);
			}
		}
	}catch(e){}
		stage.update()
}
function smokeStop(){
	gsap.ticker.remove(draw);
}

// -----------------------logo
var maskCon = new cjs.Container();
var stage2;
var grad;
var wLogo;
var hLogo;
function initCanvasLogo(){
	var canvas = document.getElementById("cvs2");
	wLogo = canvas.width = 100;
	hLogo = canvas.height = 100;
	stage2 = new cjs.Stage(canvas);
	gsap.ticker.add(drawlogo);
    var logo = new cjs.Bitmap('logo-mask.png');
    grad = new cjs.Bitmap('logo-grad.jpg');
    grad.x = grad.y = grad.regX = grad.regY =  82/2;
	grad.rotation = 40;
    logo.compositeOperation = 'destination-in';
    maskCon.addChild(grad,logo)
    maskCon.cache(0,0,wLogo,hLogo);
    stage2.addChild(maskCon);
}

function drawlogo(){
    maskCon.cache(0,0,wLogo,hLogo);
	stage2.update()
}
function logoStop(){
	gsap.ticker.remove(drawlogo);
}
