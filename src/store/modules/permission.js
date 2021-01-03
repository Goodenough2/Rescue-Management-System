import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param access
 */
export function filterAsyncRoutes(routes, access) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (access[route.name] && access[route.name].allow) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, access[route.name])
      }
      res.push(tmp)
    }
    // if (tmp.children) {
    //   tmp.children = filterAsyncRoutes(tmp.children, access[route.name])
    // }
    // res.push(tmp)
  })
  return res
}

// let s = ''
// export function filterAsyncRoutes(routes, access, level,parentId) {
//   let sort = 1
//   const res = []
//   routes.forEach(route => {
//     const tmp = { ...route }
//     let id=''
//     if(level==1)id='0'+sort+'000000000000000000000000000000'
//     else id=parentId.substr(0,3)+sort+'0000000000000000000000000000'
//     s +=id+' '+parentId+' ' + tmp.name + ' ' + (tmp.meta?(tmp.meta.title?tmp.meta.title:''):'') + ' '+ level + ' ' + sort + '\r\n'
//     sort++
//     if (tmp.children) {
//       tmp.children = filterAsyncRoutes(tmp.children, access[route.name], level + 1,id)
//     }
//     else{
//       s +=id.substr(0,5)+'100000000000000000000000000'+' '+id+' view 浏览 3 1'+'\r\n'
//       s +=id.substr(0,5)+'200000000000000000000000000'+' '+id+' create 添加 3 2'+'\r\n'
//       s +=id.substr(0,5)+'300000000000000000000000000'+' '+id+' update 修改 3 3'+'\r\n'
//       s +=id.substr(0,5)+'400000000000000000000000000'+' '+id+' delete 删除 3 4'+'\r\n'
//       s +=id.substr(0,5)+'500000000000000000000000000'+' '+id+' detail 详情 3 5'+'\r\n'
//       s +=id.substr(0,5)+'600000000000000000000000000'+' '+id+' import 导入 3 6'+'\r\n'
//       s +=id.substr(0,5)+'700000000000000000000000000'+' '+id+' export 导出 3 7'+'\r\n'
//     }
//     res.push(tmp)
//   })
//   return res
// }

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, access) {
    return new Promise(resolve => {
      let accessedRoutes = []
      accessedRoutes = filterAsyncRoutes(asyncRoutes, access)
      // accessedRoutes = asyncRoutes
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
