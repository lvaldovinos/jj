import { e } from '../../ui/e.js'
import { createObserver } from '../../ui/observer.js'
import { strToBoolean } from '../../util/str-to-boolean.js'
const { GOOGLE_API_KEY } = window.env

export class MapImgView extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const style = e('link', {
      rel: 'stylesheet',
      href: '/src/geolocation/components/map-img.css'
    })
    this.shadow.appendChild(style)
  }
  render () {
    const showMap = strToBoolean(this.getAttribute('show'))
    let div = this.shadow.querySelector('div')
    if (!div) {
      div = e('div', {
        'class': 'default'
      })
      this.shadow.appendChild(div)
    }
    if (showMap) {
      const url = this.getAttribute('url')
      let img = this.shadow.querySelector('img')
      div.setAttribute('class', 'img-container')
      if (!img) {
        img = e('img', {
          alt: 'Location you searched',
          src: url
        })
        div.appendChild(img)
      }
      img.setAttribute('src', url)
    }
  }
  attributeChangedCallback () {
    this.render()
  }
  static get observedAttributes () {
    return [
      'show',
      'url'
    ]
  }
}

function isLocationSetSelector ({ location = null }) {
  return !Object.is(location, null) && !Object.is(location, undefined)
}

function mapUrlSelector (state) {
  const showMap = isLocationSetSelector(state)
  if (showMap) {
    const { location } = state
    return `https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:H%7C${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`
  }
}

function stateToAttrs (state) {
  return {
    show: isLocationSetSelector(state),
    url: mapUrlSelector(state)
  }
}

customElements.define('map-img', MapImgView)

export const mapImg = createObserver(stateToAttrs)(MapImgView)
