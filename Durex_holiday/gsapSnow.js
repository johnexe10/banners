const
	MAX_FLAKES 			= 20,
	SNOW_CONTAINER_ID 	= 'container-snow',
	SNOW_WIDTH 			= 300,
	SNOW_HEIGHT 		= 250
;

var 
	snowTimelines = [],
	snowDelay = 0 
;

function fillSnow() {	
	
	TweenMax.set("#flake1, #flake2", { x:SNOW_WIDTH, y:SNOW_HEIGHT });

	for(var i = 0; i < MAX_FLAKES; i++) {
		var 
			// Randomly choose and duplicate from snowflakes
			cloneId =  generateRandomBool() ? "flake1" : "flake2",

			newFlake = document.getElementById(cloneId).cloneNode(true),
			newBezier = [],
			newTl = new TimelineMax({repeat:-1}),
			newDuration, newScale, newX, newY, 
			newRotation, newOpacity
		; 

		// Clear ID and style attributes
		newFlake.removeAttribute("id");
		newFlake.removeAttribute("style");

		// Add new flake
		document.getElementById(SNOW_CONTAINER_ID).appendChild(newFlake)

		// Randomly set snowflake animation attributes
		newDuration = generateRandomNum(6, 10);
		newScale = generateRandomNum(4, 20) * .01;
		newX = generateRandomNum(-100, SNOW_WIDTH-100);
		newY = generateRandomNum(-100, SNOW_HEIGHT-80);
		newRotation = generateRandomNum(70, 120) * generateRandomSign();
		newOpacity =  generateRandomNum(65, 90) * .01;
		TweenMax.set(newFlake, {scale:newScale, x:newX, y:newY});

		// Generate bezier
		for (var ii=0; ii<4; ii++) {
			newX += generateRandomNum(20, 40);
			newY += generateRandomNum(30, 65);
			newBezier.push({x:newX, y:newY});
		}

		// Animate bezier
		snowDelay += generateRandomNum(15,50) * .01;
		newTl
			.delay( snowDelay )
			.fromTo(newFlake, 2, 		{opacity:0}, {opacity:newOpacity}					,"start")
			.to(newFlake, newDuration, 	{bezier:{values:newBezier}, ease:Power0.easeNone}	,"start")
			.to(newFlake, newDuration, 	{rotation:newRotation, ease:Power0.easeNone}		,"start")
			.to(newFlake, 1, 			{opacity:0}											,"-=1.5")
		;
		

	}
	

}

// Kill timelines
function killSnow() {
	snowTimelines.forEach(function myFunction(item, index) {
		item.kill();
	});
}

// Create psudo-random number between two inputs
function generateRandomNum(min,max) {
	return Math.random()*(max-min+1)+min;
}
// Returns -1 or 1
function generateRandomSign() {
	return Math.random() < 0.5 ? -1 : 1;				
}
// Returns true or false
function generateRandomBool() {
	return Math.random() < 0.5;				
}
