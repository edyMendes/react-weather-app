// src/components/WeatherWidget.js
import React from "react";

const WeatherWidget = ({ city, data, unit }) => {
  const unitSymbols = {
    metric: "°C",
    imperial: "°F",
    standard: "K",
  };

  const unitSymbol = unitSymbols[unit];

  return (
    <div className="weather-widget">
      <h2 className="noselect">{city}</h2>
      {data ? (
        <div className="weather-details">
          <div className="temperature noselect">
            {data.temperature.toFixed(1)}
            {unitSymbol}
          </div>
          <p className="noselect">
            Max: {data.temp_max.toFixed(1)}
            {unitSymbol} / Min: {data.temp_min.toFixed(1)}
            {unitSymbol}
          </p>
          <div className="weather-description">
            <p className="noselect">{data.weather_description}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
