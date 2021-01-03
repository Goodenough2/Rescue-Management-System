import Mock from 'mockjs'
import responses from '../responses'
import { orders } from '../databases/order'
import { users } from '../databases/system'
import { customers } from "../databases/both"
import { getUrlSection } from '../utils'

export const orderController = [

  // 获取列表数据（查询、翻页）
  {
    url: '/order/list',
    type: 'post',
    response: config => {
      try {
        const { current = 1, size = 20 } = config.body.page
        const { property, direction } = config.body.sort
        const { code, customerName, createrName, status } = config.body.query

        // 查询
        const queryList = orders.filter(item => {
          if (code && !item.code.includes(code)) return false
          if (customerName && !item.customer.name.includes(customerName)) return false
          if (createrName && !item.user.uname.includes(createrName)) return false
          if (status && item.status !== status * 1) return false
          return true
        })

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
            items: pageList // 返回所有数据
            // items: pageList.map((
            //   {
            //     id,
            //     code,
            //     typeId,
            //     type,
            //     quality,
            //     amount,
            //     qualityForReal,
            //     amountForReal,
            //     statusId,
            //     status,
            //     customerId,
            //     customer,
            //     deliveryTime,
            //     operatorId,
            //     operator
            //
            //   }) => (
            //   {
            //     id,
            //     code,
            //     typeId,
            //     type: { name: type.name },
            //     quality,
            //     amount,
            //     qualityForReal,
            //     amountForReal,
            //     statusId,
            //     status:{ id:status.id, name: status.name },
            //     customerId,
            //     customer: { name: customer.name },
            //     deliveryTime,
            //     operatorId,
            //     operator: { unname: operator.unname }
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
    url: '/order/[\\w\\d]{32}/detail',
    type: 'get',
    response: config => {
      try {
        const id = getUrlSection(config.url, 2)
        const data = orders.find(item => item.id === id)
        if (data) {
          return {
            ...responses.success,
            // 在涉及不应给用户看到的重要数据时，也应抽取相应的属性及数据，不应返回全部数据
             data // 返回所有数据
            // data:
            //   {
            //     id: data.id,
            //     code: data.code,
            //     typeId: data.typeId,
            //     type: { name: data.type.name },
            //     quality: data.quality,
            //     amount: data.amount,
            //     qualityForReal: data.qualityForReal,
            //     amountForReal: data.amountForReal,
            //     statusId: data.statusId,
            //     status:{ id:status.id, name: status.name },
            //     customerId: data.customerId,
            //     customer: { name: data.customer.name },
            //     deliveryTime: data.deliveryTime,
            //     operatorId: data.operatorId,
            //     operator: { unname: data.operator.unname },
            //   }
          }
        } else {
          return { ...responses.notFound }
        }
      } catch {
        return { ...responses.getDataFailure }
      }
    }
  },

  // 获取下拉列表选项形式的数据
  {
    url: '/order/selectlist',
    type: 'get',
    response: config => {
      try {
        const data = orders.map(({ id, code }) => ({ id, code }))
        return { data, ...responses.success }
      } catch {
        return { ...responses.getDataFailure }
      }
    }
  },

  // 添加数据
  {
    url: '/order/create',
    type: 'post',
    response: config => {
      try {
        const data = config.body.order
        // 冲突检测
        if (orders.some(item => item.code === data.code)) {
          return { ...responses.createConflict, message: '已存在同名的订单编号' }
        }

        // id
        data.id = Mock.Random.guid().replace(/-/g, '')
        // orderType
        data.customer = customers.find(item => item.id === data.customerId)
        // data.order.customerId = data.customerId
        // data.order.amountDone = data.amountDone
        // data.order.amountPre = data.amountPre
        // data.order.deliveryTime = data.deliveryTime
        // data.order.description = data.description

        orders.push(data)
        return { data,...responses.createSuccess }
      } catch {
        return { ...responses.createFailure }
      }
    }
  },

  // 排序上移
  {
    url: '/order/[\\w\\d]{32}/rankup',
    type: 'patch',
    response: config => {
      try {
        const id = getUrlSection(config.url, 2)
        const data = orderCustomers.find(item => item.id === id)
        // 此处应为同一仓库类别下的仓库排序移动，不同类别下的仓库，sort值没有比较依据
        // 因mock数据的问题，此处未实现同一仓库类别下的仓库排序上移功能
        const prevDatas = orderCustomers.filter(item => item.sort < data.sort)
        if (prevDatas.length === 0) {
          return { ...responses.rankupDataIsTop }
        }
        const prev = prevDatas.sort((a, b) => {
          return b.sort - a.sort
        }).slice(0, 1)[0]
        const sort = data.sort
        data.sort = prev.sort
        prev.sort = sort
        return { ...responses.rankSuccess }
      } catch {
        return { ...responses.rankFailure }
      }
    }
  },

  // 更新数据
  {
    url: '/order/update',
    type: 'put',
    response: config => {
      try {
        const data = config.body
        const oldData = orderPurchases.find(item => item.id === data.id)
        if (!oldData) return { ...responses.updateDataNotFound }

       // 冲突检测
       //  if (orderPurchases.some(item => item.code === data.code)) {
       //    return { ...responses.updateConflict, message: '已存在同名的订单号' }
       //  }

        // 需要更新的字段，不采取整个对象更新的方式
        oldData.code = data.code
        oldData.typeId = data.typeId,
        oldData.quality = data.quality,
        oldData.qualityForReal = data.qualityForReal
        oldData.amount = data.amount
        oldData.amountForReal = data.amountForReal
        oldData.supplierId = data.supplierId
        oldData.contractCode = data.contractCode
        oldData.status = data.status
        oldData.customerOrder.code = data.customerOrder.code
        oldData.purchaseTime = data.purchaseTime
        oldData.operatorId = data.operatorId

        if (oldData.typeId !== data.typeId) {
          oldData.type = orderTypes.find(item => item.id === data.typeId)
        }
        if (oldData.supplierId !== data.supplierId) {
          oldData.supplier = suppliers.find(item => item.id === data.supplierId)
        }
        if (oldData.operatorId !== data.operatorId) {
          oldData.operator = users.find(item => item.id === data.operatorId)
        }
        oldData.typeId = data.typeId
        oldData.statusId = data.statusId
        oldData.supplierId = data.supplierId
        oldData.operatorId = data.operatorId

        return { ...responses.updateSuccess }
      } catch {
        return { ...responses.updateFailure }
      }
    }
  },

  // 删除、批量删除数据
  {
    url: '/order/delete',
    type: 'delete',
    response: config => {
      try {
        const { ids } = config.body
        let notFoundCount = 0
        let hasAssociatedDataCount = 0
        let message = ''
        for (const id of ids) {
          const index = orders.findIndex((item) => {
            return item.id === id
          })
          if (index < 0) {
            notFoundCount++
            continue
          }

          // 服务器端需要检测是否有多表关联的情况，若有，则不可删除
          // 并且记录message，提示详细问题
          // 此处未检测
          // eslint-disable-next-line no-constant-condition
          if (false) {
            hasAssociatedDataCount++
            if (!message) message = '……'
            continue
          }
          orders.splice(index, 1)
        }
        if (notFoundCount > 0 && hasAssociatedDataCount > 0) { // 部分数据不存在，部分数据有关联
          const res = responses.deleteDataNotFoundOrAssociated
          res.message += message
          return res
        } else if (notFoundCount === ids.length) { // 全部数据不存在。适用于删除或批量删除
          return { ...responses.allDeleteDataNotFound }
        } else if (notFoundCount > 0) { // 部分数据不存在
          return { ...responses.partialDeleteDataNotFound }
        } else if (hasAssociatedDataCount === ids.length) { // 全部数据存在关联。适用于删除或批量删除
          const res = responses.allDeleteDataAssociated
          res.message += message
          return res
        } else if (hasAssociatedDataCount > 0) { // 部分数据存在关联
          const res = responses.partialDeleteDataAssociated
          res.message += message
          return res
        } else {
          return { ...responses.deleteSuccess }
        }
      } catch {
        return { ...responses.deleteFailure }
      }
    }
  }
]
