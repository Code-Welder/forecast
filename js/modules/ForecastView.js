import { $, getLocalDateStr } from "../utils/utils.js";

class ForecastView {
  _alert = $('[data-forecast-alert]')
  _alertMsg = this._alert.querySelector('.alert-msg')
  _closeAlertBtn = this._alert.querySelector('.close-alert')

  _city = $('[data-forecast-city]')
  _date = $('[data-forecast-date]')

  _weatherContainer = $('.weather')
  _weatherIcon = $('.js-weather-icon')

  _temp   = $('[data-weather-temp]')
  _feels  = $('[data-weather-feels]')
  _descr  = $('[data-weather-descr]')

  _windSpeed = $('[data-wind-speed]')
  _humidity  = $('[data-humidity]')

  constructor() {
    this._setDate()

    this._closeAlertBtn.addEventListener('click', () => {
      this.hideAlert()
    })
  }

  setForecast({cityName, temp, feelsLike, descr, windSpeed, humidity, icon}) {
    this._setDate()

    this._weatherIcon.src = `./assets/weather-icons/${icon.slice(0, 2)}d.svg`

    this._windSpeed.textContent = windSpeed
    this._humidity.textContent  = humidity
    this._city.textContent      = cityName
    this._temp.textContent      = temp
    this._feels.textContent     = feelsLike
    this._descr.textContent     = descr
  }

  showAlert(msg) {
    if (msg) {
      this._alertMsg.textContent = msg
      this._alert.classList.remove('hidden')
    }
  }

  hideAlert() {
    this._alert.classList.add('hidden')
  }

  onload() {
    this._weatherContainer.classList.add('onload')
  }

  removeOnload() {
    this._weatherContainer.classList.remove('onload')
  }

  _setDate = (date = getLocalDateStr()) => {
    this._date.textContent = date
  }
}

export const forecastView = new ForecastView()