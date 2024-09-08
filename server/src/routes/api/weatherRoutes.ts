import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async(req, res) => {
  // GET weather data from city name
  try {
    let city = req.body.cityName;
    //save city to search history
    HistoryService.addCity(city);

    let cityWeather = await WeatherService.getWeatherForCity(city);

    res.send(cityWeather);
  }
  catch (error) {
    console.error(`There was an error: ${error}`);
  }
});

// GET search history
router.get('/history', async (_req, res) => {
  try {
    let cityHistory = await HistoryService.getCities();
    res.send(cityHistory);
  }
  catch (error){
    console.error(`There was an error: ${error}`);
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    let id = req.params.id;
    await HistoryService.removeCity(id);
    res.sendStatus(204);
  }
  catch (error) {
    console.error(`There was an error: ${error}`);
  }
});

export default router;
