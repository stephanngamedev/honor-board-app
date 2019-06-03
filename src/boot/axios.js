import axios from 'axios'
import changeCase from 'change-object-case'

changeCase.options = { recursive: true, arrayRecursive: true }

axios.defaults.baseURL = 'http://192.168.15.5:3000'
axios.defaults.timeout = 5000

axios.defaults.transformResponse = [data => {
  console.log(data)
  if (typeof data === 'string') {
    try {
      data = changeCase.camelKeys(JSON.parse(data))
    } catch (e) {}
  }
  return data
}]

axios.defaults.transformRequest = [(data, headers) => {
  headers['Content-Type'] = 'application/json;charset=utf-8'
  return JSON.stringify(changeCase.snakeKeys(data))
}]

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}
