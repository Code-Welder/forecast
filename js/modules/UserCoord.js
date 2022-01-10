class UserCoord {
  /**
 * @returns object with user coords {lat, lon}
 */
  getByBrowser = () => {
    return new Promise((resolve, reject) => {
      navigator
        .geolocation
        .getCurrentPosition(
          // succes cb
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            })
          },
          // err cb
          (err) => {
            reject(err)
          },
          // options
          {
            enableHighAccuracy: true,
          }
        )
    })
  }
  /**
   * @returns object with user coords {lat, lon}
   */
  getByGeoApi = async() => {
    const response = await fetch('https://json.geoiplookup.io/')

    if (response.status === 200) {
      const json = await response.json()

      return {
        lon: json.longitude,
        lat: json.latitude,
      }
    } else {
      throw new Error(`server response cod: ${response.status}`)
    }
  }
}

export const userCoord = new UserCoord()