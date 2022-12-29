'use strict';
var canvas,ctx,width,height,
  collection = [],
  num_drops = 150, // number of drops
  gravity = .9, // gravity multiplier 
  windforce = 0.5, // yea i'd just leave this
  windmultiplier = 0.01, // this freaks out on large numbers
  maxspeed = 2, // this is so you never run too fast (it is a multiplier not raw)
  gutter = 0.001; // the percentage distance to travel off screen before wrapping

function Drop() {
  this.x;
  this.y;
  this.radius;
  this.distance;
  this.color;
  this.speed;
  this.vx;
  this.vy;
}
Drop.prototype = {
  constructor: Drop,
  
  random_x: function() {
    var n = width * (1 + gutter);
    return (1 - (1 + gutter)) + (Math.random() * n);
  },
  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }
};

function draw_frame() {
  // this was recommended (see comments)
  // check it out, just comment out the 
  // ctx.clearRect(0, 0, width, height);
  // line and uncomment the three below:

  //ctx.globalCompositeOperation="darker";
  //ctx.fillStyle="rgba(0,0,0,0.5)";
  //ctx.fillRect(0,0,width,height);  
  ctx.clearRect(0, 0, width, height);
  
  // in a previous attempt I even go as far
  // as to ensure i'm drawing the furthest particles 
  // first for the z-index overlay.
  // in this run I felt it was unneeded
  collection.forEach(function (drop) {
    // costly but ultimatly I think it's worth it for now
    // I muck with the opacity to help with the illusion of depth
    ctx.globalAlpha = (drop.distance + 1) / 10; 
    drop.draw(ctx);
    ctx.globalAlpha = 1;
    drop.x += drop.vx;
    drop.y += drop.vy;
    var lx = drop.vx + windforce;
    lx < maxspeed && lx > 1 - maxspeed && (drop.vx = lx);
    if (drop.y > (drop.distance + 1) / 10 * height) {
      drop.y = Math.random() * -drop.radius * (num_drops / 10);
      drop.x = drop.random_x();
    }
    if (drop.x > width * (1 + gutter)) {
      drop.x = 1 - (width * gutter);
    }
    if (drop.x < 1 - (width * gutter)) {
      drop.x = width * (1 + gutter);
    }
  });
}

function animate() {
  draw_frame();
}

function windtimer() {
  // this is a super cheap way to do this,
  // i will need to look into how to properly 
  // emulate wind
  windforce = Math.random() > 0.5 ? windmultiplier : -windmultiplier;
  setTimeout(windtimer, Math.random() * (1000 * 10));
}

function init(cvs,w,h) {
  canvas = cvs;
  ctx = canvas.getContext('2d');
  width = canvas.width = w;
  height = canvas.height = h;
  wind_dust()
}
function wind_dust(){
  collection = [];
  while (num_drops--) {
    var drop = new Drop(); // todo: make constructor do this shit
    drop.color = Math.random() > 0.5 ? "#8e6161" : "#af4242";
    drop.distance = Math.random() * 10 | 0;
    drop.speed = Math.random() * (drop.distance / 10) + gravity;
    drop.vx = 0;
    drop.vy = Math.random() * drop.speed + (drop.speed / 2);
    drop.radius =  Math.random() * 1.1; 
    drop.x = drop.random_x();
    drop.y = Math.random() * height;
    collection.push(drop);
  }
  windtimer();
  TweenLite.ticker.addEventListener("tick", animate);
}
