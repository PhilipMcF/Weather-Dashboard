import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// Define a class for the Weather object
interface Weather {
  city: string;
  date: string;
  icon: string;
  description: string;
  temp: number;
  wind: number;
  humidity: number;
}
// Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and geoURL properties
  baseURL: string;
  geoURL: string;
  apiKey: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.geoURL = process.env.GEO_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }
  // Create fetchLocationData method
  private async fetchLocationData(query: string) {
    let response = await fetch(`${this.geoURL}${query}&limit=5&appid=${this.apiKey}`);
    return response;
  }
  // Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    let coordinates: Coordinates = {
      lat: locationData.lat,
      lon: locationData.lon,
    };
    return coordinates;
  }

  private async fetchWeatherData(coordinates: Coordinates) {
    let response = await fetch(`${this.baseURL}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`);
    return response;
  }
  // Build buildCurrentWeather method
  private buildCurrentWeather(weatherData: any) {
    let currentWeather: Weather = {
      city: weatherData.city.name,
      date: weatherData.list[0].dt_txt.slice(0, 10),
      icon: weatherData.list[0].weather[0].icon,
      description: weatherData.list[0].weather[0].description, 
      temp: weatherData.list[0].main.temp,
      wind: weatherData.list[0].wind.speed,
      humidity: weatherData.list[0].main.humidity,
    }
    return currentWeather;
  }
  // Complete buildForecastArray method
  private buildForecastArray(weatherData: any) {
    let forecastArray = [];
    let forecastData = weatherData.list;
    for (let day of forecastData) {
      let dayWeather: Weather = {
        city: weatherData.city.name,
        date: day.dt_txt.slice(0, 10),
        icon: day.weather[0].icon,
        description: day.weather[0].description, 
        temp: day.main.temp,
        wind: day.wind.speed,
        humidity: day.main.humidity,
      }
      let dayTime = day.dt_txt.slice(11, 19);
    
      if (dayTime === '12:00:00') {
        forecastArray.push(dayWeather);
      }
    }
    return forecastArray;
  }
  // Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      let geoResponse = await this.fetchLocationData(city);
      let geoData = await geoResponse.json();
      let geoCoordinates = this.destructureLocationData(geoData[0]);

      let weatherResponse = await this.fetchWeatherData(geoCoordinates);
      let weatherData = await weatherResponse.json();

      let cityWeather = [];
      let currentWeather = this.buildCurrentWeather(weatherData);
      cityWeather.push(currentWeather);
      let forecastArray = this.buildForecastArray(weatherData);
      cityWeather.push(forecastArray);

      return cityWeather;
    }
    catch (error) {
      console.log(`There was an error: ${error}`);
      return [];
    }
  }
}

export default new WeatherService();
