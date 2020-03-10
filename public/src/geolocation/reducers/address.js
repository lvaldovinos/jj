export function addressReducer (state = '', action) {
  switch (action.type) {
    case 'ADDRESS_CHANGE':
      state = action.value;
      return state
    default:
      return state
  }
}
