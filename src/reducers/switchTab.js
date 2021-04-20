const switchTab = (state = 'index', action) => {
  switch (action.type) {
    case 'SWITCH_TAB':
      return action.value
    default:
      return state
  }
}

export default switchTab
