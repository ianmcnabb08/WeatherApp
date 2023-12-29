// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css'
import Main from './views/Main';
import WeatherDetails from './components/WeatherDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Your+Selected+Font" />
      </head>
        <Routes>
            <Route element={<Main />} path="/" exact />
            <Route element={<WeatherDetails />} path="/details/:city" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
