import Mock from 'mockjs'
import { goodsCategories } from './goods-type'
import { goodsStorageModes } from './goods-type'
import { users } from './system'
import { orders } from './order'
import { cells } from './warehouse'

const goods = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    goodsRfidCode: '货物RFID' + (i + 1),
    goodsBarCode: '货物条形码' + (i + 1),
    goodsCategory: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)],
    goodsStorageMode: goodsStorageModes[(Math.random() * (goodsStorageModes.length > 10 ? 10 : goodsStorageModes.length) | 0)],
    quality: parseInt(Math.random() * 100),
    qualityLocked: parseInt(Math.random() * 100),
    locationType: parseInt(Math.random() * 3),
    locationId: cells[(Math.random() * (cells.length > 10 ? 10 : cells.length) | 0)],
    locationBarCode: parseInt(Math.random() * 1000000),
    locationRfidCode: parseInt(Math.random() * 1000000),
    locked: parseInt(Math.random() * 3),
    inspectionResult: parseInt(Math.random() * 2),
    inspectionTime: '2019-10-10 10:20:15',
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    updateTime: '2019-11-2 10:20:15',
    lastUser: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
  })
  data.goodsCategoryId = data.goodsCategory.id
  data.storageModeId = data.goodsStorageMode.id
  data.inspectorId = data.user.id
  data.operatorId = data.lastUser.id
  goods.push(data)
}
export { goods }

const goodsLocks = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    quality: parseInt(Math.random() * 100),
    lockType: parseInt(Math.random() * 2),
    order: orders[(Math.random() * (orders.length > 10 ? 10 : orders.length) | 0)],
    reason: '锁定原因' + (i + 1),
    lockTime: '2019-10-10 10:10:10',
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)]
  })
  data.goodsId = data.goods.id
  data.orderId = data.order.id
  data.operatorId = data.user.id
  goodsLocks.push(data)
}
export { goodsLocks }

const storageinfos = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    elementType: parseInt(Math.random() * 4),
    element: cells[(Math.random() * (cells.length > 10 ? 10 : cells.length) | 0)],
    supportingCur: 10000,
    count: 0,
    full: parseInt(Math.random() * 2),
    rfidCode: 'sdfagh',
    barCode: 'sghahd',
    sort: i + 1
  })
  data.elementId = data.element.id


  data.parentId = data.element.containerId
  storageinfos.push(data)
}
export { storageinfos }
