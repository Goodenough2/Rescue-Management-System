import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import { storeTypeController } from './store-manage/store-type'
import { storeController } from './store-manage/store'
import { areaTypeController } from './store-manage/area-type'
import { areaController } from './store-manage/area'
import { containerController } from './store-manage/container'
import { containerTypeController } from './store-manage/container-type'
import { cellSizeController } from './store-manage/cell-size'
import { cellTypeController } from './store-manage/cell-type'
import { cellController } from './store-manage/cell'
import { deviceController } from './store-manage/device'
import { goodsCategoryController } from './goods-manage/goods-category'
import { goodsUnitController } from './goods-manage/goods-unit'
import { goodsStorageModelController } from './goods-manage/goods-storageMode'
import { goodsColorController } from './goods-manage/goods-color'
import { goodsController } from './goods-manage/goods'
import { goodsLockedController } from './goods-manage/goods-locked'
import { customerController } from './order-manage/customer'
import { supplierController } from './order-manage/supplier'
import { orderTypeController } from './order-manage/order-type'
import { orderCustomerController } from './order-manage/order-customer'
import { userController } from './system-manage/user'
import { userGroupController } from './system-manage/user-group'
import { consolidationController } from './consolidation-manage/consolidation'
import { auditController } from './consolidation-manage/audit'
import { orderRequistController } from './goods-manage/order-requist'
import { goodsRequistController } from './goods-manage/goods-requist'
import { userLogController } from './business-query/userLog'
import { alarmInfosController } from './business-query/alarm-info'
import { goodsOperatorController } from './business-query/goods-operator'
import { moveStorageController } from './business-operation/move-storage'
import { goodsCheckController } from './business-operation/goods-check'
import { goodsPurchaseController } from './business-operation/goods-purchase'
import { orderController } from './order-manage/order'
import { vesselTypeController } from './store-manage/vessel-type'
import { orderPropertyController } from './order-manage/order-property'
import { goodsPropertyController } from './goods-manage/goods-property'
import { alarmGroupController } from './alarm-manage/alarm-group'
import { alarmTypeController } from './alarm-manage/alarm-type'
import { alarmInfoController } from './alarm-manage/alarm-info'
import { VesselController } from './store-manage/vessel'
import { goodsCategoryClassificationController } from './goods-manage/goods-category-classification'
import { orderDetailController } from './order-manage/order-detail'
import { orderMaterialController } from './order-manage/order-material'
import { requestDetailController } from './goods-manage/request-detail'

import account from './account'
import role from './role'

const mocks = [
  ...storeTypeController,
  ...storeController,
  ...areaTypeController,
  ...areaController,
  ...containerController,
  ...containerTypeController,
  ...cellSizeController,
  ...cellTypeController,
  ...cellController,
  ...deviceController,
  ...goodsCategoryController,
  ...goodsUnitController,
  ...goodsStorageModelController,
  ...goodsColorController,
  ...goodsController,
  ...goodsLockedController,
  ...customerController,
  ...supplierController,
  ...orderRequistController,
  ...goodsRequistController,
  ...orderTypeController,
  ...orderCustomerController,
  ...userGroupController,
  ...userController,
  ...consolidationController,
  ...auditController,
  ...userLogController,
  ...alarmInfosController,
  ...goodsOperatorController,
  ...moveStorageController,
  ...goodsCheckController,
  ...goodsPurchaseController,
  ...orderController,
  ...vesselTypeController,
  ...orderPropertyController,
  ...goodsPropertyController,
  ...alarmGroupController,
  ...alarmTypeController,
  ...alarmInfoController,
  ...VesselController,
  ...goodsCategoryClassificationController,
  ...orderDetailController,
  ...orderMaterialController,
  ...requestDetailController,
  ...account,
  ...role
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
