import Mock from 'mockjs'
import { orderTypes } from '../database'
import { goodsCategories, goodsCategoryClassifications } from '../databases/goods-type'
import { users } from './system'

// 区域类型
const areaTypes = []
for (let i = 0; i < 100; i++) {
  areaTypes.push(Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '区域类型' + (i + 1),
    description: '这是区域' + (i + 1),
    sort: i + 1
  }))
}
export { areaTypes }

// 货柜类型
const containerTypes = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '货柜类型' + (i + 1),
    weight: 1000.00,
    supportingVal: 2000.00,
    lengthOfSelf: 20.00,
    widthOfSelf: 10.00,
    heightOfSelf: 10.00,
    volumnOfSelf: 2000.00,
    length: 10.00,
    width: 5.00,
    height: 5.00,
    volumn: 250.00,
    safetyFact: 0.9,
    sort: i + 1
  })
  containerTypes.push(data)
}
export { containerTypes }

// 单元格类型管理
const cellTypes = []
for (let i = 0; i < 4; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: (i + 1) + '号单元格',
    weight: 1000.00,
    supportingVal: 2000.00,
    lengthOfSelf: 20.00,
    widthOfSelf: 10.00,
    heightOfSelf: 10.00,
    volumnOfSelf: 2000.00,
    length: 10.00,
    width: 5.00,
    height: 5.00,
    volumn: 250.00,
    safetyFact: 0.9,
    sort: i + 1
  })
  cellTypes.push(data)
}
export { cellTypes }

// 容器类型管理
const vesselTypes = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: (i + 1) + '号容器',
    weight: 1000.00,
    supportingVal: 2000.00,
    lengthOfSelf: 20.00,
    widthOfSelf: 10.00,
    heightOfSelf: 10.00,
    volumnOfSelf: 2000.00,
    length: 10.00,
    width: 5.00,
    height: 5.00,
    volumn: 250.00,
    safetyFact: 0.9,
    sort: i + 1
  })
  vesselTypes.push(data)
}
export { vesselTypes }

// 设备
const devices = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '设备' + (i + 1),
    description: '这是设备' + (i + 1),
    status: parseInt(Math.random() * 5),
    sort: i + 1
  })
  devices.push(data)
}
export { devices }

const warehouses = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '仓库' + (i + 1),
    goodsCategoryClassification: goodsCategoryClassifications[0],
    supportingVal: 2000.00,
    length: 10.00,
    width: 5.00,
    height: 5.00,
    volume: 250.00,
    address: '仓库地址' + (i + 1),
    safetyFact: 0.9,
    enabled: parseInt(Math.random() * 2),
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    sort: i + 1
  })
  data.categoryId = data.goodsCategoryClassification.id
  data.managerId = data.user.id
  warehouses.push(data)
}
export { warehouses }

const areas = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '区域' + (i + 1),
    areaType: areaTypes[(Math.random() * (orderTypes.length > 10 ? 10 : orderTypes.length) | 0)],
    supportingVal: 2000.00,
    length: 10.00,
    width: 5.00,
    height: 5.00,
    volumn: 250.00,
    address: '区域位置' + (i + 1),
    safetyFact: 0.9,
    warehouse: warehouses[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    sort: i + 1
  })
  data.typeId = data.areaType.id
  data.houseId = data.warehouse.id
  areas.push(data)
}
export { areas }

const containers = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '货柜' + (i + 1),
    containerType: containerTypes[(Math.random() * (containerTypes.length > 10 ? 10 : containerTypes.length) | 0)],
    area: areas[(Math.random() * (areas.length > 10 ? 10 : areas.length) | 0)],
    rfidCode: 'sdhgfhsdg',
    barCode: '条形码' + i,
    enabled: parseInt(Math.random() * 2),
    sort: i + 1
  })
  data.typeId = data.containerType.id
  data.areaId = data.area.id
  containers.push(data)
}
export { containers }

const cells = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    cellType: cellTypes[(Math.random() * (cellTypes.length > 10 ? 10 : cellTypes.length) | 0)],
    container: containers[(Math.random() * (containers.length > 10 ? 10 : containers.length) | 0)],
    rfidCode: 'sdhgfhsdg',
    name: '单元格' + (i + 1),
    barCode: '条形码' + i,
    enabled: parseInt(Math.random() * 2),
    canMix: parseInt(Math.random() * 2),
    goodsCategoryClassification: goodsCategoryClassifications[0],
    sort: i + 1
  })
  data.typeId = data.cellType.id
  data.containerId = data.container.id
  data.goodsCategoryId = data.goodsCategoryClassification.id
  cells.push(data)
}
export { cells }

const vessels = []
for (let i = 0; i < 3; i++) {
  if (i === 0) {
    const data = Mock.mock({
      id: Mock.Random.guid().replace(/-/g, ''),
      code: 'C' + (i + 1).toString().padStart(6, '0'),
      name: '容器' + (i + 1),
      vesselType: vesselTypes[(Math.random() * (vesselTypes.length > 10 ? 10 : vesselTypes.length) | 0)],
      level: 0,
      parentId: null,
      rfidCode: 'sgdfhsgn',
      barCode: 'sghfdh',
      enabled: parseInt(Math.random() * 2),
      canMix: 0,
      goodsCategoryId: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)].id,
      sort: i + 1
    })
    data.typeId = data.vesselType.id
    vessels.push(data)
  }
  if (i === 1) {
    const data = Mock.mock({
      id: Mock.Random.guid().replace(/-/g, ''),
      code: 'C' + (i + 1).toString().padStart(6, '0'),
      name: '容器' + (i + 1),
      vesselType: vesselTypes[(Math.random() * (vesselTypes.length > 10 ? 10 : vesselTypes.length) | 0)],
      level: 1,
      parentId: vessels[0].id,
      rfidCode: 'sgdfhsgn',
      barCode: 'sghfdh',
      enabled: parseInt(Math.random() * 2),
      canMix: 1,
      goodsCategory: null,
      sort: i + 1
    })
    data.typeId = data.vesselType.id
    data.parent = vessels[0]
    vessels.push(data)
  }
  if (i === 2) {
    const data = Mock.mock({
      id: Mock.Random.guid().replace(/-/g, ''),
      code: 'C' + (i + 1).toString().padStart(6, '0'),
      name: '容器' + (i + 1),
      vesselType: vesselTypes[(Math.random() * (vesselTypes.length > 10 ? 10 : vesselTypes.length) | 0)],
      level: 2,
      parentId: cells[(Math.random() * (cells.length > 10 ? 10 : cells.length) | 0)].id,
      rfidCode: 'sgdfhsgn',
      barCode: 'sghfdh',
      enabled: parseInt(Math.random() * 2),
      canMix: 1,
      goodsCategory: null,
      sort: i + 1
    })
    data.typeId = data.vesselType.id
    vessels.push(data)
  }
}
export { vessels }

// const goodsLocks = []
// for (let i = 0; i < 100; i++) {
//   const data = Mock.mock({
//     id: Mock.Random.guid().replace(/-/g, ''),
//     goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
//     quality: parseInt(Math.random() * 100),
//     lockType: parseInt(Math.random() * 2),
//     order: orders[(Math.random() * (orders.length > 10 ? 10 : orders.length) | 0)],
//     reason: "锁定原因" + ( i + 1),
//     lockTime: "2019-11-11 10:20:24",
//     user: users[(Math.random() * (orders.length > 10 ? 10 : orders.length) | 0)]
//   })
//   data.goodsId = data.goods.id
//   data.orderId = data.order.id
//   data.operatorId = data.user.id
//   goodsLocks.push(data)
// }
// export { goodsLocks }
