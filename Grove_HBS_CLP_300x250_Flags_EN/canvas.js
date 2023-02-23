var pattern = new Image();
pattern.src = "flag.png";
var ph = pattern.height;
var i = 1;
var timer;
    
function initCanvas() {
    timer = setInterval(drawShape, 5);
}
         
function drawShape() {
       var canvas = document.getElementById('cvs');
       var ctx = canvas.getContext('2d',{antialias: false});

       var w = pattern.width;
       var h = pattern.height;
       ctx.clearRect(0, 0, 300, 250);
       ph <= 0 ? ph = h : ph -= 0.2 ;

       for(var x = 195; x < w; x++) {
		   if(x>=230){var y = 2 * Math.sin((x + ph)/5);}
		   else if(x>=225){ var y = 2.4 * Math.sin((x + ph)/5);}
		   else if(x>=208){ var y = 2.0 * Math.sin((x + ph)/5);}  
//		   else if(x>=206){ var y = 1.6 * Math.sin((x + ph)/5);}  
//		   else if(x>=204){ var y = 1.2 * Math.sin((x + ph)/5);}  
//		   else if(x>=202){ var y = 0.8 * Math.sin((x + ph)/5);}
//		   else if(x>=200){ var y = 0.4 * Math.sin((x + ph)/5);}
//		   else if(x>=198){ var y = 0.0 * Math.sin((x + ph)/5);}
           ctx.drawImage(pattern, x, 0, 1, h, x, y, 1, h);
       }    
}

function stopAnim() {
    clearInterval(timer)
}


