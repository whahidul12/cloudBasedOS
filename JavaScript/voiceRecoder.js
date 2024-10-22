const micBtn = document.querySelector("#mic");
const playback = document.querySelector(".playback");

micBtn.addEventListener("click", ToggleMic);

let canRecord = false;
let isRecording = false;
let recorder = null;
let chunk = [];

// Setup audio with simplified error messages
function SetupAudio() {
  console.log("Setting up audio...");

  // Check if getUserMedia is supported
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Your browser does not support microphone access.");
    console.error("getUserMedia is not supported in this browser.");
    return;
  }

  // Try to get microphone access
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(SetupStream)
    .catch((err) => {
      console.error("Microphone access denied or not available:", err);
      alert("Please enable microphone access to use this feature.");
    });
}

// Setup the stream and the recorder
function SetupStream(stream) {
  // Check if MediaRecorder is available
  if (!window.MediaRecorder) {
    alert("Recording is not supported on this browser.");
    console.error("MediaRecorder API is not supported.");
    return;
  }

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (e) => {
    chunk.push(e.data);
  };

  recorder.onstop = (e) => {
    const blob = new Blob(chunk, { type: "audio/ogg; codecs=opus" });
    const audioURL = window.URL.createObjectURL(blob);
    playback.src = audioURL;
    chunk = []; // Clear chunk array after recording
  };

  canRecord = true;
  console.log("Microphone is ready to record.");
}

// Toggle the recording state
function ToggleMic() {
  if (!canRecord) {
    alert("Microphone is not ready for recording yet.");
    return;
  }

  isRecording = !isRecording;

  if (isRecording) {
    recorder.start();
    micBtn.classList.add("is-recording");
    micBtn.innerText = "Stop Recording";
  } else {
    recorder.stop();
    micBtn.classList.remove("is-recording");
    micBtn.innerText = "Start Recording";
  }
}

// Initialize setup on page load
SetupAudio();
