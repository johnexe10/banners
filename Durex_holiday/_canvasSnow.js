var stopSnow = false;
function snow(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
    var frameCount = 0;
    var fps, fpsInterval, startTime, now, then, elapsed;

    startAnimating(60);

    function startAnimating(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        draw();
    }

	//canvas dimensions
	var W = 300;
	var H = 250;
	canvas.width = 300;
	canvas.height = 250;
	
	//snowflake particles
	var mp = 100; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*1.5, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
        if (stopSnow) {
            return;
        }
        requestAnimationFrame(draw);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "rgba(255, 255, 255,0.5)";
            ctx.beginPath();
            for(var i = 0; i < mp; i++)
            {
                var p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            }
            ctx.fill();
            update();
        }
	}
	ctx.fillRect(0,0,W,H)
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	var dirX = 8;
	function update()
	{
		angle += 0.0001;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1.5+ p.r/1.5;
			p.x += Math.abs(Math.sin(dirX)+0.5);
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	

}




