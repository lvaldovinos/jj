export class GeocodingService {
  constructor (output = 'json') {
    this.baseUrl = `https://maps.googleapis.com/maps/api/geocode/${output}`
  }
  async searchByAddress (address = '') {
    const { GEOCODING_API_KEY } = window.env
    const url = `${this.baseUrl}?address=${address}&key=${GEOCODING_API_KEY}`
    try {
      const response = await fetch(url)
      const { results } = await response.json()
      const [ firstResult ] = results
      return firstResult
    } catch (e) {
      throw e
    }
  }
}
