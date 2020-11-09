import axios from 'axios'
import { message } from 'antd'

const baseURL = 'http://localhost:8080'

const instance = axios.create({
  baseURL: baseURL+'/api/v1',
  timeout: 7000,
  headers: {}
})

instance.interceptors.request.use(function (config) {
  // 加token
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})


instance.interceptors.response.use(function (response) {
  console.log('response', response)
  let res = null
  // 数据过滤
  if(response.data && response.data.err === 0) {
    res = response.data.data
  } else {
    message.error(response.data.msg)
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
