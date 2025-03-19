const apiKey = "YOUR_API_KEY";  // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById("getWeather");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weatherInfo");

getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
        } else {
            const cityName = document.getElementById("cityName");
            const temperature = document.getElementById("temperature");
            const description = document.getElementById("description");
            const humidity = document.getElementById("humidity");
            const windSpeed = document.getElementById("windSpeed");

            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.textContent = `Weather: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            weatherInfo.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to retrieve weather data. Please try again later.");
    }
});
