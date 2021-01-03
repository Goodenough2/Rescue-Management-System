import Mock from 'mockjs'
import { customers } from '../databases/both'
import { users } from '../databases/system'
import { goodsCategories } from './goods-type'
// sys_user
const orderProperties = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    orderType: parseInt(Math.random() * 6),
    name: '扩展属性' + (i + 1),
    description: '扩展属性描述' + (i + 1),
    valueType: parseInt(Math.random() * 3)
  })
  orderProperties.push(data)
}
export { orderProperties }

// order_property_value
const orderPropertyValues = []
for (let i = 0; i < 5; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    orderId: parseInt(Math.random() * 100),
    propertyId: parseInt(Math.random() * 100),
    value: '这是单据扩展属性值' + (i + 1)
  })
  orderPropertyValues.push(data)
}
export { orderPropertyValues }
// order
const orders = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    customer: customers[(Math.random() * (customers.length > 10 ? 10 : customers.length) | 0)],
    createTime: '2019-11-11 11:20:35',
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    amount: 1000,
    amountDone: 900,
    amountPre: 500,
    amountReal: 900,
    deliveryTime: '2019-10-10 10:24:24',
    deliveryTimeReal: '2019-11-24 10:29:00',
    description: '这是订单' + (i + 1),
    status: parseInt(Math.random() * 4),
    statusTime: '2019-11-09 10:20:24'
  })
  data.customerId = data.customer.id
  data.createrId = data.user.id
  orders.push(data)
}
export { orders }

//  领料单
const requests = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    order: orders[(Math.random() * (orders.length > 10 ? 10 : orders.length) | 0)],
    reasonType: parseInt(Math.random() * 2),
    reasonDesc: '领料原因' + (i + 1),
    createTime: '2019-11-11 11:20:35',
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    requester: '这是领料人' + (i + 1),
    status: parseInt(Math.random() * 3),
    statusTime: '2019-11-09 10:20:24'
  })
  data.orderId = data.order.id
  data.createrId = data.user.id
  requests.push(data)
}
export { requests }

const requestDetails = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    request: requests[(Math.random() * (requests.length > 10 ? 10 : requests.length) | 0)],
    goodsCategory: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)],
    quality: parseInt(Math.random() * 100),
    qualityReal: parseInt(Math.random()),
    status: parseInt(Math.random() * 3),
    statusTime: '2019-10-10 10:29:20',
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
  })
  data.requestId = data.request.id
  data.goodsCategoryId = data.goodsCategory.id
  data.operatorId = data.user.id
  requestDetails.push(data)
}
export { requestDetails }

const orderDetails = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    order: orders[(Math.random() * (orders.length > 10 ? 10 : orders.length) | 0)],
    goodsCategory: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)],
    quality: parseInt(Math.random() * 100),
    qualityReal: parseInt(Math.random() * 100),
    amount: 80,
    deliveryTime: '2019-10-10 10:29:20',
    deliveryTimeReal: '2019-10-29 10:20:10',
    status: parseInt(Math.random() * 3),
    statusTime: '2019-10-10 20:10:05',
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)]
  })
  data.orderId = data.order.id
  data.goodsCategoryId = data.goodsCategory.id
  data.operatorId = data.user.id
  orderDetails.push(data)
}
export { orderDetails }

const orderMaterials = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    orderDetail: orderDetails[(Math.random() * (orderDetails.length > 10 ? 10 : orderDetails.length) | 0)],
    goodsCategory: goodsCategories[(Math.random() * (goodsCategories.length > 10 ? 10 : goodsCategories.length) | 0)],
    quality: parseInt(Math.random() * 100),
    qualityLocked: parseInt(Math.random() * 100),
    status: parseInt(Math.random() * 3),
    statusTime: '2019-10-10 10:10:05',
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)]
  })
  data.orderDetailId = data.orderDetail.id
  data.goodsCategoryId = data.goodsCategory.id
  data.operatorId = data.user.id
  orderMaterials.push(data)
}
export { orderMaterials }
