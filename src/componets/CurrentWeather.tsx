import React from 'react';
import { useSelector } from 'react-redux';
import { FaTint, FaWind } from 'react-icons/fa';
import { RootState } from '../redux/store';
import './Weather.css';

const translate = (text: string): string => {
  const map: Record<string, string> = {
    Sunny: "Nhiều nắng",
    "Partly Cloudy": "Có mây",
    Fog: "Sương mù dày",
    Rain: "Mưa",
    Snow: "Tuyết",
    Thunderstorm: "Giông bão",
  };
  return map[text] || text;
};

const CurrentWeather: React.FC = () => {
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  if (!weatherData) return null;

  const { current, location } = weatherData;
  return (
    <div className="weather-info">
      <img src={current.condition.icon} alt="weather-icon" />
      <h1>{current.temp_c}°C</h1>
      <h2>{location.name}, {location.country}</h2>
      <p>
        Hôm nay là{" "}
        {new Intl.DateTimeFormat("vi-VN", {
          weekday: "long", day: "2-digit", month: "2-digit", year: "numeric", timeZone: location.tz_id
        }).format(new Date(location.localtime))}
      </p>
      <p><strong>{translate(current.condition.text)}</strong></p>
      <div className="extra-info">
        {FaTint({})} {current.humidity}% <span>Độ ẩm</span>
        {FaWind({})}{current.wind_kph} Km/h <span>Sức gió</span>
      </div>
    </div>
  );
};

export default CurrentWeather;