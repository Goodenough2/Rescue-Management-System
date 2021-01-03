import Mock from 'mockjs'
import { goodsCategories } from './goods-type'
import { goods } from './status'

// store_operate_type
const storeOperateTypes = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '扩展属性' + (i + 1),
    ioType: parseInt(Math.random() * 2),
    reverseId: '出库',
    canBeModifed: parseInt(Math.random() * 2),
    description: '扩展属性描述' + (i + 1),
    sort: i + 1
  })
  storeOperateTypes.push(data)
}
export { storeOperateTypes }

const storeRecords = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    storeOperateType: storeOperateTypes[(Math.random() * (storeOperateTypes.length > 10 ? 10 : storeOperateTypes.length) | 0)],
    ioType: parseInt(Math.random() * 2),
    goodsCategory: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)],
    goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    locationType: parseInt(Math.random() * 2),
    locationId: Mock.Random.guid().replace(/-/g, ''),
    quality: parseInt(Math.random() * 100),
    operatorTime: '2019-10-10 10:25:10',
    operatorId: Mock.Random.guid().replace(/-/g, ''),
    deliveryMan: '送货人' + (i + 1),
    description: '这是送货人' + (i + 1)
  })
  data.goodsBarCode = data.goods.goodsBarCode
  data.goodsRfidCode = data.goods.goodsRfidCode
  data.locationBarCode = data.goods.locationCode
  data.locationRfidCode = data.goods.locationRfidCode

  storeRecords.push(data)
}
export { storeRecords }
