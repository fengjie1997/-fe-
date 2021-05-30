import request from '@/utils/request'
export function exportTestPlanConfig(deviceId, id) {
  return request({
    url: `/uxTestplanView/exportConfig/${deviceId}`,
    method: 'post',
    params: {
      id: id
    }
  })
}

export function exportTestPlanXml(deviceId, testPlanId, isHistory) {
  return request({
    url: `/uxTestplan/exportXml/${deviceId}`,
    method: 'post',
    params: {
      testPlanId: testPlanId,
      isHistory: isHistory
    }
  })
}

export function switchTestPlanEnable(deviceId, id, bool) {
  return request({
    url: `/uxTestplanView/switchEnable/${deviceId}`,
    method: 'post',
    params: {
      id: id,
      bool: bool
    }
  })
}

export function deleteTestPlanApi(deviceId, ids, type) {
  return request({
    url: `/uxTestplanView/delete/${deviceId}`,
    method: 'post',
    params: {
      type: type
    },
    data: ids
  })
}

export function fetchtHistoryTestPlanList(deviceId, params) {
  return request({
    url: `/uxTestplanView/historyList/${deviceId}`,
    method: 'get',
    params
  })
}

export function fetchtActiveTestPlanList(deviceId, params) {
  return request({
    url: `/uxTestplanView/activeList/${deviceId}`,
    method: 'get',
    params
  })
}

export function fetchtExpiredTestPlanList(deviceId, params) {
  return request({
    url: `/uxTestplanView/expiredList/${deviceId}`,
    method: 'get',
    params
  })
}
// 获取端口信息
export const fetchtSchemaPortList = (deviceId, planId) => {
  return request({
    url: `/uxTestplan/schemaPort/${deviceId}`,
    params: {
      planId: planId
    },
    method: 'get'
  })
}
/**
 * 获取测试计划中的任务组
 */
export const fetchtTaskGroupList = (schemaId, planId) => {
  return request({
    url: `/uxTestplan/taskGroup/${schemaId}`,
    params: {
      planId: planId
    },
    method: 'get'
  })
}
/**
 * 保存 / 更新测试计划中的端口信息
 * @param {*} deviceId
 * @param {*} baseConfig
 */
export const savingTestPlanPortInfo = (testPlanId, data) => {
  return request({
    url: `/uxTestplan/schema/${testPlanId}`,
    method: 'post',
    data: data
  })
}
/**
 * 创建测试计划基本信息
 * @param {*} deviceId
 * @param {*} baseConfig
 */
export const addTestPlanBaseConf = (deviceId, baseConfig, testPlanId) => {
  return request({
    url: `/uxTestplan/create/${deviceId}`,
    method: 'post',
    params: {
      testPlanId: testPlanId
    },
    data: baseConfig
  })
}
/**
 * 保存 / 更新测试计划中的任务组
 * @param {*} schemaId
 * @param {*} data
 */
export const addTaskGroup = (schemaId, data, groupId) => {
  return request({
    url: `/uxTestplan/taskGroup/${schemaId}`,
    method: 'post',
    params: { taskGroupId: groupId },
    data: data
  })
}
/**
 * 保存 / 更新测试计划中的任务组
 * @param {*} schemaId
 * @param {*} data
 */
export const addTask = (taskGroupId, data, taskId) => {
  return request({
    url: `/uxTestplan/task/${taskGroupId}`,
    method: 'post',
    params: {
      taskId: taskId
    },
    data: data
    // transformRequest: [function(data) {
    //   return Qs.stringify(data)
    // }],
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}
/**
 * 获取测试计划基本配置
 */
export const fetchtTestPlanBaseConf = (deviceId, testPlanId) => {
  return request({
    url: `/uxTestplan/uxTestplan/${testPlanId}`,
    params: {
      deviceId: deviceId
    },
    method: 'get'
  })
}
/**
 * 切换设备状态
 */
export const switchDeviceStatus = (deviceId, recordId, bool) => {
  return request({
    url: `/uxTestplanView/switchEnable/${deviceId}`,
    params: {
      id: recordId,
      bool: bool
    },
    method: 'post'
  })
}
/**
 * 刷新测试计划
 */
export const updateTestPlan = (deviceId, deviceType) => {
  return request({
    url: `/deviceStatus/updatePlan`,
    data: {
      id: deviceId,
      type: deviceType
    },
    method: 'post'
  })
}

/**
 *  应用测试计划到其他设备
 */
export const copyTestPlanToDevice = (deviceId, params, data) => {
  return request({
    url: `/uxTestplan/copyTestPlanToDevice/${deviceId}`,
    params,
    data,
    method: 'post'
  })
}

export var testPlanUploadUrl = '/uxTestplan/importXml/'

// 任务组上下移动
export const moveGroup = (deviceId, planId, groupId1, groupId2) => {
  return request({
    url: `/uxTestplan/swapTestPlanTaskGroup/${deviceId}`,
    params: {
      planId: planId,
      groupId1: groupId1,
      groupId2: groupId2
    },
    method: 'post'
  })
}
// 业务上下移动
export const moveTask = (deviceId, planId, taskId1, taskId2) => {
  return request({
    url: `/uxTestplan/swapTestPlanTask/${deviceId}`,
    params: {
      planId: planId,
      taskId1: taskId1,
      taskId2: taskId2
    },
    method: 'post'
  })
}

