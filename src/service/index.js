import axios from 'axios'

const postInstance = axios.create({
  method: 'post',
  baseURL: 'http://localhost:8080',
  timeout: 1000,
})

export function signUp({ username, account, password, email, setResponse }) {
  postInstance
    .post('/user/signup', {
      Username: username,
      Account: account,
      Password: password,
      Email: email,
    })
    .then(function (response) {
      setResponse({ ...response.data, status: response.status })
    })
    .catch(function (error) {
      if (error.message === 'Network Error') {
        console.log(error.message)
      } else {
        const resp = JSON.parse(error.request.response)
        setResponse({ ...resp, status: error.request.status })
      }
    })
}
