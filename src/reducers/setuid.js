const setuid = (state = -1, action) => {
  switch (action.type) {
    case 'SETUID': {
      return action.value
    }
    case 'REMOVEUID': {
      return -1
    }
    default: {
      return state
    }
  }
}

export default setuid
