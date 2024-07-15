const weatherService = require("../services/weatherService");

let cachedWeatherData = {};
let lastUpdated = 0;
const CACHE_DURATION = 30 * 60 * 1000;

const getWeather = async (req, res) => {
  const currentTime = Date.now();

  if (currentTime - lastUpdated > CACHE_DURATION) {
    console.log("Atualizando cache...");
    try {
      cachedWeatherData = await weatherService.getWeatherData();
      lastUpdated = currentTime;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    console.log("Usando dados em cache...");
  }

  res.json(cachedWeatherData);
};

module.exports = {
  getWeather,
};
