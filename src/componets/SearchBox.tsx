import { use } from "react"
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Root } from "react-dom/client";
import { fetchWeather, setCity } from "../redux/weatherSlice";
import './Weather.css';


const  SearchBox = () => { 
    const dispatch = useDispatch<AppDispatch>();
    const city = useSelector((state: RootState)=> state.weather.city);

    const handLeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCity(e.target.value));
    }
    const handleSeacrh = () => { 
        dispatch(fetchWeather(city));
    };
    return (
        <div className="search-box">
            <input type="text" value={city} onChange={handLeChange} />
            <button onClick={handleSeacrh}>Search</button>
        </div>
    )
} 
export default SearchBox;