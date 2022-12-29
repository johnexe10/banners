(function (){
	var videoIsPlaying = true;
	var track = false;
	var ytp;
	var firstPlay = true;  
	var videoReady = false;
	var player = 
		{
		  'containerId': 'video-player', 
		  'videoId': '1NRizdAZcvg',
		  'videoWidth': 950,
		  'videoHeight': 535,
		  'suggestedQuality': 'medium',
		  'playerVars': 
		  {
			'autoplay': 1, /*With autoplay enabled, the video won't get video views. */
			'rel': 0,
			'showinfo': 0,
			'autohide':2,
			'fs':0,
		  }
		};
    function initYTP(){
		Enabler.loadScript(Enabler.getUrl('https://www.gstatic.com/doubleclick/studio/innovation/h5/ytplayer/ytp_v2.js'), YTFunction);
	}
	//----YouTube Player----
	function YTFunction(){
		// YouTube player properties configuration.

		// Construct the YouTube player variable.
		ytp = new studioinnovation.YTPlayer(player);

		// Bind event listeners.
		bindListeners();
	}

	function YTPlaying(){
		
		if(firstPlay){
			Enabler.counter('YTVideo Play');
		}else{
			Enabler.counter('YTVideo Replay');
			firstPlay = true;
			if(ytp.isMuted){
				ytp.unMute();
			}
		} 
		getYTCurrentTime = function(){
			if(ytp.a.getCurrentTime() >= 11 && !track) {track = true;TweenMax.to('#footer', 0.2, {autoAlpha: 0})} 
		}
		interval(getYTCurrentTime, 1000, 12)
	}

	// YT Player State
	function handleVideoStateChange(stateChangeEvent){

		var playerState = stateChangeEvent.getPlayerState();
		switch(playerState){ 
			case studioinnovation.YTPlayer.Events.PLAYING:
				YTPlaying();          
			break;

			case studioinnovation.YTPlayer.Events.PAUSED:
				Enabler.counter('YTVideo Pause');
				Enabler.stopTimer('YTVideo Timer');
			break;

			case  studioinnovation.YTPlayer.Events.TIMER_START:
				Enabler.startTimer('YTVideo Timer');
			break;

			case  studioinnovation.YTPlayer.Events.TIMER_STOP:
				Enabler.stopTimer('YTVideo Timer');
			break;

			case studioinnovation.YTPlayer.Events.ENDED:
				Enabler.counter('YTVideo Complete');
				Enabler.stopTimer('YTVideo Timer');
				firstPlay = false;
			break;
		}
	}

	function bindListeners(){

		ytp.addEventListener('statechange', handleVideoStateChange, false);

		// YouTube playback quartiles.
		ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_0_PERCENT, function() {
			Enabler.counter('YTVideo Percent 0');
		}, false);

		ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_25_PERCENT, function() {
			Enabler.counter('YTVideo Percent 25');
		}, false);

		ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_50_PERCENT, function() {
			Enabler.counter('YTVideo Percent 50');
		}, false);

		ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_75_PERCENT, function() {
			Enabler.counter('YTVideo Percent 75');
		}, false);

		ytp.addEventListener(studioinnovation.YTPlayer.Events.VIDEO_100_PERCENT, function() {
			Enabler.counter('YTVideo Percent 100');
			
		}, false);
		

		ytp.addEventListener(studioinnovation.YTPlayer.Events.READY, function() {
			TweenMax.set('#skip_button', {opacity:1, display:'block'});
		}, false);
	}
})();
