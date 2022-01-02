import nprogress from 'nprogress'
import axios from 'axios'
import { BASE_URL } from '../constants/env'

const instance = axios.create()

instance.defaults.baseURL = BASE_URL + 'api'

instance.interceptors.request.use(function (config) {
  nprogress.start()
  return config
})
instance.interceptors.response.use(function (response) {
  nprogress.done()
  return response.data
})

export default instance
