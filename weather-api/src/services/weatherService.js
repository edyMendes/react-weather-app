const axios = require("axios");
const { cities } = require("../config");

const getWeatherData = async (unit = "standard") => {
  const weatherData = {};

  for (const city in cities) {
    if (cities.hasOwnProperty(city)) {
      const url = `http://api.openweathermap.org/data/2.5/forecast?id=${cities[city]}&appid=${process.env.API_KEY}&units=${unit}`;
      try {
        const response = await axios.get(url);
        weatherData[city] = response.data.list[0].main.temp;
      } catch (error) {
        console.error(`Erro ao obter dados para ${city}:`, error.message);
        throw new Error(`Erro ao obter dados para ${city}`);
      }
    }
  }

  return weatherData;
};

module.exports = {
  getWeatherData,
};
