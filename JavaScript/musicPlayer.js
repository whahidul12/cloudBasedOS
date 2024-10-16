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
    name: "Murder Caust",
    artist: "Lorenz",
    img: "MurderCaust",
    src: "MurderCaust",
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
const repeatBtn = wrapper.querySelector("#repeat-playlist");

const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");

const musicList = wrapper.querySelector(".music-list");
const moreMusicBtn = wrapper.querySelector("#more-music");
const hideMusicBtn = wrapper.querySelector("#close");

let musicIndex = 0;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingNow();
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
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidthVal = progressArea.clientWidth;
  let clickedOffSetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
  playMusic();
});

repeatBtn.addEventListener("click", () => {
  let getClassRepeat = repeatBtn.classList.contains("fa-repeat");
  let getClassOnce = repeatBtn.classList.contains("fa-rotate");
  let getClassShuffle = repeatBtn.classList.contains("fa-shuffle");
  if (getClassRepeat) {
    repeatBtn.classList.remove("fa-repeat");
    repeatBtn.classList.add("fa-rotate");
    repeatBtn.setAttribute("title", "song looped");
  }
  if (getClassOnce) {
    repeatBtn.classList.remove("fa-rotate");
    repeatBtn.classList.add("fa-shuffle");
    repeatBtn.setAttribute("title", "song shuffled");
  }
  if (getClassShuffle) {
    repeatBtn.classList.remove("fa-shuffle");
    repeatBtn.classList.add("fa-repeat");
    repeatBtn.setAttribute("title", "playlist looped");
  }
});

mainAudio.addEventListener("ended", () => {
  let getClassRepeat = repeatBtn.classList.contains("fa-repeat");
  let getClassOnce = repeatBtn.classList.contains("fa-rotate");
  let getClassShuffle = repeatBtn.classList.contains("fa-shuffle");
  if (getClassRepeat) {
    musicIndex++;
    musicIndex > allMusic.length - 1
      ? (musicIndex = 0)
      : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
  }
  if (getClassOnce) {
    mainAudio.currentTime = 0;
    loadMusic(musicIndex);
    playMusic();
  }
  if (getClassShuffle) {
    let randomIndex = Math.floor(Math.random() * 10);
    do {
      randomIndex = Math.floor(Math.random() * 10);
    } while (musicIndex == randomIndex);
    musicIndex = randomIndex;
    loadMusic(musicIndex);
    playMusic();
  }
});

moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
hideMusicBtn.addEventListener("click", () => {
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector(".ul");

for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <audio class="${allMusic[i].src}" src="../music/${allMusic[i].src}.mp3"></audio>
              <span id="${allMusic[i].src}" class="audio-duration">${allMusic[i].name}</span>
              </li>`;

  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
  });
}

const allLiTags = ulTag.querySelectorAll("li");
const a = ulTag.querySelectorAll("a");

function playingNow() {
  for (let j = 0; j < allLiTags.length; j++) {
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
    }
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
}
