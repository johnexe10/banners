
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
	gsap.ticker.add(draw);

	var carpos1 = $('.car1').position();
	var carpos2 = $('.car2').position();
	var carpos3 = $('.car3').position();
	var carpos4 = $('.car4').position();

	smoke1 = new createSmoke({x:carpos1.left+173,y:carpos1.top+30});
	smoke2 = new createSmoke({x:carpos2.left+173,y:carpos2.top+30});
	smoke3 = new createSmoke({x:carpos3.left+173,y:carpos3.top+30});
	smoke4 = new createSmoke({x:carpos4.left+173,y:carpos4.top+30});

	stage.addChild(
		smoke1.container,
		smoke2.container,
		smoke3.container, 
		smoke4.container
	);


}


//create smoke particles
function createSmoke(b){
    var that = this;
    this.container = new cjs.Container();
    this.smokeimg = new Image()
    this.smokeimg.src = "smoke.png";
	this.c = function(){
		smokes.push(new smokeclass(that.container,that.smokeimg,b))	
	}

}

	
//smoke constructor
function smokeclass(container,smokeimg,b){
    var s = this.smoke;
    s = new cjs.Bitmap(smokeimg);
    s.regX = s.regY = 9;
    s.size = rr(.5,.3);
    s.x = b.x;
    s.y = b.y;
    s.velX =rr(.5,2);
    s.velY = -.2;
    s.scaleX = s.scaleY = s.size;
    s.alpha = rr(.1,.5);
    s.rs = Math.random(); // rotation speed
    s.rotation = Math.random()*360; //start rotation
    container.addChild(s);
    this.move = function(ctr){
		s.x += s.velX;
        s.y += s.velY;
        s.rotation +=s.rs;
		s.alpha -=.002;
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
		if(timer%10==0){
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
