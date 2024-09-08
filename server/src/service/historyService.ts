import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
// Complete the HistoryService class
class HistoryService {
  // Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('db/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf-8',
    });
  };
  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('db/searchHistory.json', JSON.stringify(cities, null, '\t'));
  }
  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let cityArray: City[];

      try {
        cityArray = [].concat(JSON.parse(cities));
      }
      catch (error) {
        cityArray = [];
      }

      return cityArray;
    });
  }
  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    if (!city) {
      console.error('City name is required!');
      return;
    }

    let cityHistory = await this.getCities(); 
    for (let cityH of cityHistory) {
      if (cityH.name === city) {
        return;
    }};

    const newCity: City = {
      id: uuidv4(),
      name: city,
    };

    return await this.getCities()
      .then((cities) => {
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then (() => newCity);
  }
  // * BONUS *
  // Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    let cityHistory = await this.getCities();
    let updatedCities = cityHistory.filter((city) => city.id !== id);
    return await this.write(updatedCities);
  }
}

export default new HistoryService();
