async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = " YOUR API KEY "; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Extract details
    const cityName = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const weather = data.weather[0];
    const iconCode = weather.icon;
    const description = weather.description;

    // Weather icon URL from OpenWeather
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    resultDiv.innerHTML = `
      <div class="weather-card">
        <h2>${cityName}, ${country}</h2>
        <img src="${iconUrl}" alt="${description}" />
        <p style="text-transform: capitalize;"><strong>${description}</strong></p>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;"><strong>Error:</strong> ${error.message}</p>`;
  }
}
