import Mock from 'mockjs'
import { suppliers } from './both'

const goodsUnits = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '货物单位' + (i + 1),
    description: '这是货物单位' + (i + 1),
    sort: i + 1
  })
  goodsUnits.push(data)
}
export { goodsUnits }

// 货物颜色
const goodsColours = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '货物颜色' + (i + 1),
    description: '这是货物颜色' + (i + 1),
    sort: i + 1
  })
  goodsColours.push(data)
}
export { goodsColours }

// goods_property
const goodsProperties = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '货物类别扩展属性' + (i + 1),
    description: '扩展属性描述' + (i + 1),
    valueType: parseInt(Math.random() * 3)
  })
  data.parent = null
  goodsProperties.push(data)
}
export { goodsProperties }

const goodsCategoryClassifications = []
for (let i = 0; i < 2; i++) {
  if (i === 0) {
    const data = Mock.mock({
      id: Mock.Random.guid().replace(/-/g, ''),
      code: 'C' + (i + 1).toString().padStart(6, '0'),
      level: 0,
      parentId: null,
      name: '货物类型分类名称' + (i + 1),
      description: '货物类型分类描述' + (i + 1),
      sort: i + 1
    })
    goodsCategoryClassifications.push(data)
  } else {
    const data = Mock.mock({
      id: Mock.Random.guid().replace(/-/g, ''),
      code: 'C' + (i + 1).toString().padStart(6, '0'),
      level: 1,
      parentId: goodsCategoryClassifications[0].id,
      name: '货物类型分类名称' + (i + 1),
      description: '货物类型分类描述' + (i + 1),
      sort: i + 1
    })
    data.parent = goodsCategoryClassifications[0]
    goodsCategoryClassifications.push(data)
  }
}
export { goodsCategoryClassifications }

const goodsCategories = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    goodsCategoryClassification: goodsCategoryClassifications[1],
    batch: '货物批次' + (i + 1),
    name: '货物名称' + (i + 1),
    specification: '货物规格',
    goodsUnit: goodsUnits[(Math.random() * (goodsUnits.length > 10 ? 10 : goodsUnits.length) | 0)],
    goodsColour: goodsColours[(Math.random() * (goodsColours.length > 10 ? 10 : goodsColours.length) | 0)],
    unitPrice: parseInt(Math.random() * 100),
    unitWeight: parseInt(Math.random() * 100),
    supplier: suppliers[(Math.random() * (suppliers.length > 10 ? 10 : suppliers.length) | 0)],
    description: '这是货物类别' + (i + 1),
    sort: i + 1
  })
  data.classificationId = data.goodsCategoryClassification.id
  data.unitId = data.goodsUnit.id
  data.colourId = data.goodsColour.id
  data.supplierId = data.supplier.id
  goodsCategories.push(data)
}
export { goodsCategories }

const goodsStorageModes = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '存储模式' + (i + 1),
    goodsCategory: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)],
    groupNum: parseInt(Math.random() * 100),
    goodsUnit: goodsUnits[(Math.random() * (goodsUnits.length > 10 ? 10 : goodsUnits.length) | 0)],
    level: parseInt(Math.random()),
    ratio: parseInt(Math.random() * 100),
    weight: 2000.0,
    length: 10.0,
    width: 10.0,
    height: 10.0,
    volumn: 1000.0,
    sort: i + 1
  })
  data.goodsCategoryId = data.goodsCategory.id
  data.unitId = data.goodsUnit.id
  goodsStorageModes.push(data)
}
export { goodsStorageModes }

const goodsPropertyValues = []
for (let i = 0; i < 2; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    goodsCategory: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)],
    goodsProperty: goodsProperties[(Math.random() * (goodsProperties.length > 10 ? 10 : goodsProperties.length) | 0)],
    value: parseInt(Math.random() * 100),
    sort: i + 1
  })
  goodsPropertyValues.push(data)
}
export { goodsPropertyValues }
