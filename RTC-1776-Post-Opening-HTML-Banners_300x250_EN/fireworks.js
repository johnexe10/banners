window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame =
window.requestAnimationFrame       ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame    ||
window.oRequestAnimationFrame      ||
window.msRequestAnimationFrame     ||
function (callback) {
    window.setTimeout(callback, 1000/60);
};

var canvas, ctx, w, h, particles = [], probability = 0.04,
    xPoint, yPoint, bg_image;





function onLoad() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();

    for(var i=0;i<=100;i++){
        makebg() //frameskip100
    }

    gsap.delayedCall(2000,createFirework)
    gsap.ticker.add(updateWorld);
    gsap.ticker.fps(30)
}

function resizeCanvas() {
    if (!!canvas) {
        w = canvas.width = 600;
        h = canvas.height = 500;
    }
}
var ctr = 0;
function updateWorld() {
    ctr++;
    makebg();
    paint();
    update();
}

function update() {
    var alive = [];
    for (var i=0; i<particles.length; i++) {
        if (particles[i].move()) {
            alive.push(particles[i]);
        }
    }
    particles = alive;
}
function makebg(){
    ctx.globalCompositeOperation = 'source-over';
    bg_image = new Image()
    bg_image.src = 'bg.jpg';
    bg_image.onload = function(){
        ctx.drawImage(bg_image, 0, 0);
    }
    ctx.globalAlpha = 0.2;
}
function paint() {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var i=0; i<particles.length; i++) {
        particles[i].draw(ctx);
    }
    ctx.restore();
}

function createFirework() {
    xPoint = 300;
    yPoint = 150;
    var nFire = 500;
    var c = "#FF0000";
    for (var i=0; i<nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        var vy = Math.sqrt(9-particle.vx*particle.vx);
        if (Math.abs(particle.vy) > vy) {
            particle.vy = particle.vy>0 ? vy: -vy;
        }
        particles.push(particle);
    }
}

function Particle() {
    this.w = this.h = Math.random()*2+2;
    this.x = xPoint-this.w/2;
    this.y = yPoint-this.h/2;
    this.vx = (Math.random()-0.5)*6;
    this.vy = (Math.random()-0.5)*6;
    this.alpha = Math.random()*.5+.5;
    this.color;
}

Particle.prototype = {
    gravity: 0.02,
    move: function () {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.008;
        if (this.x <= -this.w || this.x >= w ||
            this.y >= h ||
            this.alpha <= 0) {
                return false;
        }
        return true;
    },
    draw: function (c) {
        c.save();
        c.beginPath();

        c.translate(this.x+this.w/2, this.y+this.h/2);
        c.arc(0, 0, this.w, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;

        c.closePath();
        c.fill();
        c.restore();
    }
}
