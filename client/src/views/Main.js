// Main.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Main() {
    const [city, setCity] = useState('');

    const fetchWeather = async () => {
        try {
        // Fetch weather data
        const { data: weatherResponse } = await axios.get(`/api/weather/${city}`);
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div className="main-container">
        <div className="city-selection" id='form'>
            <h1>Weather<span id='label-span'>App</span></h1>
            <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            id="city"
            />
            <Link to={`/details/${city}`}>
            <button onClick={fetchWeather} id="button">
                Get Weather
            </button>
            </Link>
        </div>
        </div>
    );
}

export default Main;
