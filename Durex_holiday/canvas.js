var canvas = document.getElementById("cvs");
//size of banner
var w = canvas.width = 300;
var h = canvas.height = 250;
var ctx = canvas.getContext("2d");
var x=0,y=0;
var particles = [];
var stars = [];
var speed=.3;
var size = '';
var cornerRadius = 10;
var bg = new Image();
bg.src = 'bg.jpg';
function rr(min, max,round) 
{
  var r = (Math.random() * (max - min)) + min;
  if(!round) return r;
  else return Math.floor(r); 
}

for(var i = 0; i < 15; i++)
{
	particles.push(new create_particle());
}

function snowFlakesImg(){
    switch(Math.floor(Math.random() * 3) ){
        case 0:return 's1.png';break;
        case 1:return 's2.png';break;
        case 2:return 's3.png';break;
    }
}
                function create_particle(){
                    this.x = Math.random()*w;
                    this.y = Math.random()*h;
                    this.vx = (Math.random()*speed) * ((Math.random()) > .5 ? 1 : -1);
                    this.vy = (Math.random()*speed) * ((Math.random()) > .5 ? 1 : -1);
                    this.o =rr(.3,.5); 
                    this.s = rr(5,45);
                    this.vs = .1;
                    this.r = 0;
                    this.scale=1;
                    this.vr =rr(.1,1) * ((Math.random()) > .5 ? 1 : -1);
                    this.n = 1;//random scaling of slides
                    this.img = new Image();
                    this.img.src = snowFlakesImg();
                    this.a = .001;
                }

            
                function draw() {

                      ctx.drawImage(bg,0,0);
                    
                    for(var t=0; t<particles.length; t++){
                        var p = particles[t];
                        ctx.save()
                        ctx.translate(p.x,p.y);
                        ctx.rotate(p.r*Math.PI/180);
                        ctx.globalAlpha=p.o;
                        ctx.drawImage(p.img,-(p.s/2),-(p.s/2),p.s,p.s);  
                        ctx.restore();
                        p.r+=p.vr;
                        p.x += p.vx;
                        p.y += p.vy;
                        if(p.x < -p.s) p.x = w+p.s;
                        if(p.y < -p.s) p.y = h+p.s;
                        if(p.x > w+p.s) p.x = -p.s;
                        if(p.y > h+p.s) p.y = -p.s;
                    }
                }

TweenLite.ticker.addEventListener("tick", draw);
//window.addEventListener("resize", function(){
//w = canvas.width = document.body.clientWidth;
//h = canvas.height = document.body.clientHeight;
//  
//}, false);
function killSnow(){
    TweenLite.ticker.removeEventListener("tick", draw);
}