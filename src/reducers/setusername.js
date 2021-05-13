const setusername = (state = '', action) => {
  switch (action.type) {
    case 'SETUSERNAME': {
      return action.value
    }
    case 'REMOVEUSERNAME': {
      return ''
    }
    default: {
      return state
    }
  }
}

export default setusername
