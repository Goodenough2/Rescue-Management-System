import Mock from 'mockjs'
import responses from '../responses'
import { goods } from '../databases/status'
import { goodsCategories,goodsStorageModes } from "../databases/goods-type";
import { getUrlSection } from '../utils'
import {users} from "../databases/system";

export const goodsController = [
  // 获取列表数据（查询、翻页）
  {
    url: '/goods/list',
    type: 'post',
    response: config => {
      try {
        const { current = 1, size = 20 } = config.body.page
        const { property, direction } = config.body.sort
        const { goodsCategoryId, storageModeId, locationType, locked, inspectionResult,inspectorId   } = config.body.query

        // 查询
        const queryList = goods.filter(item => {
          if (goodsCategoryId && item.goodsCategoryId !== goodsCategoryId) return false
          if (storageModeId && item.storageModeId !== storageModeId) return false
          if (locationType && item.locationType !== locationType * 1) return false
          if (locked && item.locked !== locked * 1) return false
          if(inspectionResult && item.inspectionResult !== inspectionResult * 1) return false
          if(inspectorId && item.inspectorId !== inspectorId) return false
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
            //     name,
            //     typeId,
            //     type,
            //     batch,
            //     specification,
            //
            //   }) => (
            //   {
            //     id,
            //     code,
            //     name,
            //     typeId,
            //     type: { name: type.name, code: type.code },
            //     batch,
            //     specification,
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
    url: '/goods/[\\w\\d]{32}/detail',
    type: 'get',
    response: config => {
      try {
        const id = getUrlSection(config.url, 2)
        const data = goods.find(item => item.id === id)
        if (data) {
          return {
            ...responses.success,
            // 在涉及不应给用户看到的重要数据时，也应抽取相应的属性及数据，不应返回全部数据
            data // 返回所有数据
            // data:
            //   {
            //     id: data.id,
            //     code: data.code,
            //     name: data.name,
            //     typeId: data.typeId,
            //     type: { name: data.type.name, code: data.type.code },
            //     batch: data.batch,
            //     specification: data.specification,
            //     fabrics: data.fabrics,
            //     washWeight: data.washWeight,
            //     washWidth: data.washWidth,
            //     unitConsumption: data.unitConsumption,
            //     wastage: data.wastage
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
    url: '/goods/selectlist',
    type: 'get',
    response: config => {
      try {
        const data = goods.map(({ id, goodsCategory: { name } }) => ({ id, goodsCategory: { name } }))
        return { data, ...responses.success }
      } catch {
        return { ...responses.getDataFailure }
      }
    }
  },

  // 添加数据
  {
    url: '/goods/create',
    type: 'post',
    response: config => {
      try {
        const data = config.body

        // id
        data.id = Mock.Random.guid().replace(/-/g, '')
        data.goodsCategory = goodsCategories.find(item => item.id === data.goodsCategoryId)
        data.goodsStorageMode = goodsStorageModes.find(item=> item.id === data.storageModeId)
        data.inspectorId = users.find(item=> item.id === data.inspectorId)
        data.locked = 0
        data.qualityLocked = 0
        goods.push(data)
        return { ...responses.createSuccess }
      } catch {
        return { ...responses.createFailure }
      }
    }
  },

  // 排序上移
  {
    url: '/goods/[\\w\\d]{32}/rankup',
    type: 'patch',
    response: config => {
      try {
        const id = getUrlSection(config.url, 2)
        const data = goods.find(item => item.id === id)
        // 此处应为同一仓库类别下的仓库排序移动，不同类别下的仓库，sort值没有比较依据
        // 因mock数据的问题，此处未实现同一仓库类别下的仓库排序上移功能
        const prevDatas = goods.filter(item => item.sort < data.sort)
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
    url: '/goods/update',
    type: 'put',
    response: config => {
      try {
        const data = config.body
        const oldData = goods.find(item => item.id === data.id)
        if (!oldData) return { ...responses.updateDataNotFound }

        // // 冲突检测
        // if (goods.some(item => item.name === data.name && item.id !== data.id)) {
        //   return { ...responses.updateConflict, message: '已存在同名的货物' }
        // }

        // 需要更新的字段，不采取整个对象更新的方式
        oldData.goodsCategoryId = data.goodsCategoryId
        oldData.goodsStorageModeId = data.goodsStorageModeId
        oldData.quality = data.quality
        oldData.inspectorId = data.inspectorId
        oldData.locationId = data.locationId
        oldData.goodsBarCode = data.goodsBarCode
        oldData.goodsRfidCode = data.goodsRfidCode

        if (oldData.goodsCategoryId !== data.goodsCategoryId) {
          oldData.goodsCategory = goodsCategories.find(item => item.id === data.goodsCategoryId)
        }

        if (oldData.storageModeId !== data.storageModeId) {
          oldData.goodsStorageMode = goodsStorageModes.find(item => item.id === data.storageModeId)
        }

        if (oldData.locationId !== data.locationId) {
          oldData.locationId = cells.find(item => item.id === data.locationId)
        }

        return { ...responses.updateSuccess }
      } catch {
        return { ...responses.updateFailure }
      }
    }
  },

  // 删除、批量删除数据
  {
    url: '/goods/delete',
    type: 'delete',
    response: config => {
      try {
        const { ids } = config.body
        let notFoundCount = 0
        let hasAssociatedDataCount = 0
        let message = ''
        for (const id of ids) {
          const index = goods.findIndex((item) => {
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

          goods.splice(index, 1)
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
