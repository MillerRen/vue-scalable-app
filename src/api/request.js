import nprogress from 'nprogress'
import axios from 'axios'
import { BASE_URL, TOKEN_NAME } from '../constants/env'

const instance = axios.create()

instance.defaults.baseURL = BASE_URL + 'api'
instance.defaults.headers.common.Authorization = localStorage.getItem(TOKEN_NAME)

instance.interceptors.request.use(function (config) {
  nprogress.start()
  return config
})
instance.interceptors.response.use(function (response) {
  nprogress.done()
  return response.data
})

export default instance
