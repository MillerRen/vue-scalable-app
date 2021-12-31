import nprogress from 'nprogress'
import axios from 'axios'

const instance = axios.create()
instance.interceptors.request.use(function (config) {
  nprogress.start()
  return config
})
instance.interceptors.response.use(function (response) {
  nprogress.done()
  return response
})

export default instance
