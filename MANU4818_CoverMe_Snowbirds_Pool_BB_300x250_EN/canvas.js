//utils
function rr(min, max) {
    return Math.random() * (max - min) + min;
}
//global vars
var canvas;
var stage;
var cjs = createjs;
var w,h;
var circle = [];
var circle2 = [];
//containers
var circles;
var circles2;
var bounds={a:380,b:500,c:0,d:250};
function initCanvas(){
    canvas = document.getElementById("cvs");
    w = canvas.width = 745;
    h = canvas.height = 250;
    stage = new cjs.Stage(canvas);
	circles = new createCircle(20,0.05,0.7,bounds)
	circles2 = new createCircle(1,0.05,0.7,bounds)// initialize
	stage.addChild(circles.container,circles2.container);
    TweenLite.ticker.addEventListener('tick',draw)
}
function draw(){
	for(var i=circle.length-1; i>=0; i--){
		circle[i].move()
	}
	for(var i=circle2.length-1; i>=0; i--){
		circle2[i].move()
	}
    stage.update()
}

function addparticle(){
	var bounds={a:170,b:570,c:0,d:250};
	var that = this;
	this.circimg = new Image();
    this.circimg.src = "sparkle1.png";
    this.circimg.onload = function(){
     	circle2.push(new circleclass(circles2.container,that.circimg,0.5,2,bounds))
    }
}

function createCircle(n,min,max,b){
	var that = this;
    this.container = new cjs.Container();
    this.circimg = new Image();
    this.circimg.src = "sparkle1.png";
    this.circimg.onload = function(){
        for(var i=0;i<n;i++){
            circle.push(new circleclass(that.container,that.circimg,min,max,b))
        } 
    }
}
function circleclass(container,img,min,max,bounds){
	var s = this.circle;
	s = new cjs.Bitmap(img);
    s.regX = s.regY =25;
//	s.adelta = rr(.001,.1);
    s.scale = rr(min,max);
	s.delta = rr(.005,.03);
	s.alpha = 1;
	s.x = rr(bounds.a,bounds.b)
    s.y = rr(bounds.c,bounds.d);
	s.life = 1;
    container.addChild(s);
	this.move = function(){
		s.scale += s.delta;
		s.scaleX = s.scaleY = s.scale;
		if (s.scale < 0 || s.scale > max) s.delta = -s.delta;
        if(s.x<bounds.a){s.velX*=-1;}
        if(s.x > bounds.b){s.velX*=-1;}
        if(s.y<bounds.c){s.velY*=-1;}
        if(s.y > bounds.d){s.velY*=-1;}
  	}
}
function removeCanvas(){
    TweenLite.ticker.removeEventListener('tick',draw)
}