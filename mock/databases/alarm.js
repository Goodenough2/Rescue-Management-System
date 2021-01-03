import Mock from "mockjs";
import { users } from './system'
import {orders} from "./order";

const alarmGroups = []
for (let i = 0; i < 100; i++){
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '报警分组' + (i + 1),
    description: '这是报警分组'+ (i + 1),
    sort: i + 1
  })
  alarmGroups.push(data)
}
export { alarmGroups }

const alarmTypes = []
for (let i = 0; i < 100; i++){
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    name: '报警类型' + (i + 1),
    description: '这是报警描述'+ (i + 1),
    user: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    alarmGroup: alarmGroups[(Math.random() * (alarmGroups.length > 10 ? 10 : alarmGroups.length) | 0)],
    sort: i + 1
  })
  data.alarmByUserId = data.user.id
  data.alarmByGroupId = data.alarmGroup.id
  alarmTypes.push(data)
}
export { alarmTypes }

const alarmInfos = []
for (let i = 0; i < 100; i++){
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    alarmType: alarmTypes[(Math.random() * (alarmTypes.length > 10 ? 10 : alarmTypes.length) | 0)],
    alarmTitle: '这是预警标题' + (i + 1),
    alarmContent: '预警内容' + (i + 1),
    alarmTime: '2019-10-10 23:20:14',
    alarmToUser: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    alarmFromUser: users[(Math.random() * (users.length > 10 ? 10 : users.length) | 0)],
    readFlag: parseInt(Math.random() * 2),
    dealFlag: parseInt( Math.random() * 2)
  })
  data.alarmTypeId = data.alarmType.id
  data.alarmToUserId = data.alarmToUser.id
  data.alarmFromUserId = data.alarmFromUser.id
  alarmInfos.push(data)
}
export { alarmInfos }
