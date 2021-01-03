import Mock from 'mockjs'

// 仓库类型
const storeTypes = []
for (let i = 0; i < 100; i++) {
  storeTypes.push(Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '仓库类型' + (i + 1),
    sort: i + 1
  }))
}
export { storeTypes }

// 仓库
const stores = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '仓库' + (i + 1),
    storeType: storeTypes[(Math.random() * (storeTypes.length > 10 ? 10 : storeTypes.length) | 0)],
    address: '@cword(4,8)',
    enable: 1,
    sort: i + 1
  })
  data.storeTypeId = data.storeType.id
  stores.push(data)
}
export { stores }

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

// 区域
const areas = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '区域' + (i + 1),
    areaType: areaTypes[(Math.random() * (areaTypes.length > 10 ? 10 : storeTypes.length) | 0)],
    store: stores[(Math.random() * (stores.length > 10 ? 10 : stores.length) | 0)],
    enable: 1,
    sort: i + 1
  })
  data.areaTypeId = data.areaType.id
  data.storeId = data.store.id
  areas.push(data)
}
export { areas }

// 货柜
const containers = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '货柜' + (i + 1),
    area: areas[(Math.random() * (areas.length > 10 ? 10 : areas.length) | 0)],
    enable: 1,
    sort: i + 1
  })
  data.areaId = data.area.id
  data.storeId = data.area.storeId
  containers.push(data)
}
export { containers }

// 货柜类型
const containerTypes = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '货柜类型' + (i + 1),
    description: '这是货柜类型' + (i + 1),
    sort: i + 1
  })
  containerTypes.push(data)
}
export { containerTypes }

// 单元格类型管理
const  cellTypes = []
for (let i = 0; i < 4; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: (i + 1) + '号单元格',
    description: '长*宽*高=' + i + '*' + i + '*' + i,
    sort: i + 1
  })
  cellTypes.push(data)
}
export { cellTypes }

// 单元格存储方式
const goodsStorageModes = []
for (let i = 0; i < 100; i++) {
  goodsStorageModes.push(Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '单元格存储方式' + (i + 1),
    description: '单元格存储方式描述' + (i + 1),
    sort: i + 1
  }))
}
export { goodsStorageModes }

// 单元格大小管理
const cellCapacitys = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    cellType: cellTypes[(Math.random() * (cellTypes.length > 10 ? 10 : cellTypes.length) | 0)],
    goodsStorageMode: goodsStorageModes[(Math.random() * (goodsStorageModes.length > 10 ? 10 : goodsStorageModes.length) | 0)],
    maxCapacity: i + 3,
    sort: i + 1
  })
  data.cellTypeId = data.cellType.id
  data.goodsStorageModeId = data.goodsStorageMode.id
  cellCapacitys.push(data)
}
export { cellCapacitys }

// 货柜单元格
const cells = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '单元格名称' + (i + 1),
    type: cellTypes[(Math.random() * (cellTypes.length > 10 ? 10 : cellTypes.length) | 0)],
    container: containers[(Math.random() * (containers.length > 10 ? 10 : containers.length) | 0)],
    enable: 1,
    usingMode: 0,
    goodsStorageMode: goodsStorageModes[(Math.random() * (goodsStorageModes.length > 10 ? 10 : goodsStorageModes.length) | 0)],
    fullFlag: parseInt(Math.random() * 3),
    sort: i + 1
  })
  data.typeId = data.type.id
  data.containerId = data.container.id
  data.goodsStorageModeId = data.goodsStorageMode.id
  cells.push(data)
}
export { cells }


// 设备
const devices = []
const Status = [
  { id: 0, name: '不可用'},
  { id: 1, name: '可用'},
  { id: 2, name: '空闲'},
  { id: 3, name: '忙碌'},
  { id: 4, name: '其他'}
]
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '设备' + (i + 1),
    description: '这是设备' + (i + 1),
    statusId: parseInt(Math.random() * (4 - 0) + 0),
    enable: 1,
    sort: i + 1
  })
  switch (data.statusId) {
    case 0:
      data.status = Status[0]
      break
    case 1:
      data.status = Status[1]
      break
    case 2:
      data.status = Status[2]
      break
    case 3:
      data.status = Status[3]
      break
    case 4:
      data.status = Status[4]
      break
  }
  devices.push(data)
}
export { devices , Status }

