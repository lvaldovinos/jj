export function locationReducer (state = null, action ) {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      return {
        ...action.location
      }
    default:
      return state
  }
}
