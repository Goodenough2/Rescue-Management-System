import Mock from 'mockjs'

const customers = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '客户' + (i + 1),
    address: '客户地址' + (i + 1),
    contactMan: '张三，王五',
    contactPhone: '178261567212',
    contactDuty: '客户经理,客户总监',
    sort: i + 1
  })
  customers.push(data)
}
export { customers }

const suppliers = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '供应商' + (i + 1),
    address: '供应商地址' + (i + 1),
    contactMan: '张三，王五',
    contactPhone: '178261567212',
    contactDuty: '供应商经理,供应商总监',
    sort: i + 1
  })
  suppliers.push(data)
}
export { suppliers }
