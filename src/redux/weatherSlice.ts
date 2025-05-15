import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = "372c1c997b7349c398833035251205";

// ---- Interface định nghĩa dữ liệu từ API ----
interface Condition {
  text: string;
  icon: string;
}

interface CurrentWeather {
  temp_c: number;
  humidity: number;
  wind_kph: number;
  condition: Condition;
}

interface Location {
  name: string;
  country: string;
  localtime: string;
  tz_id: string;
}

interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: Condition;
  };
}

interface WeatherResponse {
  current: CurrentWeather;
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
}

// ---- State của Redux Slice ----
interface WeatherState {
  city: string;
  
  weatherData: WeatherResponse | null;
  forecastData: ForecastDay[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  city: 'Ho Chi Minh',
  weatherData: null,
  // Removed the 'data' property as it is not defined in the WeatherState interface
  forecastData: [],
  loading: false,
  error: null,
};

// ---- Async thunk fetch dữ liệu thời tiết ----
export const fetchWeather = createAsyncThunk<WeatherResponse, string>(
  'weather/fetchWeather',
  async (city) => {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
    );
    return res.data;
  }
);

// ---- Slice chính ----
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
        state.forecastData = action.payload.forecast.forecastday;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.weatherData = null;
        state.forecastData = [];
        state.error = "Không tìm thấy thành phố.";
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
