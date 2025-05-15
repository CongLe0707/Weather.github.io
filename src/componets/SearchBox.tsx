import { useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, setCity } from "../redux/weatherSlice";
import './Weather.css';

const SearchBox = () => { 
    const dispatch = useDispatch<AppDispatch>();
    const city = useSelector((state: RootState) => state.weather.city);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCity(e.target.value));
        if (e.target.value.trim() !== "") {
            setError(""); // Clear error when user starts typing
        }
    }

    const handleSearch = () => { 
        if (city.trim() === "") {
            setError("Vui lòng nhập tên thành phố.");
            return;
        }
        setError(""); // Clear previous error
        dispatch(fetchWeather(city));
    };

    return (
        <div className="search-box">
            <input type="text" value={city} onChange={handleChange} placeholder="Nhập tên thành phố..." />
            <button onClick={handleSearch}>Tìm kiếm</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SearchBox;