// 货物大类
const goodsTypes = []
for (let i = 0; i < 100; i++){
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    level: parseInt(Math.random() * 2),
    parentId: Mock.Random.guid().replace(/-/g, ''),
    name: '货物类别' + (i + 1),
    description: '这是货物类别'+ (i + 1),
    sort: i + 1
  })
  goodsTypes.push(data)
}
export { goodsTypes }

// 货物存储方式
const goodsStorageModels = []
for (let i = 0; i < 100; i++) {
  goodsStorageModels.push(Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '单元格存储方式' + (i + 1),
    description: '这是存储方式' + (i + 1),
    sort: i + 1
  }))
}
export { goodsStorageModels }

// 货物单位
const goodsUnits = []
for (let i = 0; i < 100; i++){
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '货物单位' + (i + 1),
    description: '这是货物单位'+ (i + 1),
    isBasic: 0,
    storageModel: goodsStorageModels[(Math.random() * (areaTypes.length > 10 ? 10 : storeTypes.length) | 0)],
    convertDesc: i * 0.5,
    sort: i + 1
  })
  data.storageModeld = data.storageModel.id
  goodsUnits.push(data)
}
export { goodsUnits }

// 货物颜色
const goodsColors= []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '货物颜色' + (i + 1),
    description: '这是货物颜色'+ (i + 1),
    sort: i + 1
  })
  goodsColors.push(data)
}
export { goodsColors }

// 货物
const goods = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '货物' + (i + 1),
    batch: '货物批次' + (i + 1),
    type: goodsTypes[(Math.random() * (goodsTypes.length > 10 ? 10 : goodsTypes.length) | 0)],
    specification: "货物规格" + (i + 1),
    fabrics: "货物面料" + (i + 1),
    washWeight: "水洗后克重" +(i + 1),
    washWidth: "水洗后有效门幅" + (i + 1),
    unitConsumption: parseInt(Math.random()),
    wastage: parseInt(Math.random() * 100),
    description: '这是货物颜色'+ (i + 1),
    sort: i + 1
  })
  data.typeId = data.type.id
  goods.push(data)
}
export { goods }

// 客户
const customers = []
for (let i = 0; i < 100; i++ )  {
  customers.push({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '用户' + (i + 1),
    address: "地址" + (i + 1),
    contactMan: '联系人' + (i + 1),
    contactPhone: parseInt(Math.random() * 100000000000),
    contactDuty: "职务" + (i + 1),
    sort: i + 1
  })
}
export { customers }

// 货物锁定
const goodsLockeds = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    customerOrder:{ id: (i + 1), name: "用户订单" + (i + 1), status: 0 ,code: 'C' + (i + 1).toString().padStart(6, '0') },
    color: goodsColors[(Math.random() * (goodsColors.length > 10 ? 10 : goodsColors.length) | 0)],
    unit: goodsUnits[(Math.random() * (goodsUnits.length > 10 ? 10 : goodsUnits.length) | 0)],
    quality: i * 2,
    customer: { name: '用户'+ (i + 1)},
    lockedTime: '2019-08-23 12:00:01',
    type: 0,
    sort: i + 1
  })
  data.customerOrderId = data.customerOrder.id,
    data.goodsId = data.goods.id,
    data.colorId = data.color.id
  data.unitId = data.unit.id
  goodsLockeds.push(data)
}
export { goodsLockeds }

// 供应商
const suppliers = []
for (let i = 0; i < 100; i++ )  {
  suppliers.push({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: "供应商" + (i + 1),
    address: "地址" + (i + 1),
    contactMan: '联系人' + (i + 1),
    contactPhone: parseInt(Math.random() * 100000000000),
    contactDuty: "职务" + (i + 1),
    sort: i + 1
  })
}
export { suppliers }

