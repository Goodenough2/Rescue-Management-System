
const tokens = {
  admin: 'admin-token',
  editor: 'editor-token'
}

const users = {
  'admin-token': {
    user: { name: 'admin', roleName: '系统管理员' }
  },
  'editor-token': {
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/account/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      console.log("21222")

      // mock error
      if (!token) {
        return {
          code: 40100,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data:
          {
            token: token,
            user: users[token].user
          }
      }
    }
  },

  // get user access
  {
    url: '/account/access\.*',
    type: 'get',
    response: config => {
      const { token } = config.query

      // mock error
      if (!users[token]) {
        return {
          code: 40101,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data:
          {
            access:
              {
                StoreManage:
                  {
                    allow: true,
                    Store:
                      {
                        allow: true,
                        view: { allow: true },
                        create: { allow: true },
                        update: { allow: true },
                        delete: { allow: true },
                        detail: { allow: true },
                        import: { allow: true },
                        export: { allow: true }
                      },
                    Area:
                      {
                        allow: true,
                        view: { allow: true },
                        create: { allow: true },
                        update: { allow: true },
                        delete: { allow: true },
                        import: { allow: true },
                        export: { allow: true }
                      },
                    AreaType:
                      {
                        allow: true,
                        view: { allow: true },
                        create: { allow: true },
                        update: { allow: true },
                        delete: { allow: true },
                        import: { allow: true },
                        export: { allow: true }
                      }
                  },
                AlarmManage:
                  {
                    allow: true,
                    AlarmGroup:
                      {
                        allow: true,
                        view: { allow: true },
                        create: { allow: true },
                        update: { allow: true },
                        delete: { allow: true },
                        import: { allow: true },
                        export: { allow: true }
                      },
                    AlarmType:
                      {
                        allow: true,
                        view: { allow: true },
                        create: { allow: true },
                        update: { allow: true },
                        delete: { allow: true },
                        import: { allow: true },
                        export: { allow: true }
                      },
                    AlarmInfo:
                      {
                        allow: true,
                        view: { allow: true },
                        create: { allow: true },
                        update: { allow: true },
                        delete: { allow: true },
                        import: { allow: true },
                        export: { allow: true }
                      }
                  }
              }
          }
      }
    }
  },

  // user logout
  {
    url: '/account/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
