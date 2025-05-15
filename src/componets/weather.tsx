import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './SearchBox';     
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import { RootState, AppDispatch } from '../redux/store';
import { fetchWeather } from '../redux/weatherSlice';

import './Weather.css';

const Weather: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, city } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);

  return (
    <div className="weather-card">
      <SearchBox />
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Đang tải...</p>}
      {!loading && <CurrentWeather />}
      {!loading && <Forecast />}
    </div>
  );
};

export default Weather;
