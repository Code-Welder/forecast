import { $ } from "../utils/utils.js"

class ForecastSearch {
  _search = $('.js-forecast-search')
  _searchInp = this._search.querySelector('.search__inp')
  _searchBtn = this._search.querySelector('.search__btn')

  _onSearchHandlers = []

  constructor() {
    this._init()
  }

  onSearch = (cb) => {
    this._onSearchHandlers.push(cb)
  }

  _init() {
    this._searchInp.addEventListener('keydown', e => {
      const key = e.key

      if (key === 'Enter') {
        this._notifyHandlers(e.target.value)
        e.target.value = ''
      }

      if (key === 'Escape') {
        e.target.value = ''
      }
    })

    this._searchBtn.addEventListener('click', () => {
      this._notifyHandlers(this._searchInp.value)
      this._searchInp.value
    })
  }

  _notifyHandlers(val) {
    if (val !== '') this._onSearchHandlers.forEach(cb => cb(val))
  }
}

export const forecastSearch = new ForecastSearch()