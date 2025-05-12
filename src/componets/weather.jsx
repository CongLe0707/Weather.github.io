import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import { FaSearch, FaTint, FaWind } from "react-icons/fa";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = (selectedCity = city) => {
    if (!selectedCity) return;
    setLoading(true);

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=372c1c997b7349c398833035251205&q=${selectedCity}&days=7&aqi=no&alerts=no`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setForecastData(response.data.forecast.forecastday);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không tìm thấy thành phố.");
        setWeatherData(null);
        setForecastData([]);
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    setCity("Ho Chi Minh");
    fetchWeatherData("Ho Chi Minh");
  }, []);

  const handleSearch = () => {
    fetchWeatherData(city);
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
          placeholder="Tìm thành phố..."
        />
        <button onClick={handleSearch}><FaSearch /></button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Đang tải...</p>}

      {weatherData && !loading && (
        <>
          <div className="weather-info">
            <img
              src={weatherData.current.condition.icon}
              alt="weather-icon"
              className="weather-icon"
            />
            <h1>{weatherData.current.temp_c}°C</h1>
            <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
            <div className="extra-info">
              <div><FaTint /> {weatherData.current.humidity}%<span>Độ ẩm</span></div>
              <div><FaWind /> {weatherData.current.wind_kph} km/h<span>Sức gió</span></div>
            </div>
          </div>

          {/* Forecast */}
          <div className="forecast">
            <h3>Dự báo thời tiết:</h3>
            <div className="forecast-list">
              {forecastData.map((day) => (
                <div className="forecast-item" key={day.date}>
                  <p>{new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'long' })}</p>
                  <img src={day.day.condition.icon} alt="icon" />
                  <p>{day.day.avgtemp_c}°C</p>
                  <p>{day.day.condition.text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
