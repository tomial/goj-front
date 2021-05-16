import axios from 'axios'

const postInstance = axios.create({
  method: 'post',
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 10000,
  headers: { 'accept-language': 'zh-CN' },
})

const getInstance = axios.create({
  method: 'get',
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  timeout: 3000,
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

export function getRole() {
  return getInstance.get('/user/role')
}

export function submitProblem(problem) {
  return postInstance.post('/problems/add', problem)
}

export function fetchProblemList(page, num) {
  return getInstance.get(`/problems?page=${page}&num=${num}`)
}

export function getProblemContent(id) {
  return getInstance.get(`/problems/${id}`)
}

export function submitCode(pid, code, language) {
  return postInstance.post(`/problems/judge`, {
    PID: pid,
    Code: code,
    Language: language,
  })
}

export function getSubmissions(pid) {
  return getInstance.get(`/problems/submission/${pid}`)
}
