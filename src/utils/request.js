import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log(getToken())
    config.headers.token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwMjgiLCJpc3MiOiJodHRwczovL2FpZG91LmNvbSIsImlhdCI6MTU3NTk4MjY4MSwiZXhwIjoxNTc4NTc0NjgxfQ.tZKIjEND2MN7d2o3WetS43dwAXGQaqc3rE5Xe_T5hLfu8Jk_A6XzkhqDmq0ivubOfCJ9krOailC5dlhP76V9lA'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.errno === 0) {
      return res.data
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
