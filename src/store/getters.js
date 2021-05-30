const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  apiUrl: state => state.app.apiUrl,
  businessErrorNotity: state => state.app.businessErrorNotity,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  status: state => state.user.status,
  role: state => state.user.role,
  setting: state => state.user.setting,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  errorLogs: state => state.errorLog.logs,
  menuPerms: state => state.user.menuPerms,
  buttonPerms: state => state.user.buttonPerms,
  timezone: state => state.user.timezone,
  account: state => state.user.account,
  isAdmin: state => state.user.isAdmin,
  testPlanId: state => state.testPlan.testPlanId,
  schemaId: state => state.testPlan.schemaId,
  /**
   * 设备状态
   */
  monitoredGroupId: state => state.monitored.monitoredGroupId,
  monitoredGroupName: state => state.monitored.monitoredGroupName,
  //  组信息
  group: state => state.current.groupTree,
  groupTree: state => state.current.groupTree,
  // 角色树
  roleTree: state => state.current.roleTree,
  // 区域树
  regionTree: state => state.current.regionTree
}
export default getters
