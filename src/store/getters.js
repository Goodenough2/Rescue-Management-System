const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.account.token,
  user: state => state.account.user,
  access: state => state.account.access,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  showSettings: state => state.settings.showSettings
}
export default getters
