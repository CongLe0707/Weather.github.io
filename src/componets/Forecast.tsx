import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './Weather.css';

const translate = (text: string): string => {
  const map: Record<string, string> = {
    "Moderate rain": "Mưa vừa",
    "Heavy rain": "Mưa to",
    "Patchy rain nearby": "Mưa rải rác",
    "Partly Cloudy": "Có mây",
    "Torrential rain shower": "Mưa rào",

    

  };
  return map[text] || text;
};

const Forecast: React.FC = () => {
  const { forecastData, weatherData } = useSelector((state: RootState) => state.weather);
  if (!forecastData || !weatherData) return null;

  return (
    <div className="forecast">
      <h3>Dự báo thời tiết:</h3>
      <div className="forecast-list">
        {forecastData.map((day) => (
          <div className="forecast-item" key={day.date}>
            <p>{new Intl.DateTimeFormat("vi-VN", {
              weekday: "long",
              timeZone: weatherData.location.tz_id
            }).format(new Date(`${day.date}T12:00:00`))}</p>
            <img src={day.day.condition.icon} alt="icon" />
            <p>{day.day.avgtemp_c}°C</p>
            <p>{translate(day.day.condition.text)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
