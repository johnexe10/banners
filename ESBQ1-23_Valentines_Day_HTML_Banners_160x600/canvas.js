// vars
var set = TweenMax.set;
var cjs = createjs;
var particle=[];
var containerclouds;
var stage;
// settings
var speed = .2;
var size =1; 
var num = 120;
var imgArr = ['p1.png','p2.png']
// utils
function rr(min, max){
	var r = (Math.random() * (max - min)) + min;
    return r;
}
// init
function initCanvas(){
    canvas = document.getElementById("cvs");
    w = canvas.width = 160;
    h = canvas.height = 600;
	stage = new cjs.Stage(canvas);
    containerclouds = new cjs.Container();
	for(var i=0;i<=num;i++){particle.push(new clouds(rr(0,w),rr(0,110)))}
	gsap.ticker.add(draw);
	gsap.ticker.fps(60);
	var gradient = new cjs.Bitmap('gradient.png');
	stage.addChild(containerclouds,gradient)
}
function draw(){
	for(var i=particle.length-1;i>=0;i--){
		c=particle[i];
		containerclouds.addChild(c)
		c.angle+=c.rand;
		c.x+=c.rad*Math.sin(c.angle);
		c.y+=c.rad*Math.cos(c.angle);
		c.alpha+=c.aN;
		if(c.alpha > .5|| c.alpha <.01){
			c.aN*=-1;
		}
	} 
	stage.update();
}
function clouds(x,y){
	var c = this.img = new cjs.Bitmap((Math.random() > .5 ? imgArr[0] : imgArr[1] ));
	c.x = x;
	c.y = y;
	c.compositeOperation = 'lighter';
	c.angle=rr(1,5);
	c.rad = rr(0,.05);
	c.rand = rr(.01,.08);
	c.alpha = rr(0.05,.5);
	c.aN=rr(0.005,.025)+.001;
	c.acc = rr(.1,.3);
	c.scaleX = c.scaleY = rr(.2,.3) * size;
	c.regX = c.getBounds().width / 2;
	c.regY = c.getBounds().height / 2;
	return c;
}
function stopParticles(){
	gsap.ticker.remove(draw);
}
