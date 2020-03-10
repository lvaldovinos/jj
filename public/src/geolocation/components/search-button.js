import { e } from '../../ui/e.js'
import { createObserver } from '../../ui/observer.js' 
import { dispatch } from '../../state-manager/main.js'
import { strToBoolean } from '../../util/str-to-boolean.js'
import { getDeviceLocation } from '../../util/geolocation.js' 
import { GeocodingService } from '../services/geocoding.js'

function setLocationAction (location) {
  return {
    type: 'LOCATION_CHANGE',
    location
  }
}

export class SearchButtonView extends HTMLElement {
  constructor () {
    super()
    this.getDeviceLocation = this.getDeviceLocation.bind(this)
    this.searchByAddress = this.searchByAddress.bind(this)
    this.search = this.search.bind(this)
    this.shadow = this.attachShadow({ mode: 'open' })
  }
  async getDeviceLocation () {
    try {
      const { coords } = await getDeviceLocation()
      dispatch(setLocationAction({
        latitude: coords.latitude,
        longitude: coords.longitude
      }))
    } catch (e) {
      if (e.code === 'NO_SUPPORT_LOCATION') {
        console.log('no support')
      }
      console.log('unknown issue: ', e)
    }
  }
  async searchByAddress () {
    this.geocodingService = new GeocodingService()
    const text = this.getAttribute('text')
    try {
      const { geometry } = await this.geocodingService.searchByAddress(text)
      dispatch(setLocationAction({
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
      }))
    } catch (e) {
      console.log('Error geocoding', e)
    }
  }
  async search () {
    const searchAddress = strToBoolean(this.getAttribute('searchaddress'))
    let search = this.getDeviceLocation
    if (searchAddress) {
      search = this.searchByAddress
    }
    await search()  
  }
  render () {
    const text = this.getAttribute('text')
    let button = this.shadow.querySelector('button')
    if (!button) {
      button = e('button', {
      onclick: this.search
    })
      button.textContent = text
      this.shadow.appendChild(button)
    }
    button.textContent = text
  }
  attributeChangedCallback (name) {
    this.render()
  }
  static get observedAttributes () {
    return ['text']
  }
}

customElements.define('search-button', SearchButtonView)

function searchAddressSelector ({ address = '' }) {
  return address.length > 0
}

function searchTextSelector (state) {
  if (searchAddressSelector(state)) {
    const { address } = state
    return `Search ${address}`
  }
  return 'Search device location'
}

function stateToAttrs (state) {
  return {
    text: searchTextSelector(state),
    searchaddress: searchAddressSelector(state)
  }
}

export const searchButton = createObserver(stateToAttrs)(SearchButtonView) 
