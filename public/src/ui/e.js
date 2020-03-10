function isEvent (eventName = '') {
  return /^on/gi.test(eventName)
}

export function e (htmlTag, attributes = {}, children = []) {
  const newElement = document.createElement(htmlTag)
  for (const [attName, attValue] of Object.entries(attributes)) {
    if (isEvent(attName)) {
      newElement[attName] = attValue
    } else {
      newElement.setAttribute(attName, attValue)
    }
  }
  for (const child of children) {
    let node = child
    if (typeof child === 'string') {
      node = document.createTextNode(child)
    }
    newElement.appendChild(node)
  }
  return newElement
}
