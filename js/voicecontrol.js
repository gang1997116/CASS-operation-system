// Mute a singular HTML5 element
function muteMe(elem) {
    elem.muted = true;
    elem.pause();
}
function playMe(elem) {
    elem.muted = false;
    elem.play();
}

// Try to mute all video and audio elements on the page
function playPage(){
	 document.querySelectorAll("audio").forEach( audio => playMe(audio) );
}
function mutePage() {
    document.querySelectorAll("audio").forEach( audio => muteMe(audio) );
}