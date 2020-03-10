import { subscribe, unsubscribe, getState } from '../state-manager/main.js'

function updateAttrsToElement (stateToAttrs, element) {
    const state = getState()
    const props = stateToAttrs(state)
    for (const [attrName, attrValue] of Object.entries(props)) {
      element.setAttribute(attrName, attrValue)
    }
}

export class StateObserver extends HTMLElement {
  constructor (stateToAttrs = () => {}) {
    super()
    this.stateToAttrs = stateToAttrs
    this.shadow = this.attachShadow({ mode: 'open' })
  }
  connectedCallback () {
    this.listenerIndex = subscribe(() => {
      const firstChild = this.shadow.childNodes[0]
      updateAttrsToElement(this.stateToAttrs, firstChild)
    })
  }
  disconnectedCallback () {
    unsubscribe(this.listenerIndex)
  }
}

customElements.define('state-observer', StateObserver)

export function createObserver (stateToAttrs) {
  return function (Element) {
    const obs = new StateObserver(stateToAttrs)
    const element = new Element()
    obs.shadow.appendChild(element)
    return obs
  }
}
