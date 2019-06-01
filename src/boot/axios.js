import axios from 'axios'
import changeCase from 'change-object-case'

changeCase.options = { recursive: true, arrayRecursive: true }

axios.defaults.baseURL = 'http://192.168.15.5:3000'
axios.defaults.timeout = 5000
axios.defaults.transformResponse = [data => changeCase.camelKeys(JSON.parse(data))]

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}