//订单类型管理
const orderTypes = []
for (let i = 0; i < 100; i++ )  {
  const data = Mock.mock({
    id:  Mock.Random.guid().replace(/-/g, ''),
    level: parseInt(Math.random() * 2 ),
    parentId:  Mock.Random.guid().replace(/-/g, ''),
    code:'C' + (i + 1).toString().padStart(6, '0'),
    name: "订单类型" + (i + 1),
    description: "这是订单类型" + (i + 1),
    sort: i + 1,
    parent: { name: '订单类型' + (i + 1) }
  })
  orderTypes.push(data)
}
export { orderTypes }

// 用户组
const groups = []
for (let i = 0; i < 3; i++ )  {
  const data = Mock.mock({
    id: i,
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    name: '组别' + (i + 1),
    description: '这是组别' + (i + 1),
    approval: parseInt(Math.random() * 2),
    storesId: '1,2,3,4',
    sort: i + 1
  })
  groups.push(data)
}
export { groups }

// sys_user
const users = []
for (let i = 0; i < 100; i++ )  {
  const data = Mock.mock({
    id:  Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    sex: '男',
    name: 'user' + (i + 1),
    groupId: 1,
    group: {  name: "组别1" },
    created: "2019-10-05 12:23:05",
    contactPhone:  parseInt(Math.random() * 100000000000),
    email: parseInt(Math.random() * 100000000000) + "@qq.com",
    enable: 1,
    sort: i + 1
  })
  users.push(data)
}
export { users }

// 客户订单信息
const orderCustomers = []
const status = [
  { id: 0, name: '未完全出库'},
  { id: 1, name: '部分出库'},
  { id: 2, name: '完全出库'},
]
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    type: orderTypes[(Math.random() * (orderTypes.length > 10 ? 10 : orderTypes.length) | 0)],
    quality: 2*i,
    amount: 2000*i,
    qualityForReal: 2*i-1,
    amountForReal: 2000*i-1,
    statusId: parseInt(Math.random() * (3 - 0) + 0),
    customer: customers[(Math.random() * (customers.length > 10 ? 10 : customers.length) | 0)],
    deliveryTime: '当前时间是：'+i,
    operator: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    sort: i + 1
  })
  switch (data.statusId) {
    case 0:
      data.status = status[0]
      break
    case 1:
      data.status = status[1]
      break
    case 2:
      data.status = status[2]
      break
  }
  data.typeId =data.type.id,
    data.customerId =data.customer.id,
    data.operatorId =data.operator.id,
    orderCustomers.push(data)
}
export { orderCustomers, status }

// 领料单
const orderRequists = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    contractCode: 'D' + (i + 1).toString().padStart(6, '0'),
    quality: i * 2,
    qualityForReal: i * 2 - 1,
    amount: parseInt(Math.random() * 100),
    amountForReal: parseInt(Math.random() * 100),
    customerOrder: orderCustomers[(Math.random() * (orderCustomers.length > 10 ? 10 : orderCustomers.length) | 0)],
    status: parseInt(Math.random() * 2),
    requistTime: '2019-08-23 12:00:01',
    operator: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0) ]
  })
  data.customerOrderId = data.customerOrder.id,
    data.operatorId = data.operator.id
  orderRequists.push(data)
}
export{ orderRequists }

// goods_requist
const goodsRequists = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    requistOrder: orderRequists[(Math.random() * (orderRequists.length > 10 ? 10 : orderRequists.length) | 0)],
    goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    unit: goodsUnits[(Math.random() * (goodsUnits.length > 10 ? 10 : goodsUnits.length) | 0)],
    color: goodsColors[(Math.random() * (goodsColors.length > 10 ? 10 : goodsColors.length) | 0)],
    quality: i * 2,
    qualityForReal: i * 2 - 1,
    weight: Math.random() * 100
  })
  data.orderRequistId = data.requistOrder.id,
    data.unitId = data.unit.id
  data.colorId = data.color.id
  data.goodsId = data.goods.id
  goodsRequists.push(data)
}
export{ goodsRequists }

