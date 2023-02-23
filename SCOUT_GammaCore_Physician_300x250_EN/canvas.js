//global vars
var cjs = createjs;
var circ; 
var circ2; 
var maskCon;
var set = TweenMax.set;
//init
function initCanvas(){
    canvas = document.getElementById("cvs");
    w = canvas.width = 300;
    h = canvas.height = 250;
	stage = new cjs.Stage(canvas);
	var blackbg = new cjs.Shape();
	blackbg.graphics.f("#000000").dr(0, 0, 300, 250);
	//-------------------------
	//circle properties
	circ = new cjs.Bitmap('circ.png'); 
	circ.scaleX = circ.scaleY =.95;
	circ.alpha =.95;
	circ.regX = circ.regY =176/2;
	circ.x = circ.y = -100;
	//circ clone-------------------------
	circ2 = circ.clone();

	//-------------------------
	maskCon = new cjs.Container();
	maskCon.addChild(circ,circ2);
	maskCon.y=-10;
//	maskCon.cache(0,0,w,h)
	maskCon.compositeOperation = 'destination-out';
	stage.addChild(blackbg,maskCon);
}

function drawCirc(){
	stage.update()
//	maskCon.updateCache();
}