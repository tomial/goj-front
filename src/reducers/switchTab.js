const switchTab = (state = 0, action) => {
  switch (action.type) {
    case 'SWITCH_TAB':
      return action.value
    default:
      return state
  }
}

export default switchTab
