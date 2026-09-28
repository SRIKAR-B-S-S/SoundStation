const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');

function updateClock() {
    const now = new Date();

    const Time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const weekday = now.toLocaleDateString([], {weekday: 'long'});
    const Month = now.toLocaleDateString([], {month:'short'});
    const day = now.toLocaleDateString([], {day: '2-digit'});
    const year = now.toLocaleDateString([], {year: 'numeric'});

    timeDisplay.textContent = Time;
    dateDisplay.textContent = weekday + " - " + Month + " " + day + ", " + year;

}

setInterval(updateClock, 1000);
updateClock();

const TRACKS = [ // I will be adding the soundtracks here in my next commit, as I've to find some relating soundtracks from online
    { id: 1, name: "Rain", src:"", audio: new Audio(""), active: false},
    {id: 2, name: "Forest", src:"", audio: new Audio(""), active: false},
    {id: 3, name: "Night", src:"", audio: new Audio(""), active: false},
    {id: 4, name:"Dawn", src:"", audio: new Audio(""), active: false},
    {id:5, name:"Ocean", src:"", audio: new Audio(), active: false},
    {id:6, name:"Campfire", src:"", audio: new Audio(""), active: false},
    {id:7, name:"Cicada", src:"", audio: new Audio(""), active:false},
    {id:8, name:"Birds", src:"", audio: new Audio(""), active: false},
    {id:9, name:"Farm", src:"", audio: new Audio(""), active: false}
];

let activeTrack = TRACKS[0]; //Plays Rain if there's no track selected by the user
let isPlaying = false;
let volume = 60;

TRACKS.forEach(t => {
    t.audio.loop = true; // Added the audio to loop as it should play endlessly until the user stops it again
    t.audio.volume = volume/100; // divide /w 100 as it takes values only b/w 0.0-1.0
});

const vinylImg = document.getElementById('vinyl-gif');
const playBtn = document.getElementById('play-button');
const volLevelDisplay = document.getElementById('vol-level');

//Below function to toggle the Play/Pause button, it changes the state of playing, text of the button
function togglePlay() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        playBtn.textContent = "Pause";
        vinylImg.classList.remove('paused');
        TRACKS.forEach(t => {
            if (t.active) t.audio.play();
        });

    }
    else {
        playBtn.textContent = "Play";
        vinylImg.classList.add('paused');
        TRACKS.forEach(t => t.audio.pause());
    }
}

// Function to adjust volume below
function adjustVolume(change) {
    volume = Math.max(0, Math.min(100, volume + change)); //makes the volume stay b/w 0 and 100 when the volume is changed
    
    volLevelDisplay.textContent = volume;

    TRACKS.forEach(t => {
        t.audio.volume = volume / 100
    });
}

// The below function allows the user to select and play single/multiple tracks simultaneously
function selectTrack(trackIndex) {
    
const track = TRACKS[trackIndex];
const chck = document.getElementById(`chck-${track.id}`);

track.active = !track.active;

if (chck) chck.checked = track.active;

if (track.active && isPlaying) {
    track.audio.play();
}
else {
    track.audio.pause();
}
}

// All the code below is for capturing keypresses for playing the audio and media controls(play/pause & volume)

window.addEventListener('keydown', (e) => {

    if (e.key >= '1' && e.key <= '9') {
        const trackIdx = parseInt(e.key) - 1;
        selectTrack(trackIdx);
    }

    else if (e.code === 'ArrowUp') {
        e.preventDefault();
        adjustVolume(10);
    }

    else if (e.code === 'ArrowDown') {
        e.preventDefault();
        adjustVolume(-10);
    }

    else if (e.code === 'Space') {
        togglePlay();
    }

});