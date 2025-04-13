const apiKey = "b99676b6e9c588433d8bc1e49d3392b7";

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  console.log(data);
  updateUI(data);
}

async function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    updateUI(data);
  });
}

function updateUI(data) {
  const weatherCard = document.getElementById("weather-card");

  if (data.cod !== 200) {
    weatherCard.innerHTML = `<p>City not found.</p>`;
    weatherCard.classList.remove("hidden");
    return;
  }

  const { name, main, weather, sys } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherCard.innerHTML = `
    <h2>${name}, ${sys.country}</h2>
    <img src="${icon}" alt="${weather[0].description}" />
    <div class="weather-info">🌡 ${main.temp}°C</div>
    <div class="weather-info">☁️ ${weather[0].description}</div>
    <div class="weather-info">💧 Humidity: ${main.humidity}%</div>
  `;

  setBackground(weather[0].main);
  weatherCard.classList.remove("hidden");
}

function setBackground(condition) {
  const body = document.body;
  let bg;

  switch (condition.toLowerCase()) {
    case "clear":
      bg = "linear-gradient(to right, #fceabb, #f8b500)";
      break;
    case "clouds":
      bg = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      break;
    case "rain":
    case "drizzle":
      bg = "linear-gradient(to right, #4b79a1, #283e51)";
      break;
    case "snow":
      bg = "linear-gradient(to right, #e6dada, #274046)";
      break;
    case "thunderstorm":
      bg = "linear-gradient(to right, #1e130c, #9a8478)";
      break;
    default:
      bg = "#a1c4fd";
  }

  body.style.background = bg;
}

window.getWeather = function () {
  const city = document.getElementById("city").value.trim();
  console.log("City entered:", city); // 👈 Add this line
  if (city) {
    getWeather(city);
  }
};
async function fetchWeather(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    updateUI(data);
  }