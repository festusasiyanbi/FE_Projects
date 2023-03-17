/* Declaring all required variables */

let now_playing = document.querySelector('.now-playing');
let song_details = document.querySelector('.song-details');
let image_area = document.querySelector('.image-area');
let songname = document.querySelector('.songname');
let artist = document.querySelector('.artist');
let current_time = document.querySelector('.current-time');
let max_duration = document.querySelector('.max-duration');
let seek_slider = document.querySelector('.seek-slider');
let current_track = document.createElement('audio');
let volume_slider = document.querySelector('.volume-slider');
let random_btn = document.querySelector('.random-btn');
let prev_btn = document.querySelector('.prev-btn');
let playpause_btn = document.querySelector('.playpause-btn');
let next_btn = document.querySelector('.next-btn');
let repeat_btn = document.querySelector('.repeat-btn');
let randomIcon = document.querySelector('.fa-random');
let wave = document.getElementById('wave');
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img:'electricity.jpeg',
        name: 'Electricity',
        artist: 'Pheelz & Davido',
        music: 'Electricity.mp3'
    },
    {
        img:'manyways.jpeg',
        name: 'Many-ways',
        artist: 'BNXN fka Buju & Wizkid',
        music: 'Manyways.mp3'
    },
    {
        img:'terminator.jpeg',
        name: 'Terminator',
        artist: 'Asake',
        music: 'Terminator.mp3'
    },
    {
        img:'Contour.jpeg',
        name: 'Contour',
        artist: 'Joeboy',
        music: 'Contour.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();
    current_track.src = music_list [track_index].music;
    current_track.load();
    image_area.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    songname.textContent = music_list[track_index].name;
    artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Now playing" + " " + (track_index +1) + " "  + "of" + " " + music_list.length;
    updateTimer = setInterval(setUpdate, 1000);
    current_track.addEventListener('ended', nextTrack);  
    random_bg_color();
}


function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i = 0; i < 6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
        let Color1 = populate('#');
        let Color2 = populate('#');
        var angle ='to right';
        let gradient = 'linear-gradient(' + angle + ',' + Color1 + ',' +  Color2 + ")";
        document.body.style.background = gradient;
}


function reset() {
    current_time.textContent = "00:00";
    max_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('random');

}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('random');
}

function repeatTrack() {
    let current_index = track_index;
   loadTrack(current_index);
  playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    current_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = `<i class="fa fa-pause-circle fa-3x"></i>`;
}

function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = `<i class="fa fa-play-circle fa-3x"></i>`;
}

function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index +=1;
    } else if(track_index < music_list.length - 1 && isRandom === true) {
            let random_index = Number.parseInt(Math.random() * music_list.length);
            track_index = random_index;
        } else { track_index = 0; } 
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if(track_index > 0) {
        track_index -= 1;
    } else { track_index = music_list.length  -1; }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto = current_track.duration * (seek_slider.value / 100);
    current_track.currentTime = seekto;
}

function setVolume(){
    current_track.volume = volume_slider.value/100;
}

function setUpdate(){
    let seekPosition = 0;
    if (!isNaN (current_track.duration)){
        seekPosition = current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(current_track.currentTime/60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(current_track.duration / 60);
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

        if(currentSeconds < 10){currentSeconds = "0" + currentSeconds;}
        if(currentMinutes < 10){currentMinutes = "0" + currentMinutes;}
        if(durationSeconds < 10){durationSeconds = "0" + durationSeconds;}
        if(durationMinutes < 10){durationMinutes = "0" + durationMinutes;}

        current_time.textContent = currentMinutes + ":" + currentSeconds;
        max_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
