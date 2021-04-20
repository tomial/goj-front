const login = (state = window.localStorage.getItem('loggedIn'), action) => {
  switch (action.type) {
    case 'LOGIN': {
      window.localStorage.setItem('loggedIn', true)
      return true
    }
    case 'LOGOUT': {
      window.localStorage.setItem('loggedIn', false)
      return false
    }
    default:
      return state
  }
}

export default login
