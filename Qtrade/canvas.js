// vars
var set = TweenMax.set;
var cjs = createjs;
var particle=[];
var containerclouds;
var stage;
// settings
var speed = .2;
var size =10; 
var num = 100;
// utils
function rr(min, max){
	var r = (Math.random() * (max - min)) + min;
    return r;
}
// init
function initCanvas(){
    canvas = document.getElementById("cvs");
    w = canvas.width = 300;
    h = canvas.height = 250;
	stage = new cjs.Stage(canvas);
    containerclouds = new cjs.Container();
	for(var i=0;i<=num;i++){particle.push(new clouds(rr(0,w),rr(0,h)))}
	gsap.ticker.add(draw);
	stage.addChild(containerclouds)
}
function draw(){
	for(var i=particle.length-1;i>=0;i--){
		c=particle[i];
		containerclouds.addChild(c)
		c.angle+=c.rand;
		c.x+=c.rad*Math.sin(c.angle);
		c.y+=c.rad*Math.cos(c.angle);
		c.alpha+=c.aN;
		if(c.alpha > .5|| c.alpha <.05){
			c.aN*=-1;
		}
	} 
	stage.update();
}
function clouds(x,y){
	var c = this.img = new cjs.Bitmap('p1.png');
	c.x = x;
	c.y = y;
	c.angle=rr(1,5);
	c.rad = rr(0,.5);
	c.rand = rr(.01,.08);
	c.alpha = rr(0.05,.5);
	c.aN=rr(0,.01)+.001;
	c.acc = rr(.1,.3);
	c.scaleX = c.scaleY = rr(.2,.4) * size;
	c.regX = c.getBounds().width / 2;
	c.regY = c.getBounds().height / 2;
	return c;
}
function stopClouds(){
	gsap.ticker.remove(draw);
}
