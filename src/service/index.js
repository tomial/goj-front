import axios from 'axios'

const postInstance = axios.create({
  method: 'post',
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 1000,
  headers: { 'accept-language': 'zh-CN' },
})

const getInstance = axios.create({
  method: 'get',
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 1000,
  headers: { 'accept-language': 'zh-CN' },
})

export function signUp({ username, account, password, email }) {
  return postInstance.post('/user/signup', {
    Username: username,
    Account: account,
    Password: password,
    Email: email,
  })
}

export function login({ account, password }) {
  return postInstance.post('/user/login', {
    Identifier: account,
    Credential: password,
  })
}

export function retriveUsername() {
  let username = null
  getInstance.get('user/username').then(function (response) {
    username = response.data
  })
  return username
}

export function submitProblem(problem) {
  postInstance.post('/problems/add', problem).then(response => {
    console.log('成功添加')
  })
}
