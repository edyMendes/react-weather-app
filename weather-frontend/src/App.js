import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const cities = ["Lisboa", "Leiria", "Coimbra", "Porto", "Faro"];

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/weather");
        console.log("Dados recebidos da API:", response.data);
        const dataInCelsius = Object.fromEntries(
          Object.entries(response.data).map(([city, tempInKelvin]) => [
            city,
            (tempInKelvin - 273.15).toFixed(2),
          ])
        );
        setWeatherData(dataInCelsius);
        setLastUpdated(Date.now());
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchWeatherData();

    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000); // Atualiza a cada 30 minutos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Previsão Meteorológica</h1>
        <div className="widgets">
          {cities.map((city) => (
            <WeatherWidget key={city} city={city} data={weatherData[city]} />
          ))}
        </div>
        <p>Última atualização: {new Date(lastUpdated).toLocaleString()}</p>
      </header>
    </div>
  );
};

const WeatherWidget = ({ city, data }) => {
  return (
    <div className="weather-widget">
      <h2>{city}</h2>
      {data ? <p>Temperatura: {data}°C</p> : <p>Carregando...</p>}
    </div>
  );
};

export default App;
