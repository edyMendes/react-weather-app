import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const cities = ["Lisboa", "Leiria", "Coimbra", "Porto", "Faro"];
const FETCH_INTERVAL = 30 * 60 * 1000;

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [unit, setUnit] = useState("metric");

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    fetchWeatherData(newUnit);
  };

  const fetchWeatherData = async (selectedUnit) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather?unit=${selectedUnit}`
      );

      const formattedData = {};
      cities.forEach((city) => {
        formattedData[city] = {
          temperature: response.data[city].main.temp,
          temp_min: response.data[city].main.temp_min,
          temp_max: response.data[city].main.temp_max,
          weather_main: response.data[city].weather[0].main,
          weather_description: response.data[city].weather[0].description,
        };
      });

      setWeatherData(formattedData);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(unit);
    const interval = setInterval(() => fetchWeatherData(unit), FETCH_INTERVAL);

    return () => clearInterval(interval);
  }, [unit]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meteorology</h1>
        <div>
          <label>
            Unit:
            <select value={unit} onChange={handleUnitChange}>
              <option value="standard">Kelvin</option>
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </select>
          </label>
        </div>
        <div className="widgets">
          {cities.map((city) => (
            <WeatherWidget
              key={city}
              city={city}
              data={weatherData[city]}
              unit={unit}
            />
          ))}
        </div>
        <p>Last updated: {new Date(lastUpdated).toLocaleString()}</p>
      </header>
    </div>
  );
};

const WeatherWidget = ({ city, data, unit }) => {
  const unitSymbol =
    unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K";
  return (
    <div className="weather-widget">
      <h2>{city}</h2>
      {data ? (
        <div className="weather-details">
          <div className="temperature">
            {data.temperature.toFixed(1)}
            {unitSymbol}
          </div>
          <p>
            Max: {data.temp_max.toFixed(1)}
            {unitSymbol} / Min: {data.temp_min.toFixed(1)}
            {unitSymbol}
          </p>
          <div className="weather-description">
            <p>{data.weather_description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
