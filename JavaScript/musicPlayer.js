const allMusic = [
  {
    name: "Tera Mera Safar",
    artist: "Juss x MixSingh",
    img: "TeraMeraSafar",
    src: "TeraMeraSafar",
  },
  {
    name: "One Love",
    artist: "Shubh",
    img: "OneLove",
    src: "OneLove",
  },
  {
    name: "Shayad",
    artist: "Arijit Singh",
    img: "Shayad",
    src: "Shayad",
  },
  {
    name: "Sajni",
    artist: "Arijit Singh",
    img: "Sajni",
    src: "Sajni",
  },
  {
    name: "Beni Khuley",
    artist: "Habib Wahid and Muza",
    img: "BeniKhuley",
    src: "BeniKhuley",
  },
  {
    name: "You",
    artist: "Dj Regard, Tate McRae, and Troye Sivan",
    img: "You",
    src: "You",
  },
  {
    name: "Guli Mata",
    artist: "Saad Lamjarred and Shreya Ghoshal",
    img: "GuliMata",
    src: "GuliMata",
  },
  {
    name: "In the End",
    artist: "Linkin Park",
    img: "IntheEnd",
    src: "IntheEnd",
  },
  {
    name: "Murder Caust",
    artist: "Lorenz",
    img: "MurderCaust",
    src: "MurderCaust",
  },
  {
    name: "Tu Aake Dekhle",
    artist: "King",
    img: "TuAakeDekhle",
    src: "TuAakeDekhle",
  },
  {
    name: "Ya Lalali",
    artist: "Kawtar",
    img: "YaLalali",
    src: "YaLalali",
  },
  {
    name: "Rahmatun Lil'Alameen",
    artist: "Maher Zain",
    img: "RahmatunLilAlameen",
    src: "RahmatunLilAlameen",
  },
];

const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .songName");
const musicArtist = wrapper.querySelector(".song-details .artistName");

const mainAudio = wrapper.querySelector("#main-audio");
const playPauseBtn = wrapper.querySelector(".play-pause");
const previousBtn = wrapper.querySelector("#previous");
const nextBtn = wrapper.querySelector("#next");
const playPauseBtnIcon = wrapper.querySelector(".play-pause i");

const progressBar = wrapper.querySelector(".progress-bar");

let musicIndex = 10;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNum) {
  musicName.innerText = allMusic[indexNum].name;
  musicArtist.innerText = allMusic[indexNum].artist;
  musicImg.src = `../music/musicThumbnail/${allMusic[indexNum].img}.jpg`;
  mainAudio.src = `../music/${allMusic[indexNum].src}.mp3`;
}

function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtnIcon.classList.add("fa-pause");
  playPauseBtnIcon.classList.remove("fa-play");
  mainAudio.play();
}

function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtnIcon.classList.add("fa-play");
  playPauseBtnIcon.classList.remove("fa-pause");
  mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", () => {
  musicIndex++;
  musicIndex > allMusic.length - 1
    ? (musicIndex = 0)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
});

previousBtn.addEventListener("click", () => {
  musicIndex--;
  musicIndex < 0
    ? (musicIndex = allMusic.length - 1)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  if (!isNaN(duration)) {
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
  }
  let musicCurrentTime = wrapper.querySelector(".current");
  let musicDuration = wrapper.querySelector(".duration");

  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
    console.log(currentTime);
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
