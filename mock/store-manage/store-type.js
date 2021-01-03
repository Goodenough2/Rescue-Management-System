import Mock from 'mockjs'
import responses from '../responses'
import { storeTypes, stores } from '../database'

export const storeTypeController = [
  // 获取列表数据（查询、翻页）
  {
    url: '/storeType/list',
    type: 'get',
    response: config => {
      try {
        const { currentPage = 1, pageSize = 20, sortProperty, sortDirection } = config.query
        const { name } = config.query

        // 查询
        const queryList = storeTypes.filter(item => {
          if (name && !item.name.includes(name)) return false
          return true
        })

        // 排序 中文字符串由于node的原因，支持不好
        let sortList = queryList
        if (sortProperty && (sortDirection === 'ascending' || sortDirection === 'descending')) {
          sortList = queryList.sort((a, b) => {
            let result = 0
            const getValue = new Function('obj', 'return obj.' + sortProperty)
            const valueA = getValue(a)
            const valueB = getValue(b)
            if (Number.isFinite(valueA)) {
              result = valueA - valueB
            } else {
              result = valueA.localeCompare(valueB)
            }
            if (sortDirection === 'descending') {
              result = -result
            }
            return result
          })
        }

        // 翻页
        const pageList = sortList.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))

        return {
          ...responses.success,
          data: {
            total: queryList.length,
            // 若前端列表页仅显示部分属性，则需抽取相应的属性及数据
            // 在涉及不应给用户看到的重要数据时，也应抽取相应的属性及数据，不应返回全部数据
            // items: pageList // 返回所有数据
            items: pageList.map((
              {
                id,
                name
              }) => (
              {
                id,
                name
              }))
          }
        }
      } catch {
        return { ...responses.getDataFailure }
      }
    }
  },

  // 根据id获取数据，兼顾detail和update时的获取数据
  {
    url: '/storeType/detail',
    type: 'get',
    response: config => {
      try {
        const { id } = config.query
        const data = storeTypes.find(item => item.id === id)
        if (data) {
          return {
            ...responses.success,
            // 在涉及不应给用户看到的重要数据时，也应抽取相应的属性及数据，不应返回全部数据
            data // 返回所有数据
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
    url: '/storeType/selectlist',
    type: 'get',
    response: config => {
      try {
        const data = storeTypes.map(({ id, name }) => ({ id, name }))
        return { data, ...responses.success }
      } catch {
        return { ...responses.getDataFailure }
      }
    }
  },

  // 添加数据
  {
    url: '/storeType/create',
    type: 'post',
    response: config => {
      try {
        const data = config.body

        // 冲突检测
        if (storeTypes.some(item => item.name === data.name)) {
          return { ...responses.createConflict, message: '已存在同名的仓库类型' }
        }

        // id
        data.id = Mock.Random.guid().replace(/-/g, '')
        // prev item
        const prev = storeTypes.sort((a, b) => {
          return b.sort - a.sort
        }).slice(0, 1)[0]
        // sort次序
        data.sort = prev.sort + 1

        storeTypes.push(data)
        return { ...responses.createSuccess }
      } catch {
        return { ...responses.createFailure }
      }
    }
  },

  // 排序上移
  {
    url: '/storeType/rankup',
    type: 'patch',
    response: config => {
      try {
        const { id } = config.query
        const data = storeTypes.find(item => item.id === id)
        const prevDatas = storeTypes.filter(item => item.sort < data.sort)
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
    url: '/storeType/update',
    type: 'put',
    response: config => {
      try {
        const data = config.body
        const oldData = storeTypes.find(item => item.id === data.id)
        if (!oldData) return { ...responses.updateDataNotFound }

        // 冲突检测
        if (storeTypes.some(item => item.name === data.name && item.id !== data.id)) {
          return { ...responses.updateConflict, message: '已存在同名的仓库类型' }
        }

        // 需要更新的字段，不采取整个对象更新的方式
        oldData.name = data.name

        return { ...responses.updateSuccess }
      } catch {
        return { ...responses.updateFailure }
      }
    }
  },

  // 删除、批量删除数据
  {
    url: '/storeType/delete',
    type: 'delete',
    response: config => {
      try {
        const { ids } = config.query
        let notFoundCount = 0
        let hasAssociatedDataCount = 0
        let message = ''
        for (const id of ids) {
          const index = storeTypes.findIndex((item) => {
            return item.id === id
          })
          if (index < 0) {
            notFoundCount++
            continue
          }

          // 服务器端需要检测是否有多表关联的情况，若有，则不可删除
          // 并且记录message，提示详细问题
          console.log(stores.some(item => item.storeTypeId === id))
          if (stores.some(item => item.storeTypeId === id)) {
            hasAssociatedDataCount++
            if (!message) message = '删除的仓库类型下含有仓库'
            continue
          }

          storeTypes.splice(index, 1)
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

