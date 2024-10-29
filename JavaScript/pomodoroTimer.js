// script.js

let workTime = 25 * 60; // default 25 minutes in seconds
let breakTime = 5 * 60; // default 5 minutes in seconds
let isWorkSession = true;
let timeRemaining = workTime;
let timer;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const workDurationInput = document.getElementById("work-duration");
const breakDurationInput = document.getElementById("break-duration");

function updateDisplay() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function startTimer() {
  timer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateDisplay();
    } else {
      isWorkSession = !isWorkSession;
      timeRemaining = isWorkSession ? workTime : breakTime;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  isWorkSession = true;
  timeRemaining = workTime;
  updateDisplay();
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Customization Handlers
workDurationInput.addEventListener("change", () => {
  workTime = workDurationInput.value * 60;
  if (isWorkSession) resetTimer();
});
breakDurationInput.addEventListener("change", () => {
  breakTime = breakDurationInput.value * 60;
  if (!isWorkSession) resetTimer();
});

// Initialize display
updateDisplay();
