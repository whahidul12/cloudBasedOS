const apiKey = "###";
const suggestionsDiv = document.getElementById("suggestions");

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherByCoords, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function getWeatherByCoords(position) {
  const { latitude, longitude } = position.coords;
  fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
}

function getWeatherByLocation() {
  const location = document.getElementById("location-input").value;
  fetchWeatherData(`q=${location}`);
}

function fetchWeatherData(query) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      changeBackground(data.weather[0].main);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(data) {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("location").textContent = `📍 Location: ${data.name}`;
  document.getElementById(
    "temperature"
  ).textContent = `🌡️ Temperature: ${data.main.temp}°C`;
  document.getElementById(
    "description"
  ).textContent = `☁️ Description: ${data.weather[0].description}`;
}

function changeBackground(weather) {
  document.body.className = ""; // Reset classes
  if (weather.toLowerCase().includes("sun")) {
    document.body.classList.add("sunny");
  } else if (weather.toLowerCase().includes("rain")) {
    document.body.classList.add("rainy");
  }
}

function showError(error) {
  console.error("Geolocation error:", error.message);
  alert("Unable to retrieve your location.");
}

function suggestLocations() {
  const query = document.getElementById("location-input").value;
  if (query.length < 3) {
    suggestionsDiv.innerHTML = ""; // Clear suggestions if query is too short
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=5&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      suggestionsDiv.innerHTML = "";
      data.list.forEach((location) => {
        const div = document.createElement("div");
        div.textContent = location.name;
        div.onclick = () => {
          document.getElementById("location-input").value = location.name;
          suggestionsDiv.innerHTML = "";
          getWeatherByLocation();
        };
        suggestionsDiv.appendChild(div);
      });
    })
    .catch((error) =>
      console.error("Error fetching location suggestions:", error)
    );
}
