import axios from 'axios'
import config from '@/../config/custom.env'
import * as toastr from './toastr'
import { account } from './tool'

import '@/mockjs/mack'

let instance = axios.create({
  baseURL: config.requestUrl,
  timeout: 35000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = account.getToken()
  config.headers.common['Authorization'] = token
    // 在发送请求之前做些什么
  return config
}, function (error) {
  console.log(error, '请求错误')
    // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  let resp = response.data
  if (resp.hasOwnProperty('success') && resp.success) {
    return resp.data
  }
  return Promise.reject(resp)
}, function (error) {
    // 对响应错误做点什么
  console.log(error, 'axios')
  return Promise.reject(error)
})

function hanldeReq (type, url, data, parms) {
  data = data || {}
  parms = parms || {}
  return new Promise((resolve, reject) => {
    instance.request({
      url: url,
      method: type,
      data: data,
      params: parms
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      toastr.error('错误提示', err.msg)
      return err
    })
  })
}

let g = (url, parms) => {
  return hanldeReq('get', url, {}, parms)
}

let p = (url, parms) => {
  return hanldeReq('post', url, parms)
}
let d = (url, params) => {
  return hanldeReq('delete', url, {}, params)
}

let put = (url, params) => {
  return hanldeReq('put', url, params)
}

let pa = (url, params) => {
  return hanldeReq('patch', url, params)
}

export {
  instance,
  g,
  p,
  d,
  pa,
  put,
  hanldeReq
}