//货物盘整
const consolidations = []
for (let i = 0; i < 100; i++ )  {
  const data = Mock.mock({
    id:  Mock.Random.guid().replace(/-/g, ''),
    consolidationCertificateCode: 'C' + (i + 1).toString().padStart(6, '0'),
    consolidationDate: "2019-08-21 12:34:56",
    createUser: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    container: containers[(Math.random() * (containers.length > 10 ? 10 : containers.length) | 0)],
    area: areas[(Math.random() * (areas.length > 10 ? 10 : areas.length) | 0)],
    store: stores[(Math.random() * (stores.length > 10 ? 10 : stores.length) | 0)],
    good: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    goodsColor: goodsColors[(Math.random() * (goodsColors.length > 10 ? 10 : goodsColors.length) | 0)],
    cellType: cellTypes[(Math.random() * (cellTypes.length > 10 ? 10 : cellTypes.length) | 0)],
    goodsStorageMode: goodsStorageModes[(Math.random() * (goodsStorageModes.length > 10 ? 10 : goodsStorageModes.length) | 0)],
    a: i,
    b: i-1,
    c: "差额"+ i,
    d: "单位数量"+ i,
    A: "货物加权平均价"+i,
    B: "货物总价"+i,
    C: "盈亏金额"+i,
    systemCode: '系统编号'+i,
    enable: 1,
    sort: i + 1
  })
  data.createUserId =data.createUser.id,
    data.containerId =data.container.id,
    data.areaId =data.area.id,
    data.storeId =data.store.id,
    data.goodId =data.good.id,
    data.goodsColorId =data.goodsColor.id,
    data.cellTypeId =data.cellType.id,
    data.goodsStorageModeId =data.goodsStorageMode.id,
    consolidations.push(data)
}
export { consolidations }

// 用户登录登录
const userLogs =[]
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    loginTime: '2019-12-02 12:25:14',
    loginOutTime: '2019-12-02 12:30:14',
    operatorAction: parseInt(Math.random() * 2)
  })
  data.userId = data.user.id,
    userLogs.push(data)
}
export { userLogs }

// 预警类型
const alarmTypes = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '预警类型' + (i + 1),
    description: '预警类型描述' + (i + 1),
    alarmByUser: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    alarmByGroup: groups[(Math.random() * (groups.length > 10 ? 10 : groups.length) | 0)]
  })
  data.alarmByUserId = data.alarmByUser.id,
    data.alarmByGroupId = data.alarmByGroup.id,
    alarmTypes.push(data)
}
export { alarmTypes }

// 预警信息
const alarms = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    alarmType: alarmTypes[(Math.random() * (groups.length > 10 ? 10 : groups.length) | 0)],
    alarmTitle: "预警标题" + (i + 1),
    alarmContent: "预警内容"+ (i + 1),
    alarmTime: "2019-12-05 12:00:15",
    alarmToUser: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    alarmFromUser: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    readFlag: parseInt(Math.random() * 2),
    dealFlag: parseInt(Math.random() * 2),
  })
  data.alarmTypeId = data.alarmType.id,
    data.alarmToUserId = data.alarmToUser.id
  data.alarmFromUserId = data.alarmFromUser.id
  alarms.push(data)
}
export { alarms }

// rfids
const rfids = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    rfid: parseInt(Math.random() * 10000000000),
    barCode: parseInt(Math.random() * 10000000000),
    status: parseInt(Math.random() * 3),
    sort: i + 1,
  })
  rfids.push(data)
}
export { rfids }

// 货物操作查询
const goodsOperators = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    type: parseInt(Math.random() * 3) + 1,
    rfid: rfids[(Math.random() * (rfids.length > 10 ? 10 : rfids.length) | 0)],
    oriCell: cells[(Math.random() * (cells.length > 10 ? 10 : cells.length) | 0)],
    curCell: cells[(Math.random() * (cells.length > 10 ? 10 : cells.length) | 0)],
    quality: parseInt(Math.random() * 100),
    weight: parseInt(Math.random() * 100),
    unit: goodsUnits[(Math.random() * (cells.length > 10 ? 10 : cells.length) | 0)],
    operatorTime: '2019-12-05 12:20:15',
    operator: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    description: '这是货物操作' + (i + 1),
  })
  data.goodsId = data.goods.id,
    data.rfidId = data.rfid.id,
    data.oriCellId = data.oriCell.id,
    data.curCellId = data.curCell.id
  data.unitId = data.unit.id,
    data.operatorId = data.operator.id
  goodsOperators.push(data)
}
export { goodsOperators }

