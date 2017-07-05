/* get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* buil functions */
function togglePlay () {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function updateButton () {
	var icon;
	if (this.paused) {
		icon = '►';
	} else {
		icon = '❚ ❚';
	}
	toggle.textContent = icon;
}

function skip () {
	video.currentTime += parseFloat(this.dataset.skip);
}



/* hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', skip));