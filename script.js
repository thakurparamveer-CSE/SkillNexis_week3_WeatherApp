const API_KEY = "c008b9ac9ee320f867c63a07b3af9a8d";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    result.innerHTML = "<p>Loading weather...</p>";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather data");
        }

        const temperature = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const condition = data.weather[0].description;

        result.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>

                <p>🌡️ Temperature: ${temperature} °C</p>
                <p>🌡️ Feels Like: ${feelsLike} °C</p>
                <p>💧 Humidity: ${humidity}%</p>
                <p>☁️ Weather: ${condition}</p>
            </div>
        `;

    } catch (error) {
        console.error("Weather Error:", error);

        result.innerHTML = `
            <p class="error">${error.message}</p>
        `;
    }
}