async function getWeather() {
    const city = encodeURIComponent(document.getElementById("cityInput").value);
    const apiKey = "02a433c402fd3471bdd6fb3a2f09b663";  // Replace this
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        const weatherCondition = data.weather[0].main;  // e.g., Clear, Clouds, Rain, Snow

        // Update background based on weather condition
        changeBackground(weatherCondition);

        const weatherResult = document.getElementById("weatherResult");
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].main}</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    }


    function changeBackground(condition) {
    const video = document.getElementById("bgVideo");
    
    let videoUrl = "";

    switch (condition.toLowerCase()) {
        case "clear":
            videoUrl = "videos/clear.mp4";
            break;
        case "clouds":
            videoUrl = "videos/cloudy.mp4";
            break;
        case "rain":
        case "drizzle":
            videoUrl = "videos/rain.mp4";
            break;
        case "snow":
            videoUrl = "videos/snow.mp4";
            break;
        case "thunderstorm":
            videoUrl = "videos/thunderstorm.mp4";
            break;
        default:
            videoUrl = "videos/default.mp4";
            break;
    }

    video.querySelector("source").src = videoUrl;
    video.load();
}

}