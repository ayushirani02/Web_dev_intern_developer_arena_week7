{ fetchCurrentWeather, fetchForecast } from "./api.js";
import { saveCity, getSavedCity } from "./storage.js";


const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const currentWeatherimportDiv = document.getElementById("currentWeather");
const forecastDiv = document.getElementById("forecast");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");


async function loadWeather(city) {
try {
showLoading(true);
showError("");


const currentData = await fetchCurrentWeather(city);
const forecastData = await fetchForecast(city);


displayCurrentWeather(currentData);
displayForecast(forecastData);


saveCity(city);
} catch (error) {
showError(error.message);
} finally {
showLoading(false);
}
}


function displayCurrentWeather(data) {
currentWeatherDiv.innerHTML = `
<h2>${data.name}, ${data.sys.country}</h2>
<p><strong>Temperature:</strong> ${data.main.temp}°C</p>
<p><strong>Weather:</strong> ${data.weather[0].description}</p>
<p><strong>Humidity:</strong> ${data.main.humidity}%</p>
<p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
`;
}


function displayForecast(data) {
forecastDiv.innerHTML = "";


const dailyData = data.list.filter(item =>
item.dt_txt.includes("12:00:00")
);


dailyData.forEach(day => {
const card = document.createElement("div");
card.className = "forecast-card";


const date = new Date(day.dt_txt).toLocaleDateString();


card.innerHTML = `
<h4>${date}</h4>
<p>${day.main.temp}°C</p>
<p>${day.weather[0].main}</p>
`;


forecastDiv.appendChild(card);
});
}


function showLoading(isLoading) {
loadingDiv.classList.toggle("hidden", !isLoading);
}


function showError(message) {
if (message) {
errorDiv.textContent = message;
errorDiv.classList.remove("hidden");
} else {
errorDiv.classList.add("hidden");
}
}


searchBtn.addEventListener("click", () => {
const city = cityInput.value.trim();
if (city) {
loadWeather(city);
}
});


window.addEventListener("load", () => {
const savedCity = getSavedCity();
if (savedCity) {
cityInput.value = savedCity;
loadWeather(savedCity);
}
});
