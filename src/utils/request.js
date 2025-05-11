import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://localhost:9528', // url = base url + request url
  // baseURL: 'http://localhost:8888/api/v1',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  withCredentials: true // 允许携带cookie
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      config.headers['Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const responseState = {

  // 成功
  // 2---，添加201-，删除202-，更新203-，获取204-，排序205-,  登录206-,  导入207-， 导出208-
  success: 20000,
  loginSuccess: 20001,
  logoutSuccess: 20002,
  createSuccess: 20003,
  deleteSuccess: 20004,
  updateSuccess: 20005,
  rankSuccess: 20500,
  importSuccess: 20700,
  exportSuccess: 20600,
  // 失败 未知的、catch的
  // 5---，添加501-，删除502-，更新503-，获取504-，排序505-,  登录506-,  导入507-， 导出508-
  failure: 50000,
  usernameNotFailure: 50001,
  passwordWrongFailure: 50002,
  usernameConflictFailure: 50003,
  createConflictFailure: 50004,
  updateConflictFailure: 50005,
  deleteFailure: 50006,
  noFaceDetecetedFailure: 50007,
  featueExtractFailure: 50008,
  createFailure: 50100,
  updateFailure: 50300,
  getDataFailure: 50400,
  rankFailure: 50500,
  loginFailure: 50600,
  importFailure: 50700,
  exportFailure: 50800,

  // 错误 已知的
  // 4---，账户401-，未找到404-，关联405--，冲突409-
  bad: 40000,
  noToken: 40003,
  tokenIllegal: 40002,
  tokenExpired: 40001,
  noPermission: 40004,
  loggedInOther: 40105,
  notFound: 40400,
  updataDataNotFound: 40430,
  rankupDataIsTop: 40431,
  exportDataNotFound: 40432,
  allDeleteDataNotFound: 40420,
  partialDeleteDataNotFound: 40421,
  dataAssociated: 40500,
  allDeleteDataAssociated: 40520,
  partialDeleteDataAssociated: 40521,
  deleteDataNotFoundOrAssociated: 40522,
  conflict: 40900,
  createConflict: 40910,
  updateConflict: 40930

}


// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  
  response => {
    console.log("1111")
    const res = response.data
    
    if (!('code' in res)) return res
    switch (res.code) {
      case responseState.success:
      case responseState.createSuccess:
      case responseState.deleteSuccess:
      case responseState.updateSuccess:
      case responseState.rankSuccess:
      case responseState.loginSuccess:
      case responseState.logoutSuccess:
      case responseState.importSuccess:
      case responseState.exportSuccess:
        if (res.message) {
          Message.success({ message: res.message, duration: 2000 })
        }
        break
      case responseState.failure:
      case responseState.usernameNotFailure:
      case responseState.usernameConflictFailure:
      case responseState.passwordWrongFailure:
      case responseState.createFailure:
      case responseState.deleteFailure:
      case responseState.updateFailure:
      case responseState.getDataFailure:
      case responseState.rankFailure:
      case responseState.loginFailure:
      case responseState.importFailure:
      case responseState.exportFailure:
      case responseState.createConflictFailure:
      case responseState.updateConflictFailure:
      case responseState.noFaceDetecetedFailure:
      case responseState.featueExtractFailure:
      case responseState.notFound:
      case responseState.updateDataNotFound:
      case responseState.allDeleteDataNotFound:
      case responseState.allDeleteDataAssociated:
      case responseState.createConflict:
      case responseState.updateConflict:
        if (res.message) {
          Message.error({ message: res.message, duration: 4000 })
        }
        return Promise.reject()
      case responseState.bad:
      case responseState.rankupDataIsTop:
      case responseState.exportDataNotFound:
      case responseState.partialDeleteDataNotFound:
      case responseState.partialDeleteDataAssociated:
      case responseState.deleteDataNotFoundOrAssociated:
        if (res.message) {
          Message.warning({ message: res.message, duration: 4000 })
        }
        return Promise.reject()
      case responseState.noToken:
        store.dispatch('account/resetToken').then(() => {
          location.reload()
        })
        break
      case responseState.tokenIllegal:
        MessageBox.alert('请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          store.dispatch('account/resetToken').then(() => {
            location.reload()
          })
        })
        break
      case responseState.tokenExpired:
        MessageBox.alert('您的账号已自动退出，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          store.dispatch('account/resetToken').then(() => {
            location.reload()
          })
        })
        break
      case responseState.loggedInOther:
        MessageBox.alert('您已在其他设备登录，若要在此设备使用系统，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          store.dispatch('account/resetToken').then(() => {
            location.reload()
          })
        })
        break
      case responseState.noPermission:
        MessageBox.alert('您当前已不具备访问权限，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          store.dispatch('account/resetToken').then(() => {
            location.reload()
          })
        })
        break
    }
    return res
  },
  error => {
    console.log('响应出错：', error) // 添加日志
    Message.error({ message: '请求发生错误', duration: 4000 })
    return Promise.reject(error)
  }
)

export default service
