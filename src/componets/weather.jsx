import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import { FaSearch, FaTint, FaWind } from "react-icons/fa"; // Icon độ ẩm & gió

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = () => {
    if (!city) return;
    setLoading(true);

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=372c1c997b7349c398833035251205&q=${city}&aqi=no`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError("City not found.");
        setLoading(false);
        console.error(err);
      });
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="weather-card">
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Search"
        />
        <button onClick={handleSearch}><FaSearch /></button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}

      {weatherData && !loading && (
        <div className="weather-info">
          <img
            src={weatherData.current.condition.icon}
            alt="weather-icon"
            className="weather-icon"
          />
          <h1>{weatherData.current.temp_c}°C</h1>
          <h2>{weatherData.location.name}</h2>
          <div className="extra-info">
            <div><FaTint /> {weatherData.current.humidity}%<span>Humidity</span></div>
            <div><FaWind /> {weatherData.current.wind_kph} km/h<span>Wind Speed</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
