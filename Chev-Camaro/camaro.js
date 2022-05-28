function camarojs(){
    var cjs = createjs;
    var camaro_cvs = _('#camaro').c,
        main_stage = new cjs.Stage("camaro"),
        w = camaro_cvs.width = 300,
        h = camaro_cvs.height = 250,
        cx = w/2,
        cy = h/2;
    
    var camaro = {};
    var smokeDestroy = true;
    var smokeBurstDestroy = false;
    camaro.smokeArray = new Array();
    camaro.smokeArrayBurst = new Array();
    camaro.smokeTimer = 0;
    camaro.smokeTimer2 = 0;
    camaro.smokeBurst = new cjs.Bitmap();
    //draw bg in mainstage
    camaro.bg = new cjs.Bitmap('bg.jpg');
    main_stage.addChild(camaro.bg)
    //draw car in mainstage
    drawCar(300,250)
    camaro.car = new cjs.Bitmap(camaro.car_pic);
    camaro.car.x = cx;
    camaro.car.y = cy;
    camaro.car.regX = 150;
    camaro.car.regY = 250/2;
    main_stage.addChild(camaro.car)
    

    

    tl
    .add(function(){smokeDestroy=false},'+=.3')
    .add(function(){smokeDestroy=true},'+=.3')
    .add(function(){smokeDestroy=false},'+=.3')
    .add(function(){smokeDestroy=true},'+=.3')
    .add(function(){smokeDestroy=false},'+=.3')
    .to(camaro.car,1.5,{scaleX:.5,scaleY:.5,y:'-=20',ease:Power4.easeInOut})
    .add(addSmokeJS,'burst-=1.5')
    .add(addSmokeBurst,'burst-=1.5')
    .add(function(){smokeBurstDestroy = true;},'-=.5')
    .add(function(){frame2.play();})
    .add(function(){ 
        smokeDestroy = true;
        camaro.destroy_car=true;
        main_stage.isDestroy=true;
    },'+=.5')
    
    TweenLite.ticker.addEventListener('tick',function(){
        if(!main_stage.isDestroy){
            main_stage.update()
        }
        
    })
   
    function addSmokeJS(){
        var smoke = new Smoke('smoke-b.png',300,250,{x : 300*.5, y : 250*.75},100);
        smoke.start(true);
        smoke.setWind(0);
        camaro.smoke2 = new cjs.Bitmap(smoke.canvas);
        main_stage.addChild(camaro.smoke2)
        TweenLite.delayedCall(3,function(){
            smoke.stop()
        });
    }
    
    function drawCar(w,h){
        var nCanvas = document.createElement("canvas");	
        nCanvas.width = w;
        nCanvas.height = h;
        var stage = new cjs.Stage(nCanvas);
        var car = new cjs.Bitmap('camaro.png');
        car.x = 62;
        car.y = 93;
        car.dx = car.x;
        car.dy = car.y;
        stage.addChild(car)
        
        addSmoke()
        camaro.smoke = new cjs.Bitmap(camaro.smoke_pic);
        stage.addChild(camaro.smoke)
        TweenLite.ticker.addEventListener('tick',function(){
            if(!camaro.destroy_car){
                TweenMax.set(car,{x:car.dx + Math.random()*1.5})
                stage.update();  
            }
        })
        
        camaro.car_pic = nCanvas;
    }
    
   

    

    
           
    function addSmoke(){
        var nCanvas = document.createElement("canvas");	
        var nW = nCanvas.width = w;
        var nH = nCanvas.height = h;		
	    var ctx = nCanvas.getContext('2d');
        var smoke = new Image();
        smoke.src = 'smoke-w.png';

        TweenLite.ticker.addEventListener('tick',function(){
            ctx.clearRect(0,0,nW,nH)
            camaro.smokeTimer++;
            if(smokeDestroy == false){
                if(camaro.smokeTimer%4==0){
                    addExhaustSmoke(95,192,'left');
                    camaro.smokeTimer = 0;
                }
                if(camaro.smokeTimer==2){
                    addExhaustSmoke(204,192,'right');
                }
            }
            for(var i=0;i<camaro.smokeArray.length;i++){
                var s = camaro.smokeArray[i]; // smokeparticle
                s.y -= Math.random()*-2;
                s.x -= (s.dir=='left') ? s.scale : -s.scale;
                s.scale += (s.fScale-s.scale)/5;
                s.alpha -= 0.02;
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.scale(s.scale,s.scale);
                ctx.rotate(s.rotate);
                ctx.globalAlpha = s.alpha*s.alpha;
                ctx.drawImage(smoke,-20,-20);
                ctx.restore();		
                if(s.alpha<0.1)
                {
                    camaro.smokeArray.splice(i,1);
                    i--;
                }
            }
        })
        camaro.smoke_pic = nCanvas;
        function addExhaustSmoke(x,y,direction){
            var obj = {};
            obj.x = x;
            obj.y = y;
            obj.dir = direction;
            obj.scale = 0.1;
            obj.fScale = Math.random()*0.8+0.4;
            obj.alpha = 0.8;
            obj.rotate = Math.random()*50;
            camaro.smokeArray.push(obj);
        }
    
    }
    function addSmokeBurst(){
        smokeBurst()
        camaro.smokeBurst = new cjs.Bitmap(camaro.smokeBurst_pic);
        TweenLite.to(camaro.smokeBurst,1,{y:'-=40',delay:.4})
        main_stage.addChild(camaro.smokeBurst)
    }
    function smokeBurst(){
        var nCanvas = document.createElement("canvas");	
        var nW = nCanvas.width = w;
        var nH = nCanvas.height = h;		
	    var ctx = nCanvas.getContext('2d');
        var smoke = new Image();
        smoke.src = 'smoke-b.png';

        TweenLite.ticker.addEventListener('tick',function(){
            ctx.clearRect(0,0,nW,nH)
            camaro.smokeTimer2++;
            if(smokeBurstDestroy == false){
                if(camaro.smokeTimer2%4==0){
                    addExhaustSmokeBurst(95,192,'left');
                    camaro.smokeTimer2 = 0;
                }
                if(camaro.smokeTimer2==2){
                    addExhaustSmokeBurst(204,192,'right');
                }
            }else{
            }
            for(var i=0;i<camaro.smokeArrayBurst.length;i++){
                var s = camaro.smokeArrayBurst[i]; // smokeparticle
                s.y -= Math.random()*1;
                s.x -= (s.dir=='left') ? Math.random()*1: Math.random()*-1;
                s.scale += (s.fScale-s.scale)/20;
                s.alpha -= 0.005;
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.scale(s.scale,s.scale);
                ctx.rotate(s.rotate);
                ctx.globalAlpha = s.alpha*s.alpha;
                ctx.drawImage(smoke,-20,-20);
                ctx.restore();		
                if(s.alpha<0.01){
                    camaro.smokeArrayBurst.splice(i,1);
                    i--;
                }
            } 
        })
        
        camaro.smokeBurst_pic = nCanvas;
        function addExhaustSmokeBurst(x,y,direction){
            var obj = {};
            obj.x = x + Math.random() * 2;
            obj.y = y + Math.random() * 2;
            obj.dir = direction;
            obj.scale = 1;
            obj.fScale = Math.random()* 2.5;
            obj.alpha = .5;
            obj.rotate = Math.random()* 50;
            camaro.smokeArrayBurst.push(obj);
        }
        
    }
}



