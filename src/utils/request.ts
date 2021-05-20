import axios from 'axios'
import { ElMessage } from 'element-plus';
import store from '@/store'
import { getToken } from '@/utils/auth'
import user from '@/store/modules/user';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     ElMessage({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

const checkBrowser = () => {
  let browser: any = {}
  let userAgent = navigator.userAgent
  if (userAgent.indexOf('Opera') > -1) {
    browser.type = 'Opera'
  } else if (
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1
  ) {
    browser.type = 'Internet Explorer'
  } else if (userAgent.indexOf('Firefox') > -1) {
    browser.type = 'Firefox'
  } else if (userAgent.indexOf('Safari') > -1) {
    browser.type = 'Safari'
  }

  if (browser.type === 'Internet Explorer') {
    let reg = new RegExp('MSIE (\\d+.\\d+);')
    reg.test(userAgent)
    let version = parseFloat(RegExp['$1'])
    if (!isNaN(version)) browser.version = version
  }

  return browser
}
// 下载文件
export function downLoad(downloadUrl: any) {
  var browser:any = checkBrowser()
  if (browser.type === 'Internet Explorer') {
    var referLink = document.createElement('a')
    referLink.href = downloadUrl
    document.body.appendChild(referLink)
    referLink.click()
  } else {
    window.location.href = downloadUrl
  }
}

//下载文件   res.data 接口返回数据  res.headers.filename 文件名称
export function downLoadFile(res: any) {
  if(window.navigator && window.navigator.msSaveOrOpenBlob){
    let blob: any = new Blob([res.data])
    let name = res.headers.filename
    window.navigator.msSaveOrOpenBlob( blob, name);
  } else {
    let blob: any = new Blob([res.data])
   let link =document.createElement("a")
   link.href = window.URL.createObjectURL(blob)
   link.target ="blank"
   link.download = name
   document.body.appendChild(link)
   link.click()
   document.body.removeChild(link)
  }
}
