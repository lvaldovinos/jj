import { e } from '../../ui/e.js'
import { searchButton } from './search-button.js'
import { mapImg } from './map-img.js'
import { dispatch } from '../../state-manager/main.js'

function changeAddressAction (address) {
  return {
    type: 'ADDRESS_CHANGE',
    value: address
  }
}

export class GeolocationApp extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.onAddressChange = this.onAddressChange.bind(this)
    this.render()
  }
  onAddressChange (e) {
    dispatch(changeAddressAction(e.target.value))
  }
  render () {
    const input = e('input', {
      type: 'text',
      oninput: this.onAddressChange
    }) 
    this.shadow.appendChild(input)
    this.shadow.appendChild(searchButton)
    this.shadow.appendChild(mapImg)
  }
}

customElements.define('geolocation-app', GeolocationApp)
