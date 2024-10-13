function updateClock() {
  let now = new Date();
  let dayName = now.getDay();
  let month = now.getMonth();
  let dateNum = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) hours -= 12;
  }
  if (hours === 0) hours = 12; // For 12 AM

  // Add leading zero for single-digit minutes and seconds
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const ids = [
    "dayname",
    "month",
    "daynum",
    "year",
    "hour",
    "minutes",
    "seconds",
    "period",
  ];

  const values = [
    weekName[dayName],
    monthsName[month],
    dateNum,
    year,
    hours,
    minutes,
    seconds,
    period,
  ];

  for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).textContent = values[i];
  }
}

function initClock() {
  updateClock(); // Run once immediately
  setInterval(updateClock, 1000); // Update every 1000 milliseconds (1 second)
}
