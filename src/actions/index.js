export const logIn = {
  type: 'LOGIN',
}

export const logOut = {
  type: 'LOGOUT',
  username: '',
}

export const switchTab = value => ({
  type: 'SWITCH_TAB',
  value: value,
})

export const setUID = value => ({
  type: 'SETUID',
  value: value,
})

export const removeUID = {
  type: 'REMOVEUID',
}

export const setUsername = value => ({
  type: 'SETUSERNAME',
  value: value,
})

export const removeUsername = {
  type: 'REMOVEUSERNAME',
}
