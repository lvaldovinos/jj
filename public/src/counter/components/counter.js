import { createObserver } from '../../ui/observer.js'

export class MyCounter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  update () {
    const count = this.getAttribute('count')
    const p = this.shadow.querySelector('p')
    if (!p) {
      const ele = document.createElement('p')
      ele.textContent = count
      this.shadow.appendChild(ele)
    } else {
      p.textContent = count      
    }
  }

  connectedCallback () {
    console.log('Rendered in dom')
    this.update()
  }

  attributeChangedCallback () {
    console.log('update attribute')
    this.update()
  }

  static get observedAttributes () {
    return ['count']
  }
}

customElements.define('my-counter', MyCounter)

const stateToAttrs = (state) => ({
  count: state.count
})

export const counter = createObserver(stateToAttrs)(MyCounter)