// goods_stock
const goodsStocks = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    rfid: rfids[(Math.random() * (rfids.length > 10 ? 10 : rfids.length) | 0) ],
    locationType: 4,
    location: cells[(Math.random() * (cells.length > 10 ? 10 : cells.length) | 0) ],
    unit: goodsUnits[(Math.random() * (goodsUnits.length > 10 ? 10 : goodsUnits.length) | 0)],
    quality: parseInt(Math.random() * 100),
    weight: parseInt(Math.random() * 100),
    isStoreTime: '2019-12-02 12:20:24',
    isVessel: parseInt(Math.random() * 2),
  })
  data.goodsId = data.goods.id,
    data.locationId = data.location.id,
    data.unitId = data.unit.id
  data.rfidId = data.rfid.id
  goodsStocks.push(data)
}
export { goodsStocks }

// 货物采购
const orderPurchases = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    code: 'C' + (i + 1).toString().padStart(6, '0'),
    type: orderTypes[(Math.random() * (orderTypes.length > 10 ? 10 : orderTypes.length) | 0)],
    contractCode: parseInt(Math.random() * 10000),
    quality: parseInt(Math.random() * 100),
    amount:  parseInt(Math.random() * 100),
    qualityForReal: parseInt(Math.random() * 100),
    amountForReal: parseInt(Math.random() * 100),
    status: parseInt(Math.random() * 3),
    supplier: suppliers[(Math.random() * (suppliers.length > 10 ? 10 : suppliers.length) | 0)],
    customerOrder: orderCustomers[(Math.random() * (orderCustomers.length > 10 ? 10 : orderCustomers.length) | 0)],
    purchaseTime: '2019-05-24 15:24:25',
    operator: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
  })
  data.typeId = data.type.id,
    data.supplierId = data.supplier.id
  data.operatorId = data.operator.id
  orderPurchases.push(data)
}
export { orderPurchases }

// 货物采购
const goodsPurchases = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    purchaseOrder: orderPurchases[(Math.random() * (orderPurchases.length > 10 ? 10 : orderPurchases.length) | 0)],
    goods: goods[(Math.random() * (goods.length > 10 ? 10 : goods.length) | 0)],
    storageMode: goodsStorageModes[(Math.random() * (goodsStorageModes.length > 10 ? 10 : goodsStorageModes.length) | 0)],
    unit: goodsUnits[(Math.random() * (goodsUnits.length > 10 ? 10 : goodsUnits.length) | 0)],
    colour: goodsColors[(Math.random() * (goodsColors.length > 10 ? 10 : goodsColors.length) | 0)],
    quality: parseInt(Math.random() * 100),
    unitPrice: parseInt(Math.random() * 100),
    qualityForReal: parseInt(Math.random() * 100),
    unitPriceForReal: parseInt(Math.random() * 100),
    weightEdPrice: parseInt(Math.random() * 100),
    inStoreStatus: parseInt(Math.random() * 3),
    putInStoreStatus: parseInt(Math.random() * 3),
    sort: i + 1,
  })
  data.purchaseOrderId = data.purchaseOrder.id,
    data.goodsId = data.goods.id
  data.storageModeId = data.storageMode.id,
    data.unitId = data.unit.id,
    data.colourId = data.colour.id,
    goodsPurchases.push(data)
}
export { goodsPurchases }

// 质检
const goodsChecks = []
for (let i = 0; i < 100; i++ ) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    purchase: goodsPurchases[(Math.random() * (goodsPurchases.length > 10 ? 10 : goodsPurchases.length) | 0)],
    returnNums: parseInt(Math.random() * 100),
    returnReason: '退货理由' + (i + 1),
    checker: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    checkTime: '2019-12-05 12:20:25',
    operator: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    operatorTime: '2019-05-24 15:24:25',
    status: parseInt(Math.random() * 2)
  })
  data.checkerId = data.checker.id,
    data.operatorId = data.operator.id
  goodsChecks.push(data)
}
export { goodsChecks }

