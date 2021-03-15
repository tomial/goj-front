export const logIn = {
  type: 'LOGIN',
}

export const logOut = {
  type: 'LOGOUT',
}

export const switchTab = value => ({
  type: 'SWITCH_TAB',
  value: value,
})
