class WeatherAPI {
  constructor() {
    this._url = 'https://api.openweathermap.org/data/2.5/weather?'
    this._key = '9c727f2de77da6485708877073bc8d14'
    this._reqOptions = '&units=metric&lang=en' + `&appid=${this._key}`
  }

  getByCityName = async(cityName) => {
    const url = this._url + `q=${cityName}` + this._reqOptions
    const result = await this._fetch(url)

    return this._formatForecast(result)
  }

  getByCoors = async({lat, lon}) => {
    const url = this._url + `lat=${lat}&lon=${lon}` + this._reqOptions
    const result = await this._fetch(url)

    return this._formatForecast(result)
  }

  _formatForecast = (json) => {
    return {
      coord:      json.coord,
      cityName:   json.name,
      descr:      json.weather[0].description,
      feelsLike:  Math.ceil(json.main.feels_like),
      humidity:   json.main.humidity,
      icon:       json.weather[0].icon, // https://openweathermap.org/weather-conditions
      temp:       Math.ceil(json.main.temp),
      windSpeed:  (json.wind.speed).toFixed(1),
    }
  }

  _fetch = async(url) => {
    const response = await fetch(url)

    if (response.status === 200) {
      const json     = await response.json()
      return json
    } else {
      throw new Error(`server response cod: ${response.status}`)
    }
  }
}

const weatherApi = new WeatherAPI()

export {weatherApi}