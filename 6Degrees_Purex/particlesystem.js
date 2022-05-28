
//utils
function rr(min, max) {
return Math.random() * (max - min) + min;
}
//global vars
var canvas;
var cjs = createjs;
var w,h;
var smoke1;
var smoke2;
var smoke3;
var smoke4;
var smokes = [];
var timer=0;
function initCanvas(){
	canvas = document.getElementById("cvs");
	w = canvas.width = 300;
	h = canvas.height = 250;
	stage = new cjs.Stage(canvas);
    TweenLite.ticker.addEventListener('tick',draw);
}


//create smoke particles
function createSmoke(b){
    var that = this;
    this.container = new cjs.Container();
    this.smokeimg = new Image()
    this.smokeimg.src = "smoke-g.png";
	smokes.push(new smokeclass(that.container,that.smokeimg,b))	
}

	
//smoke constructor
function smokeclass(container,smokeimg,b){
    var s = this.smoke;
    s = new cjs.Bitmap(smokeimg);
    s.regX = s.regY = 20;
    s.size = rr(.2,1);
    s.x = b.x;
    s.y = b.y;
    s.velX =rr(-1,1);
    s.velY = -1;
    s.scaleX = s.scaleY = s.size;
    s.alpha = rr(.3,.8);
    s.rs = Math.random(); // rotation speed
    s.rotation = Math.random()*360; //start rotation
//	s.compositeOperation = 'lighter';
    container.addChild(s);
    this.move = function(ctr){
		s.x += s.velX;
        s.y += s.velY;
        s.rotation +=s.rs;
		s.alpha -=.01;
		s.scaleX = s.scaleY +=.01;
    }
	this.dead = function(){
		return s.alpha < 0 ;
	}
}
function draw(){
	try{
		timer++;
		// if(timer%6==0){
			smoke1 = new createSmoke({x:45,y:130});
			smoke2 = new createSmoke({x:115,y:100});
			smoke3 = new createSmoke({x:200,y:140});
			smoke4 = new createSmoke({x:245,y:190});
		// }

		for(var i = smokes.length-1;i--;){
			smokes[i].move()
			if(smokes[i].dead()){
				smokes.splice(i,1);
			}
		}


		stage.addChild(
			smoke1.container,
			smoke2.container,
			smoke3.container, 
			smoke4.container);

		stage.update()
	}catch(e){}
}
function stinkStop(){
	
    TweenLite.ticker.removeEventListener('tick',draw);
}