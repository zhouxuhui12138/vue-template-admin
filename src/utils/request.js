import axios from "axios"
import { MessageBox, Message } from "element-ui"
import store from "@/store"
import { getToken } from "@/utils/auth"

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 携带的token
      config.headers["token"] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 20000 && res.code !== 200) {
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload()
          })
        })
      }

      console.log(res)
      return Promise.reject(new Error(res.data || res.message || "Error"))
    } else {
      return res
    }
  },
  error => {
    console.log(error) // for debug
    if (error.message.includes('timeout')) {
      error.message = '网络异常'
    }

    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
