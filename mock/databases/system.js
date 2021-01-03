import Mock from 'mockjs'
// sys_user
const users = []
for (let i = 0; i < 100; i++) {
  const data = Mock.mock({
    id: Mock.Random.guid().replace(/-/g, ''),
    uname: '用户' + (i + 1),
    nick: '昵称' + (i + 1),
    pwd: '123456',
    salt: 'sdggdgfdgfg',
    lock: parseInt(Math.random() * 2),
    created: '2019-10-05 12:23:05',
    updated: '2019-10-010 12:23:05'
  })
  users.push(data)
}
export { users }
