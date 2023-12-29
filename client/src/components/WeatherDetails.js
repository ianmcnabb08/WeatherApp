// WeatherDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const WeatherDetails = () => {
    const { city } = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const navigate = useNavigate();

    const formatShortDate = (dateString) => {
        const options = { month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const fetchWeatherDetails = async () => {
            try {
                const weatherResponse = await axios.get(`/api/weather/${city}`);
                setWeatherData(weatherResponse.data);

                // Fetch 5-day forecast
                const forecastResponse = await axios.get(`/api/forecast/${city}`);
                setForecastData(forecastResponse.data.forecast);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeatherDetails();
    }, [city]);

    const navigateToHome = () => {
        navigate('/');
    };

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-details">

            <div id='header'>
                <h1>Weather<span id='detail-city'>App</span></h1>
                <button onClick={navigateToHome} id='home-button'>Home</button>
            </div>
            <div id='city-weather'>
                <h1>Today's Weather In <span id='detail-city'>{weatherData.city}</span></h1>
                <h2>Temperature: <span id='detail-temp'>{weatherData.temperature}°F</span></h2>
                <h2>Current Conditions: <span id='detail-conditions'>{weatherData.description}</span></h2>
            </div>

            {forecastData && (
                <div className="forecast" >
                    <h1 id='forecast-header'>5-Day Forecast</h1>
                    <table id="forecast">
                        <thead>
                            <tr>
                                <th><h3>Date</h3></th>
                                <th><h3>High (°F)</h3></th>
                                <th><h3>Low (°F)</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.map((forecastItem) => (
                                <tr key={forecastItem.date}>
                                    <td><h4>{formatShortDate(forecastItem.date)}</h4></td>
                                    <td><h4>{Math.round(forecastItem.high)}°F</h4></td>
                                    <td><h4>{Math.round(forecastItem.low)}°F</h4></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WeatherDetails;
