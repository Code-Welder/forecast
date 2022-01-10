// API
import { weatherApi } from "./api/Weather.js";
import { YandexMap } from "./api/YandexMap.js";
// MODULES
import { userCoord } from "./modules/UserCoord.js";
import { forecastSearch } from "./modules/ForecastSearch.js";
import { forecastView } from "./modules/ForecastView.js";

import { $, loadJson } from "./utils/utils.js";

const cityNamesPath = './js/json/cityNames.json'

const DEFAULT_CITY = {
  name: 'Moscow',
  coord: { lon: 37.6156, lat: 55.7522 },
}

class Forecast {
  _node = $('#forecast')
  _map = null
  _currCity = DEFAULT_CITY.name

  constructor() {
  }

  init = () => {
    userCoord.getByBrowser()
      .then(coord => {
        this._loadForecast({coord})
      })
      .catch(() => {
        // if user denied or something went wrong with browser api
        userCoord.getByGeoApi()
        .then(coord => {
          this._loadForecast({coord})
        })
        .catch(() => {
          this._loadForecast({cityName: this._currCity})
        })
      })

    loadJson(cityNamesPath)
      .then(cityNames => {
        forecastSearch.addHintList(cityNames)
      })

    forecastSearch.onSearch(
      (cityName) => {
        if (cityName.toLowerCase() !== this._currCity.toLowerCase()) {
          this._currCity = cityName

          this._loadForecast({cityName})
        } else {
          return
        }
    })
  }

  _loadForecast = async({cityName, coord}) => {
    this._makeRequest({cityName, coord})
      .then(forecast => {
        if (forecast) {
          this._insertForecastView(forecast)

          if (this._map) {
            this._map.setCenter(forecast.coord)
          } else {
            this._setMap(forecast.coord)
          }
        }
      })
      .catch(err => console.log(err))
  }

  _makeRequest = async({cityName, coord}) => {
    let forecast = null

    forecastView.onload()

    try {
      if (cityName) {
        forecast = await weatherApi.getByCityName(cityName)
      } else
      if (coord.lat && coord.lon) {
        forecast = await weatherApi.getByCoors(coord)
      }
      forecastView.hideAlert()
    } catch (error) {
      if (error.message.match('404').length > 0) {
        forecastView.showAlert('City not found')
      } else {
        forecastView.showAlert('Something went wrong')
        console.log(error);
      }
    } finally {
      setTimeout(() => {
        forecastView.removeOnload()
      }, 0);
    }

    return forecast
  }

  _setMap = (coord) => {
    this._map = new YandexMap({
      ...coord,
      parentNode: this._node.querySelector('#map')
    })
  }

  _insertForecastView = (forecast) => {
    forecastView.setForecast({
      cityName:  forecast.cityName,
      temp:      forecast.temp,
      feelsLike: forecast.feelsLike,
      descr:     forecast.descr,
      windSpeed: forecast.windSpeed,
      humidity:  forecast.humidity,
      icon:      forecast.icon,
    })
  }
}

export const forecast = new Forecast()