import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherWidget from "../components/WeatherWidget";
import Navbar from "../components/Navbar";

const cities = ["Lisboa", "Leiria", "Coimbra", "Porto", "Faro"];
const FETCH_INTERVAL = 30 * 60 * 1000; // 30 minutes

const HomePage = () => {
  const [weatherData, setWeatherData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeatherData = async (selectedUnit) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/weather?unit=${selectedUnit}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
      setError("Error fetching weather data");
      console.error("Error fetching data from the API:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWeatherData(unit);
    const interval = setInterval(() => fetchWeatherData(unit), FETCH_INTERVAL);

    return () => clearInterval(interval);
  }, [unit]);

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    fetchWeatherData(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="HomePage">
      <Navbar onLogout={handleLogout} />
      <header className="HomePage-header">
        <div className="header-actions">
          <label className="noselect">
            Unit:
            <select value={unit} onChange={handleUnitChange}>
              <option value="standard">Kelvin</option>
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </select>
          </label>
        </div>
      </header>
      <main className="content">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
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
        )}
        <p className="noselect">Last updated: {new Date(lastUpdated).toLocaleString()}</p>
      </main>
    </div>
  );
};

export default HomePage;
