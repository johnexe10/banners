'use strict';
function scrollBg(){
    var _ = function(o){return document.querySelector(o);}
    var s = this;
    return {
        init:function(width,height,speed,el,src){
          s.cvs = document.createElement('canvas');
          s.ctx = s.cvs.getContext("2d");
          s.w = s.ctx.canvas.width = width; 
          s.h = s.ctx.canvas.height = height; 
          s.speed=speed;
          s.scrollImg = new Image();
          s.scrollImg.src = src;
          s.scrollVal=0;
          _('#'+el).appendChild(s.cvs);
        },
        render:function(){
          s.ctx.clearRect(0,0,s.w,s.h);
          if(s.scrollVal >= s.w){s.scrollVal = 0;}
          s.scrollVal+=s.speed;         
          s.ctx.drawImage(s.scrollImg,s.w-s.scrollVal,0,s.scrollVal,s.h, 0, 0, s.scrollVal,s.h);
          s.ctx.drawImage(s.scrollImg,s.scrollVal,0,s.w, s.h);
        }
    }
}