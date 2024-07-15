import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const cities = ["Lisboa", "Leiria", "Coimbra", "Porto", "Faro"];

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(0);
  const [unit, setUnit] = useState("metric");

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/weather?unit=${unit}`
        );
        console.log("Pedido com a opção: ", unit);
        console.log("Dados recebidos da API:", response.data);
        setWeatherData(response.data);
        setLastUpdated(Date.now());
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchWeatherData();

    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [unit]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Previsão Meteorológica</h1>
        <div>
          <label>
            Unidade:
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
        <p>Última atualização: {new Date(lastUpdated).toLocaleString()}</p>
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
        <p>
          Temperatura: {data}
          {unitSymbol}
        </p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default App;
