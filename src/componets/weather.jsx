import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import { FaSearch, FaTint, FaWind } from "react-icons/fa";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm fetch có thể nhận tên thành phố truyền vào
  const fetchWeatherData = (selectedCity = city) => {
    if (!selectedCity) return;
    setLoading(true);

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=372c1c997b7349c398833035251205&q=${selectedCity}&aqi=no`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không tìm thấy thành phố.");
        setLoading(false);
        console.error(err);
      });
  };

  // Khi app load lần đầu, gọi API cho "Ho Chi Minh"
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
      )}
    </div>
  );
};

export default Weather;
