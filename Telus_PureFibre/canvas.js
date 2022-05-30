//utils
function rr(min, max) {
    return Math.random() * (max - min) + min;
}
//global vars
var canvas;
var stage;
var cjs = createjs;
var w,h;
var smokes = [];
var circle = [];
var circimg;
//fibers
var fiber1;
var fiber2;
var fiber3;
var fiber4;
//containers
var circles,circles2,smoke;
//bools
var firstFrame = false;
var _bot={};
var _top={};
//
var fbrCont;
var fbrCont2;
function initCanvas(){
    canvas = document.getElementById("bg");
    w = canvas.width = 300;
    h = canvas.height = 250;
    stage = new cjs.Stage(canvas);
    
    var boundsTop={a:200,b:300,c:0,d:80};
    _top = { // _top particles
          c: new cjs.Container(),
          smoke: new createSmoke(6,boundsTop),
          circles:new createCircle(120,.1,.01,boundsTop),
          circles2:new createCircle(7,1,.2,boundsTop)
    } 
    _top.c.addChild(
        _top.smoke.container,
        _top.circles.container,
        _top.circles2.container
    )
  var boundsBot={a:0,b:100,c:170,d:250};
    _bot = { // _bottom particles
          c: new cjs.Container(),
          smoke: new createSmoke(6,boundsBot),
          circles:new createCircle(120,.1,.01,boundsBot),
          circles2:new createCircle(7,1,.2,boundsBot)
    } 
    _bot.c.addChild(
        _bot.smoke.container,
        _bot.circles.container,
        _bot.circles2.container
    )
	fiberMasking()
    stage.addChild(
        fbrCont,
        _bot.c,
        _top.c,
    );
    TweenLite.ticker.addEventListener('tick',draw)
}


function fiberMasking(){
    //fiberimg ,svg path id , size of mask circle
	fiber1 = new createmask('fbr1_1.png',fb1,.3); 
	fiber2 = new createmask('fbr1_2.png',fb2,.45); 
	fiber3 = new createmask('fbr1_3.png',fb3,.45); 
	fiber4 = new createmask('fbr1_4.png',fb4,.45); 
    
    fbrCont = new cjs.Container();
    fbrCont.regX = w/2;
    fbrCont.regY = h/2;
    fbrCont.scaleX = -.5;
    fbrCont.scaleY = .5;
    fbrCont.x = 70;
    fbrCont.y = 220;
	fbrCont.addChild(fiber1.maskCont,fiber2.maskCont,fiber3.maskCont,fiber4.maskCont);
}
//mask constructor
function createmask(fbrImg,path,size){
    var that = this;
    this.container = new cjs.Container();
    this.mask = new createjs.Shape();
    this.mask.graphics.f("#000").dc(0,0,80);
    this.blur = new createjs.BlurFilter(20, 20, 5);
    this.mask.filters = [this.blur];
    this.b = this.blur.getBounds();
    this.mask.cache(-80+this.b.x, -80+this.b.y, 160+this.b.width, 160+this.b.height);
    this.scale = size;
    this.mask.scaleX = this.scale;
    this.mask.scaleY = this.scale; 
    this.path = path;
    this.container.addChild(this.mask);
    this.container.cache(0,0,w,h)
    this.container.compositeOperation = 'destination-in';
    this.fbrImg = new cjs.Bitmap(fbrImg);
    this.maskCont = new cjs.Container();
	this.maskCont.addChild(this.fbrImg,this.container)
	this.maskCont.cache(0,0,w,h);
    this.draw = function(){
        that.container.updateCache('source-overlay')
        that.maskCont.updateCache()
    }
}
function tweenFiber1Out(){
    fbrCont.cache(0,0,w,h);
    TweenLite.to(fbrCont,.7,{alpha:0,ease:Power4.easeOut,onComplete:function(){
        stage.removeChild(fbrCont)
    }})
    	
}
function clearScene1(){
    smokes = [];
    circle = [];
    _top.smoke.container.removeAllChildren ()
    _top.circles.container.removeAllChildren ()
    _top.circles2.container.removeAllChildren ()
    _bot.smoke.container.removeAllChildren ()
    _bot.circles.container.removeAllChildren ()
    _bot.circles2.container.removeAllChildren ()
    stage.removeChild(_bot.c,_top.c)
}
function createEndFrame(){
    var bounds={a:200,b:300,c:0,d:80};
    //smoke
    var smoke = new createSmoke(5,bounds);
	//circle
	var circles = new createCircle(150,.1,.01,bounds);
	var circles2 = new createCircle(8,1,.2,bounds);

//  create smoke on text

	var txtBounds = {a:0,b:100,c:170,d:250};
	var smoke_txt = new createSmoke(8,txtBounds);
	var circles_txt = new createCircle(150,.1,.01,txtBounds);
	var circles2_txt = new createCircle(5,1,.2,txtBounds);

    TweenLite.from(smoke.container,1,{alpha:0,delay:.5})
    TweenLite.from(circles.container,1,{alpha:0,delay:.5})
    TweenLite.from(circles2.container,1,{alpha:0,delay:.5})
    TweenLite.from(smoke_txt.container,1,{alpha:0,delay:1.5})
    TweenLite.from(circles_txt.container,1,{alpha:0,delay:1.5})
    TweenLite.from(circles2_txt.container,1,{alpha:0,delay:1.5})
	
    stage.addChild(
        smoke.container,
        circles.container,
        circles2.container,

		smoke_txt.container,
		circles_txt.container,
		circles2_txt.container
    )
}

function draw(){
    for(var i=0;i<smokes.length;i++){
      	smokes[i].move()
    }
	for(var i=circle.length-1; i>=0; i--){
		circle[i].move()
	}
    stage.update()
}

function removeCanvas(){
    TweenLite.ticker.removeEventListener('tick',draw)
}