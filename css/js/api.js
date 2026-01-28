API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


export async function fetchCurrentWeather(city) {
const response = await fetch(
`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
);


if (!response.ok) {
throw new Error("City not found");
}


return response.json()const;
}


export async function fetchForecast(city) {
const response = await fetch(
`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
);


if (!response.ok) {
throw new Error("Forecast not available");
}


return response.json();
}
