// vars
var set = TweenMax.set;
var cjs = createjs;
var emberArr=[];
var fireArr=[];
var smokeArr=[];
// settings
var speed = 2;
var size = 3; 
var num = 2;
var stage,stage2,canvas,canvas2;
var container = new cjs.Container();
var container2 = new cjs.Container();
// utils
function rr(min, max) {
	if (max == null) { max = min; min = 0; }
	if (min > max) { var tmp = min; min = max; max = tmp; }
	return min + (max - min) * Math.random();
}
// init
function initCanvas(){
    canvas = document.getElementById("cvs");
    w = canvas.width = 600;
    h = canvas.height = 500;
	stage = new cjs.Stage(canvas);
	stage.addChild(container)

    canvas2 = document.getElementById("cvs2");
    w = canvas2.width = 600;
    h = canvas2.height = 500;
	stage2 = new cjs.Stage(canvas2);
	stage2.addChild(container2)
	gsap.ticker.fps(60)
	gsap.ticker.add(draw);
	for(var i=0;i<=200;i++){
		draw()
	}
}


var ctr=0;
function draw(){
	ctr++;
	
	for(var i=0;i<=num;i++){
		if(ctr%15==0){
			emberArr.push(new particle_ember(rr(0,600),rr(450,550)))
		}
	}
	for(var i=emberArr.length-1;i>=0;i--){
		var e = emberArr[i];
		container.addChild(e.shape)
		e.shape.x += e.velX;
		e.shape.y += e.velY;
		e.velX *= e.drag;
		e.velY *= e.drag;
		e.angle += rr( -0.3, 0.3 ) * e.wander
		e.velX += Math.sin( e.angle ) * 0.1;
		e.velY -= .2;
		if(e.shape.y<200){e.shape.alpha-=.01;}
		if(e.shape.y<0){
			emberArr.splice(i,1)
			container.children.splice(i,1)
		}
	} 
	//fire 1
	if(ctr%4==0){
		fireArr.push(new particle_fire(rr(480,480),140))
	}
	if(ctr%4==0){
		smokeArr.push(new particle_smoke(480,120))
	}
	//fire 2
	if(ctr%1==0){
		fireArr.push(new particle_fire(rr(330,400),270))
	}
	if(ctr%3==0){
		smokeArr.push(new particle_smoke(rr(330,400),250))
	}
	//fire 3
	for(var i=0;i<=2;i++){
		fireArr.push(new particle_fire(rr(130,200),rr(280,400)))
		smokeArr.push(new particle_smoke(rr(130,200),rr(270,380)))
	}

	//fire 4
	if(ctr%3==0){
		fireArr.push(new particle_fire(rr(460,530),370))
	}
	if(ctr%2==0){
		smokeArr.push(new particle_smoke(rr(460,530),370))
	}
	for(var i=smokeArr.length-1;i>=0;i--){
		var s = smokeArr[i];
		container2.addChild(s)
		s.x += s.velX;
		s.y += s.velY;
		s.velX += .1/100;
		s.velY -= .1/20;
		s.alpha-=.004;
		if(s.alpha<0){
			smokeArr.splice(i,1)
			container2.children.splice(i,1)
		}
	} 
	//fire

	//fire

	//fire



	for(var i=fireArr.length-1;i>=0;i--){
		var f = fireArr[i];
		container2.addChild(f)
		f.x += f.velX;
		f.y += f.velY;
		f.velX += .1/100;
		f.velY -= .1/20;
		f.alpha-=.008;
		if(f.alpha<0){
			fireArr.splice(i,1)
			container2.children.splice(i,1)
		}
	} 

	stage.update();
	stage2.update();
}
function particle_ember(x,y){
	var obj = {};   
	obj.shape = new createjs.Shape();
    obj.shape.graphics.f((Math.random()>.5) ? "#ff9f42" : "#ff7f42").dc(0, 0, 1);
	obj.angle = rr(Math.PI*2) /2;
	obj.force = rr(1,5);
	obj.shape.scaleX = rr(0.1, 5)
	obj.shape.scaleY = rr(0.1, 2)
	obj.drag = rr(0.8, 0.9);
	obj.shape.x = x;
	obj.shape.y = y;
	obj.velX = Math.sin(obj.angle) * obj.force;
	obj.velY = Math.cos(obj.angle) * obj.force; 
	obj.shape.rotation =  rr(0,360);   
    obj.drag = rr(0.82, 0.97);
	obj.wander = rr( 0.5, 1 ) 

	return obj;
}
function particle_smoke(x,y){
	var obj = {};   
	obj = new cjs.Bitmap('smoke.png');
	obj.x = x;
	obj.y = y;
	obj.alpha=rr(.5,.8)
	obj.velX = rr(-.1,.1);
	obj.velY = rr(.1);
	obj.rotation =  Math.random()*5;
	obj.scale =  rr(.1, 1);
	obj.scaleX = obj.scaleY = obj.scale;
	return obj;
}
function particle_fire(x,y){
	var obj = {};   
	obj = new cjs.Bitmap('fire.png');
	obj.x = x;
	obj.y = y;
	obj.alpha=rr(.5,.8)
	obj.velX = rr(-.1,.1);
	obj.velY = rr(-.1);
	obj.rotation =  Math.random()*5;
	obj.scale =  rr(.5, 2);
	obj.scaleX = obj.scaleY = obj.scale;
	return obj;
}



function p_stop(){
	gsap.ticker.remove(draw);
}
