// App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const { data } = await axios.get(`/api/weather/${city}`);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className={`city-cell ${weatherData ? 'active' : ''}`}>
        {weatherData ? (
          <h2>{weatherData.city}</h2>
        ) : (
          <h1>Weather App</h1>
        )}
      </div>
      {weatherData && (
        <div className={`weather-details ${weatherData ? 'active' : ''}`}>
          <p>Temperature: {weatherData.temperature}°F</p>
          <p>Description: {weatherData.description}</p>
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
    </div>
  );
}

export default App;
