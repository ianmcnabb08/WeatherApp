const cors = require('cors');
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get('/api/weather/:city', async (req, res) => {
    try {
        console.log('Received request for city:', req.params.city);

        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: req.params.city,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric',
            },
        });

        console.log('Weather data received:', data);

        const temperatureCelsius = parseFloat(data.main.temp);
        const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32);

        // Send weather data to the client
        res.json({
            city: data.name,
            temperature: temperatureFahrenheit,
            description: data.weather[0].description,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});

app.get('/api/forecast/:city', async (req, res) => {
    try {
        console.log('Received request for forecast of city:', req.params.city);

        // Fetch 5-day forecast data
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: req.params.city,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric',
            },
        });

        // Extract high and low temperatures for each day
        const forecastList = data.list.reduce((acc, forecastItem) => {
            const date = forecastItem.dt_txt.split(' ')[0];
            const temperatureCelsius = parseFloat(forecastItem.main.temp);
            const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32);

            if (!acc[date]) {
                acc[date] = { high: temperatureFahrenheit, low: temperatureFahrenheit };
            } else {
                acc[date].high = Math.max(acc[date].high, temperatureFahrenheit);
                acc[date].low = Math.min(acc[date].low, temperatureFahrenheit);
            }

            return acc;
        }, {});

        // Convert the forecastList object into an array for simplicity
        const forecastArray = Object.entries(forecastList).map(([date, temperatures]) => ({
            date,
            high: temperatures.high,
            low: temperatures.low,
        }));

        // Send forecast data to the client
        res.json({
            forecast: forecastArray,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching forecast data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
