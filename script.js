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
    { id: 1, name: "Rain", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/rain.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/rain.mp3"), active: false},
    {id: 2, name: "Forest", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/forest.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/forest.mp3"), active: false},
    {id: 3, name: "Night", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/night.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/night.mp3"), active: false},
    {id: 4, name:"Dawn", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/dawn.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/dawn.mp3"), active: false},
    {id:5, name:"Ocean", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/ocean.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/ocean.mp3"), active: false},
    {id:6, name:"Campfire", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/campfire.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/campfire.mp3"), active: false},
    {id:7, name:"Cicada", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/cicada.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/cicada.mp3"), active:false},
    {id:8, name:"Birds", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/birds.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/birds.mp3"), active: false},
    {id:9, name:"Farm", src:"https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/farm.mp3", audio: new Audio("https://raw.githubusercontent.com/SRIKAR-B-S-S/SoundStation/main/assets/audio/farm.mp3"), active: false}
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
        TRACKS.forEach(t => {
        if (t.active) t.audio.play();
        });
        if (mode === 'spooky') { //changes the vinyl to a spinning one
            vinylImg.classList.remove('og', 'paused');
            vinylImg.classList.add('spooky', 'playing');
        } else {
            vinylImg.classList.remove('spooky', 'paused');
            vinylImg.classList.add('og', 'playing');
        }
    }
    else {
        playBtn.textContent = "Play";
        TRACKS.forEach(t => t.audio.pause());
        if (mode === 'spooky') { //changes the vinyl to a paused one
            vinylImg.classList.remove('og', 'playing');
            vinylImg.classList.add('spooky', 'paused');
        } else {
            vinylImg.classList.remove('spooky', 'playing');
            vinylImg.classList.add('og', 'paused');
        }
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

// refactor: replaced the previous checkboxes with an indicator dot for a more minimal design

function selectTrack(trackIndex) {
    const track = TRACKS[trackIndex];
    const indicator = document.getElementById(`in-${track.id}`);

    track.active = !track.active

    if (indicator.classList.contains('playing')) {
        indicator.classList.remove('playing');
    } else {
        indicator.classList.add('playing');
    }

    if (track.active && isPlaying){
        track.audio.play();
    }
    else {
        track.audio.pause();
    }

    const badge = document.getElementById(`badge-${track.id}`); // triggers css pressed state for the keybadge of soundtrack when its respective key is pressed

    badge.classList.add('pressed');
    setTimeout(() => {
        badge.classList.remove('pressed');
    }, 150);
}


function triggerClick(button) { // Triggers a click animation for the button in the website whenever that element's respective key is pressed on the keyboard irl
    const btn = document.getElementById(button);

    if (button !== 'insert-key') {

    btn.classList.add('pressed');
    setTimeout(() => {
        btn.classList.remove('pressed');
    }, 150);
}
else {
    btn.classList.add('pressed-insertkey');
    setTimeout(() => {
        btn.classList.remove('pressed-insertkey')
    }, 150);
}
}

// All the code below is for capturing keypresses for playing the audio and media controls(play/pause & volume) & opening the guide

const guideWindow = document.getElementById('guide-window');

function toggleGuide() {
    guideWindow.classList.toggle('hidden');
}

// Added click sound effects for media buttons and selecting soundtracks(keypress audio for selecting soundtracks is slightly different from that of the media buttons and insert key)
const clickSound = new Audio('./assets/clickSound.mp3');
const keySound = new Audio('./assets/keySound.mp3');

let mode = 'halo';
const modeIconID = document.getElementById('modeIcon');
const body = document.getElementById('bodyID');
const errIcon1 = document.getElementById('error1');
const errIcon2 = document.getElementById('error2');
const eyeIcon = document.getElementById('eye');

function toggleMode() {
    if (mode === 'halo') { //from halo --> spooky
        mode = 'spooky';
        modeIconID.classList.remove('halo');
        modeIconID.classList.add('spooky');
        body.classList.remove('halo');
        body.classList.add('spooky');
        if (isPlaying) { //chnages the vinyl when the user switches between modes(Halo and Spooky), also wrt if the audio is playing or paused as we have a spinning vinyl and a static one
            vinylImg.classList.add('spooky', 'playing');
            vinylImg.classList.remove('halo');
        } else {
            vinylImg.classList.add('spooky', 'paused');
            vinylImg.classList.remove('halo');
        }
        // changes the colours of the window background, title, border and names of soundtracks
        document.documentElement.style.setProperty('--window-bg', '#707b85b7');
        document.documentElement.style.setProperty('--window-title', '#ff7d7d');
        document.documentElement.style.setProperty('--window-border', '#dcdcdc5b');
        document.documentElement.style.setProperty('--soundtracks', 'rgb(252, 226, 226)');
        errIcon1.classList.remove('hidden');
        errIcon2.classList.remove('hidden');
        eyeIcon.classList.remove('hidden');
        // the above three lines will show the error and eye icons beside the window titles in the Spooky Mode
    }
    else if (mode === 'spooky') { //from spooky --> halo
        mode = 'halo';
        modeIconID.classList.remove('spooky');
        modeIconID.classList.add('halo');
        body.classList.add('halo');
        body.classList.remove('spooky');
        if (isPlaying) {
            vinylImg.classList.add('halo', 'playing');
            vinylImg.classList.remove('spooky');
        } else {
            vinylImg.classList.add('halo', 'paused');
            vinylImg.classList.remove('spooky');
        }
        //in the same way as the user switched from halo to spooky, the colours change when switched from spooky to halo
        document.documentElement.style.setProperty('--window-bg', '#4b4b4b');
        document.documentElement.style.setProperty('--window-title', 'white');
        document.documentElement.style.setProperty('--window-border', '#6e6e6e');
        document.documentElement.style.setProperty('--soundtracks', 'whitesmoke');
        errIcon1.classList.add('hidden');
        errIcon2.classList.add('hidden');
        eyeIcon.classList.add('hidden');
    }
}

// The time between 12AM - 4AM is considered as dark hours when it will display the Spooky mode as soon as the user enters the website
function darkHours() {
    const now = new Date();
    const hours = now.getHours(); // gives 24hr time formatted hours
    if ((hours >= 0 && hours <= 4)) { // if hours are b/w 0(12AM) and 4AM
        if (mode === 'halo') { // if the website loads in Halo mode, switch it to Spooky mode
            toggleMode();
        } 
        else if (mode === 'spooky') { // if it's alr in spooky mode, leave it..

        }
    }
}

darkHours();

function isDarkHours() { //will check if the current hours are darkhours or not, returns true or false.
    const now = new Date();
    const hours = now.getHours();
    return hours >=0 && hours <4;
}

const jumpscare = new Audio('./assets/jumpscare.mp3');
const YCEdiv = document.getElementById('yce'); //gets the div of the You Can't Escape Dark Hours message

window.addEventListener('keydown', (e) => {

    if (e.ctrlKey || e.metaKey ) { // prevents collision/interference of SoundStation keys with other key-combinations, such as in Chrome I was using the Ctrl+1 to switch between tabs and it has triggered the 1st Soundtrack to play, adding the line would now prevent it
        return;                     // just in case, added the meta key too
    }

    if (e.key === 'Tab') { // doesn't let the tab key work!
        e.preventDefault();
        return;
    }

    if (e.key >= '1' && e.key <= '9') {
        const trackIdx = parseInt(e.key) - 1;
        selectTrack(trackIdx);
        keySound.play();
    }

    else if (e.code === 'ArrowUp') {
        e.preventDefault();
        adjustVolume(10);
        triggerClick('volume-plus-button');
        clickSound.play();
    }

    else if (e.code === 'ArrowDown') {
        e.preventDefault();
        adjustVolume(-10);
        triggerClick('volume-minus-button');
        clickSound.play();
    }

    else if (e.code === 'Space') {
        togglePlay();
        triggerClick('play-button');
        clickSound.play();
    }

    else if (e.key === '0') {
        if (isDarkHours()) { //if its the dark hours are the user tries to change the mode of the website using the 0 key..
            YCEdiv.classList.remove('hidden'); // then it displays the YCE message
            setTimeout(() => {
                YCEdiv.classList.add('hidden');
            }, 1500);
        } else { //if its not dark hours, the website functions as usual
            toggleMode();
            jumpscare.play(); //plays the jumpscare audio
        }
    }
    
    else if (e.key === 'Insert') {
        e.preventDefault();
        toggleGuide();
        triggerClick('insert-key');
        clickSound.play();
        return;
    }
});