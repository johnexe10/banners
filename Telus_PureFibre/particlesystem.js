//create smoke particles
function createSmoke(n,b){
    var that = this;
    this.container = new cjs.Container();
    this.smokeimg = new Image()
    this.smokeimg.src = "smoke.png";
    this.smokeimg.onload = function(){
        for(var i=0;i<n;i++){
            smokes.push(new smokeclass(that.container,that.smokeimg,b))
        } 
    }
}

//smoke constructor
function smokeclass(container,smokeimg,bounds){
    var s = this.smoke;
    s = new cjs.Bitmap(smokeimg);
    s.regX = s.regY = 20;
    s.size = rr(1,5);
    s.x = rr(bounds.a,bounds.b)
    s.y = rr(bounds.c,bounds.d);
    s.velX = rr(-.3,.3);
    s.velY = rr(-.6,.6);
    s.scaleX = s.scaleY = s.size;
    s.alpha = .05;
    s.rs = Math.random()*.3; // rotation speed
    s.rotation = Math.random()*360; //start rotation
	s.compositeOperation = 'lighter';
    container.addChild(s);
    this.move = function(ctr){
		s.x += s.velX;
        s.y += s.velY;
        s.rotation +=s.rs;
        if(s.x<bounds.a){s.velX*=-1;}
        if(s.x > bounds.b-20){s.velX*=-1;}
        if(s.y<bounds.c-20){s.velY*=-1;}
        if(s.y > bounds.d-20){s.velY*=-1;}
    }
}
//create circle particle
function createCircle(n,max,min,b){
	var that = this;
    this.container = new cjs.Container();
    this.circimg = new Image();
    this.circimg.src = "circle.png";
    this.circimg.onload = function(){
        for(var i=0;i<n;i++){
            circle.push(new circleclass(that.container,that.circimg,max,min,b))
        } 
    }
}
//magic circle constructor
function circleclass(container,img,max,min,bounds){
	var s = this.circle;
	s = new cjs.Bitmap(img);
    s.regX = s.regY = 25;
    s.scale = rr(min,max);
	s.delta = rr(.001,.01);
	s.adelta = rr(.001,.01);
	s.alpha = .7;
	s.scaleX = s.scaleY = s.scale;
	s.x = rr(bounds.a,bounds.b)
    s.y = rr(bounds.c,bounds.d);
	s.velX = rr(-.2,.2);
    s.velY = rr(-.2,.2);
	s.life = 1;
	s.rs = Math.random()*.3; // rotation speed
	s.rotation = Math.random()*360; // rotation start
    container.addChild(s);
	this.move = function(){
        s.x += s.velX;
        s.y += s.velY;
		s.rotation +=s.rs;
		s.scale += s.delta;
		s.scaleX = s.scaleY = s.scale;
		s.alpha += s.adelta;
		if (s.scale <min || s.scale > max) s.delta = -s.delta;
		if (s.alpha <.6 || s.alpha > .9) s.adelta = -s.adelta;
        if(s.x<bounds.a){s.velX*=-1;}
        if(s.x > bounds.b){s.velX*=-1;}
        if(s.y<bounds.c){s.velY*=-1;}
        if(s.y > bounds.d){s.velY*=-1;}
  	}
}