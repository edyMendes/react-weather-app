const weatherService = require("../services/weatherService");

let cachedWeatherData = {
  standard: {},
  metric: {},
  imperial: {},
};
let lastUpdated = {
  standard: 0,
  metric: 0,
  imperial: 0,
};
const CACHE_DURATION = 30 * 60 * 1000;

const getWeather = async (req, res) => {
  const unit = req.query.unit || "standard";
  const currentTime = Date.now();

  if (
    currentTime - lastUpdated[unit] > 30 * 60 * 1000 ||
    !cachedWeatherData[unit]
  ) {
    console.log(`Buscando novos dados da API para unidade ${unit}`);
    cachedWeatherData[unit] = await weatherService.getWeatherData(unit);
    lastUpdated[unit] = currentTime;
  }

  res.json(cachedWeatherData[unit]);
};

module.exports = {
  getWeather,
};
