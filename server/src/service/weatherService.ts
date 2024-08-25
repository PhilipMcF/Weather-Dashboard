import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
interface Weather {
  city: string;
  date: string;
  icon: string;
  description: string;
  temp: number;
  wind: number;
  humidity: number;
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and geoURL properties
  baseURL: string;
  apiKey: string;
  geoURL: string; //what to do with this?

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.geoURL = process.env.GEO_URL || '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    let response = await fetch(`${this.geoURL}${query}&limit=5&appid=${this.apiKey}`);
    return response;
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    let coordinates: Coordinates = {
      lat: locationData.lat,
      lon: locationData.lon,
    };
    console.log(coordinates);
    return coordinates;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() { }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    let response = await fetch(`${this.baseURL}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`);
    return response;
  }
  // TODO: Build buildCurrentWeather method
  private buildCurrentWeather(weatherData: any) {
    let currentWeather: Weather = {
      city: weatherData.city.name,
      date: weatherData.list[0].dt_txt.slice(0, 9),
      icon: weatherData.list[0].weather[0].icon,
      description: weatherData.list[0].weather[0].description, 
      temp: weatherData.list[0].main.temp,
      wind: weatherData.list[0].wind.speed,
      humidity: weatherData.list[0].main.humidity,
    }

    return currentWeather;
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any) {
    
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      let geoResponse = await this.fetchLocationData(city);
      let geoData = await geoResponse.json();
      let geoCoordinates = this.destructureLocationData(geoData[0]);

      let weatherResponse = await this.fetchWeatherData(geoCoordinates);
      let cityWeather = await weatherResponse.json();
      return cityWeather;
    }
    catch (error) {
      console.log(`There was an error ${error}`);
    }
  }
}

export default new WeatherService();
