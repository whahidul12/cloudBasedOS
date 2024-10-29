// script.js

let isRunning = false;
let timer;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const playPauseButton = document.getElementById("playPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function formatTime(time) {
  return time.toString().padStart(2, "0");
}

function updateTimeDisplay() {
  let totalMilliseconds = elapsedTime;
  let minutes = Math.floor(totalMilliseconds / 60000);
  let seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
  millisecondsDisplay.textContent = formatTime(milliseconds);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateTimeDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

playPauseButton.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
    playPauseButton.textContent = "Play";
  } else {
    startTimer();
    playPauseButton.textContent = "Pause";
  }
  isRunning = !isRunning;
});

resetButton.addEventListener("click", () => {
  stopTimer();
  elapsedTime = 0;
  updateTimeDisplay();
  playPauseButton.textContent = "Play";
  isRunning = false;
  lapsContainer.innerHTML = ""; // Clear all laps
  lapCounter = 1;
});

lapButton.addEventListener("click", () => {
  if (!isRunning) return;

  const lapTime = `${formatTime(Math.floor(elapsedTime / 60000))}:${formatTime(
    Math.floor((elapsedTime % 60000) / 1000)
  )}.${formatTime(Math.floor((elapsedTime % 1000) / 10))}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapsContainer.appendChild(lapItem);
  lapCounter++;
});
