function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) hours -= 12;
  }
  if (hours === 0) hours = 12; // For 12 AM

  // Add leading zero for single-digit minutes and seconds
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const ids = ["hour", "minutes", "period"];

  const values = [hours, minutes, period];

  for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).textContent = values[i];
  }
}

function initClock() {
  updateClock(); // Run once immediately
  setInterval(updateClock, 1000); // Update every 1000 milliseconds (1 second)
}
