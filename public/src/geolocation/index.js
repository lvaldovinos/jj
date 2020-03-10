import { GeolocationApp } from './components/geolocation-app.js' 
import { addressReducer } from './reducers/address.js'
import { locationReducer } from './reducers/location.js'
import { createStore, combineReducers, dispatch } from '../state-manager/main.js'
// create stores
createStore(combineReducers({
  address: addressReducer,
  location: locationReducer
}))
const cont = document.getElementById('app')
const geolocationApp = new GeolocationApp()
cont.appendChild(geolocationApp)
dispatch({})
