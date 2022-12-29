// module aliases
var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites;
    Composite = Matter.Composite;
// create an engine
var engine = Engine.create(),
    world = engine.world;

// create a renderer
var render = Render.create({
    element: document.getElementById("matter-cont"),
    engine: engine,
    options: {
        width: 300,
        height: 250,
        pixelRatio:2,
        background: 'transparent',
        wireframeBackground: 'transparent',
        wireframes:false
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var offset = 10,
    options = { 
        
    };

world.bodies = [];

// these static floor
Composite.add(world,  Bodies.rectangle(150, 247 ,300,20, {isStatic:true,render:{fillStyle:'transparent'}}))
// Composite.add(world,  Bodies.rectangle(380, 300 ,20,600, {isStatic:true,render:{fillStyle:'red'}}))
//=-------------
var circle = Bodies.circle(145,223,13.5, {isStatic:true,render:{fillStyle:'#306874'}});
Composite.add(world,circle);
//=-------------
var board = Bodies.rectangle(140, 208, 190, 4, {
    isStatic:true,
    angle:0,
    restitution:0.7,
    render: {
        sprite: {
            texture: 'board.png',
            xScale:.5,
            yScale:.5
        }
    }
});
board.friction = .5;
Composite.add(world,board);
//=-------------
var levels = 4;
var sheepW = 40;
var sheepH = 26;
var sheepArr = [];
for (var row = 0; row < levels; row++) {
    for (var i = 0; i < row+1; i++) {
        x=((sheepW / 2) + ((row-i*.6) * sheepW));
        sheepArr.push(Bodies.rectangle(225-x, 192-sheepH*i, 32, 25, {
            isStatic:false,
            friction:1,
            render: {
                sprite: {
                    texture: 'sheep-min.png',
                    xScale:.5,
                    yScale:.5
                }
            }
        }))
    }
}
Composite.add(world,sheepArr)

function stopSheep(bool){
    for(var b = 0; b<sheepArr.length; b++){
        sheepArr[b].isStatic = bool;
    }
}

var b={angle:0,x:0,y:0}
var ctr = 0;
//set first
// gsap.to(b,{duration:1,angle:-0.1,ease:'power1.inOut',onUpdate:updateAngle})

var mainTL = gsap.timeline({paused:true});
var swingTL = gsap.timeline({yoyo:true,repeat:1});
swingTL
.to(b,{duration:.8,angle:0.2,ease:'power1.inOut',onUpdate:updateAngle})
.to(b,{duration:1,angle:-0.15,ease:'power1.inOut',onUpdate:updateAngle})

mainTL
.add(swingTL)
.to(b,{duration:.8,angle:-0.01,ease:'power1.inOut',onUpdate:updateAngle},'-=.6')
.to(b,{duration:.3,angle:.3,overwrite:'auto',ease:'power1.inOut',onUpdate:updateAngle})
.add(()=>{
    sheepRestitution(1,.2)
    engine.world.gravity.x = 1; 
    engine.world.gravity.y = 1; 
    board.friction = 0.5;
},'-=.35')
.to(b,{duration:1,angle:-0.1,delay:1,ease:'power1.inOut',onUpdate:updateAngle})
.to(b,{duration:1.6,angle:.25,overwrite:'auto',ease:'power2.inOut',onUpdate:updateAngle})


function pauseSheepAnim(){
    mainTL.pause()
    stopSheep(true)
}
function playSheepAnim(){
    mainTL.play()
    stopSheep(false)
}
function updateAngle(){
    Matter.Body.set(board, "angle", b.angle)
}

function sheepRestitution(n,f){
    for(var b = 0; b<sheepArr.length; b++){
        sheepArr[b].restitution = n;
        sheepArr[b].friction = f;
    }
}