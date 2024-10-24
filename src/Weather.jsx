import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('New York');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=3bfb38e641a1499a979172658242410&q=${city}&aqi=no);
`);
            setWeather(response.data);
        } catch (error) {
            setError("Error fetching weather data");
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <div className='weather-main'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weather && (
                <>
                    <h2 className='weather-title'>Weather in {weather.location.name}</h2>
                    <p className='weather-temp'>Temperature: {weather.current.temp_c}°C</p>
                    <p className='weather-cond'>Condition: {weather.current.condition.text}</p>
                </>
            )}
            <input 
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
            />
            <button onClick={getWeather}>Search</button>
        </div>
    );
};

export default Weather;
