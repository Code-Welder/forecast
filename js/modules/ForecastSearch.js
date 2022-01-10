import { $ } from "../utils/utils.js"

class ForecastSearch {
  _search = $('.js-forecast-search')
  _searchInp   = this._search.querySelector('.search__inp')
  _searchBtn   = this._search.querySelector('.search__btn')
  _hintsListEl = this._search.querySelector('.hints-list')

  _onSearchHandlers = []
  _hintsList = []

  constructor() {
    this._init()
  }

  onSearch = (cb) => {
    this._onSearchHandlers.push(cb)
  }

  addHintList = (hintsList) => {
    this._hintsList = hintsList
  }

  _init = () => {
    this._searchInp.addEventListener('keyup', e => {
      const key = e.key
      const value = e.target.value.trim()

      if (value === '') {
        this._clearHintsListEl()
      } else {
        this._showHints(value)
      }

      if (key === 'Enter') {
        this._notifyHandlers(value)
        this._clearHintsListEl()
        e.target.value = ''
      }

      if (key === 'Escape') {
        e.target.value = ''
        this._clearHintsListEl()
      }
    })

    this._searchBtn.addEventListener('click', () => {
      this._notifyHandlers(this._searchInp.value.trim())
      this._clearHintsListEl()
      this._searchInp.value = ''
    })

    this._hintsListEl.addEventListener('click', e => {
      const hintEl = e.target.closest('.hints-list__item')

      if (hintEl) {
        this._notifyHandlers(hintEl.textContent)
        this._clearHintsListEl()
        this._searchInp.value = ''
      }
    })

    this._hintsListEl.addEventListener('keypress', e => {
      const hintEl = e.target.closest('.hints-list__item')

      if (hintEl) {
        this._notifyHandlers(hintEl.textContent)
        this._clearHintsListEl()
        this._searchInp.value = ''
      }
    })
  }

  _notifyHandlers = (val) => {
    if (val !== '') this._onSearchHandlers.forEach(cb => cb(val))
  }

  _showHints = (inpValue) => {
    if (this._hintsList.length === 0) return

    const activeHints = this._hintsList.filter(hint => hint.toLowerCase().includes(inpValue.toLowerCase()))

    this._clearHintsListEl()

    activeHints.forEach(activeHint => {
      this._hintsListEl.insertAdjacentHTML('beforeend', `<li class="hints-list__item" tabindex="0">${activeHint}</li>`)
    })
  }

  _clearHintsListEl = () => {
    this._hintsListEl.innerHTML = ''
  }
}

export const forecastSearch = new ForecastSearch()