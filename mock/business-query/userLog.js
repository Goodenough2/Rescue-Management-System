import Mock from 'mockjs'
import responses from '../responses'
import { userLogs } from '../database'
import {getUrlSection} from "../utils";

export const userLogController = [
  // 获取区域列表数据
  {
    url: '/userLog/list',
    type: 'post',
    response: config => {
      try {
        const { current = 1, size = 20 } = config.body.page
        const { property, direction } = config.body.sort
        const { code, loginTime, loginOutTime } = config.body.query
        // 查询
        const queryList = userLogs.filter(item => {
          // console.log("请求开始")
          // var loginTime = new Date(Date.parse(loginTime.replace(/-/g, "/")));
          // loginTime = loginTime.getTime()
          // console.log(loginTime)
          // var loginOutTime = new Date(Date.parse(loginOutTime.replace(/-/g, "/")));
          // loginOutTime = loginOutTime.getTime()
          // var loginTime1 = new Date(Date.parse(item.loginTime.replace(/-/g, "/")));
          // loginTime1 = loginTime1.getTime()
          // var loginOutTime1 = new Date(Date.parse(item.loginOutTime.replace(/-/g, "/")));
          // loginOutTime1 = loginTime1.getTime()
          if (code && item.user.code !== code) return false
          // if(loginTime && loginTime1 < loginTime ) return false
          // if(loginOutTime && loginOutTime1 > loginOutTime ) return false
          return true
        })
        console.log("useLog.js 输出queryList",queryList)
        // 排序 中文字符串由于node的原因，支持不好
        // 数据库表中若含有sort字段，则页面中任何列都不应有排序功能，数据应按照sort的值进行排序
        // 注意嵌套类别的排序。例如，此处应该是先按仓库类型的sort值进行排序，相同的情况下，在按照仓库的sort值进行排序
        // 因js不便进行多属性的排序，此处未实现
        // let sortList = queryList
        // if (property && (direction === 'ascending' || direction === 'descending')) {
        //   sortList = queryList.sort((a, b) => {
        //     let result = 0
        //     const getValue = new Function('obj', 'return obj.' + property)
        //     const valueA = getValue(a)
        //     const valueB = getValue(b)
        //     if (Number.isFinite(valueA)) {
        //       result = valueA - valueB
        //     } else {
        //       result = valueA.localeCompare(valueB, 'zh')
        //     }
        //     if (direction === 'descending') {
        //       result = -result
        //     }
        //     return result
        //   })
        // }

        // 翻页
        const pageList = queryList.filter((item, index) => index < size * current && index >= size * (current - 1))

        return {
          ...responses.success,
          data: {
            total: queryList.length,
            // 若前端列表页仅显示部分属性，则需抽取相应的属性及数据
            // 在涉及不应给用户看到的重要数据时，也应抽取相应的属性及数据，不应返回全部数据
            items: queryList // 返回所有数据
            // items: pageList.map((
            //   {
            //     id,
            //     code,
            //     areaType,
            //     areaTypeId,
            //     store,
            //     storeId,
            //     name,
            //     enable
            //   }) => (
            //   {
            //     id,
            //     code,
            //     areaType,
            //     areaTypeId,
            //     store,
            //     storeId,
            //     name,
            //     enable
            //   }))
          }
        }
      } catch {
        return { ...responses.getDataFailure }
      }
    }
  },

  // 根据id获取数据，兼顾detail和update时的获取数据
  {
    url: '/area/[\\w\\d]{32}/detail/',
    type: 'get',
    response: config => {
      // console.log(id)
      try {
        const id = getUrlSection(config.url, 2)
        const data = areas.find(item => item.id === id)
        if (data) {
          return {
            ...responses.success,
            // 在涉及不应给用户看到的重要数据时，也应抽取相应的属性及数据，不应返回全部数据
            // data // 返回所有数据
            data:
              {
                id: data.id,
                code: data.code,
                areaTypeId: data.areaTypeId,
                areaType: { name: data.areaType.name },
                storeId: data.storeId,
                store: { name: data.store.name },
                name: data.name,
                enable: data.enable
              }
          }
        } else {
          return { ...responses.notFound }
        }
      } catch {
        return { ...responses.getDataFailure }
      }
    }
  },


]
