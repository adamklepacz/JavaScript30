( function () {
	/* get external scripts */
	// add script tag to HTML document of external js file
	function addJavascript(jsname,pos) {
		var th = document.getElementsByTagName(pos)[0],
				s = document.createElement('script');
		s.setAttribute('type','text/javascript');
		s.setAttribute('src',jsname);
		th.appendChild(s);
	}

	addJavascript('screenfull.js', 'body');

	/* get elements */
	const player = document.querySelector('.player');
	const video = player.querySelector('.viewer');
	const progress = player.querySelector('.progress');
	const progressBar = player.querySelector('.progress__filled');
	const toggle = player.querySelector('.toggle');
	const skipButtons = player.querySelectorAll('[data-skip]');
	const ranges = player.querySelectorAll('.player__slider');
	const fullscreen = player.querySelector('.fullscreen');

	/* build functions */
	// fullscreen function 
	document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

	function requestFullscreen(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	}

	if (document.fullscreenEnabled) {
		requestFullscreen(document.documentElement);
	}
	
	// toggle video form play to pause
	function togglePlay () {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}

	// update button from '►' to '❚ ❚'
	function updateButton () {
		var icon;
		if (this.paused) {
			icon = '►';
		} else {
			icon = '❚ ❚';
		}
		toggle.textContent = icon;
	}

	// skip video up or down
	function skip () {
		video.currentTime += parseFloat(this.dataset.skip);
	}
	
	// update range of volume and playback rate
	function handleRangeUpdate (e) {
		video[this.name] = this.value;
	}

	// scrub video progress bar
	function scrub (e) {
		console.log(e.offsetX);
		const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
		video.currentTime = scrubTime;
	}
	
	// update filled progressbar/ progressbar color
	function handleProgress () {
		const percent = (video.currentTime / video.duration) * 100;
		console.log(percent);
		progressBar.style.flexBasis = `${percent}%`;
	}

	// play/pause video when they use spacebar
	document.body.onkeyup = function (e) {
		if (e.keyCode === 32) {
			togglePlay();
		}
	}

	/* hook up event listeners */
	video.addEventListener('click', togglePlay);
	video.addEventListener('play', updateButton);
	video.addEventListener('pause', updateButton);
	video.addEventListener('timeupdate', handleProgress);

	toggle.addEventListener('click', togglePlay);
	skipButtons.forEach(button => button.addEventListener('click', skip));
	ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
	ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
	fullscreen.addEventListener('click', () => {
		if (screenfull.enabled) {
			screenfull.request(video);
		}
	});

	let mousedown = false;
	progress.addEventListener('click', scrub);
	progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
	progress.addEventListener('mousedown', () => mousedown = true);
	progress.addEventListener('mouseup', () => mousedown = false);
})();




