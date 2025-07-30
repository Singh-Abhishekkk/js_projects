const input = document.getElementById("city-name");
const button = document.getElementById("get-weather");
const weather = document.getElementById("weather-result");

button.addEventListener("click", () => {
    const city = input.value.trim();
    if (city === "") {
        weather.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const apiKey = "42c84fa161a2928a8857753e7a6877dd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    weather.innerHTML = "<p>Loading...</p>"; // Optional: basic loading feedback

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const name = data.name;
            const emoji = getWeatherEmoji(desc);

            weather.innerHTML = `
                <div class="weather-emoji">${emoji}</div>
                <h2>${name}</h2>
                <p>${desc}</p>
                <p>${temp}°C</p>
            `;
        })
        .catch(() => {
            weather.innerHTML = "<p>City not found or error fetching data.</p>";
        });
});

// ✅ Function to map weather description to emoji
function getWeatherEmoji(description) {
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "🌞";
    if (desc.includes("cloud")) return "☁️";
    if (desc.includes("rain")) return "🌧️";
    if (desc.includes("thunder") || desc.includes("storm")) return "⛈️";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("mist") || desc.includes("fog")) return "🌫️";
    return "🌡️";
}
