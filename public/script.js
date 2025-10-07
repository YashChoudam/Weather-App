document.addEventListener("DOMContentLoaded", () => {
  let cityInput = document.getElementById("city-input");
  let getWeatherBtn = document.getElementById("get-weather-btn");
  let weatherInfo = document.getElementById("weather-info");
  let cityNameDisplay = document.getElementById("city-name");
  let temperatureDisplay = document.getElementById("temperature");
  let descriptionDisplay = document.getElementById("description");
  let errorMessage = document.getElementById("error-message");

  getWeatherBtn.addEventListener("click", async () => {
    let city = cityInput.value.trim();
    if (!city) return;

    try {
      let weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching the weather data", error);
      showError();
    }
  });

  async function fetchWeatherData(city) {
    let url = `http://localhost:3000/weather?city=${city}`;
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    let data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    let { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden"); // Hide weather info on error
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "Error fetching weather data. Please try again.";
  }
});