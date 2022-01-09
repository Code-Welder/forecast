export class YandexMap {
  _parentNode = null
  _placemark = null
  _coords = []
  _map = null

  constructor({lat, lon, parentNode}) {
    this._coords = [lat, lon]
    this._parentNode = parentNode

    if (this._coords.length > 0) {
      ymaps.ready(this._init)
    }
  }

  setCenter({lat, lon}) {
    if (this._map !== null) {
      this._coords = [lat, lon]
      this._removePlacemark()
      this._map.setCenter(this._coords)
      this._addPlacemark()
    }
  }

  _init = () => {
    this._map = new ymaps.Map(this._parentNode, {
      center: this._coords,
      zoom: 10,
      controls: ['zoomControl']
    })

    this._addPlacemark()
  }

  _addPlacemark = () => {
    this._placemark = new ymaps.Placemark(this._coords)

    if (this._map !== null) {
      this._map.geoObjects
        .add(this._placemark)
    }
  }

  _removePlacemark = () => {
    if (this._map !== null) {
      this._map.geoObjects
        .remove(this._placemark)
    }
  }
}