import request from '@/utils/request'

export function fetchWeTestDeviceList(params, groupIds) {
  return request({
    url: '/wetest/device/list',
    method: 'post',
    params,
    data: groupIds
  })
}

export function fetchList(query) {
  return request({
    url: '/wetest/task/list',
    method: 'get',
    params: query
  })
}

export function createTask(data) {
  return request({
    url: '/wetest/task/add',
    method: 'post',
    data
  })
}
export function sendTask(appType, uuids, taskid) {
  return request({
    url: `/wetest/plan/create`,
    method: 'post',
    data: {
      appType: appType,
      uuids: uuids,
      taskId: taskid
    }
  })
}
export function taskPlan(taskId, query) {
  return request({
    url: `/wetest/plan/task/${taskId}`,
    method: 'get',
    params: {
      uuid: query.uuid,
      groupId: query.groupId,
      deviceModel: query.deviceModel,
      status: query.status
    }
  })
}
export function TestPlanCancel(planId, uuid) {
  return request({
    url: `/wetest/plan/cancel/${planId}`,
    method: 'post',
    params: {
      uuid: uuid
    }
  })
}

export function deleteTask(id) {
  return request({
    url: `/wetest/task/delete/${id}`,
    method: 'post'
  })
}
export function updateTask(id, data) {
  return request({
    url: `/wetest/task/update/${id}`,
    method: 'post',
    data
  })
}
export function updateEndTime(id, endTime) {
  return request({
    url: `/wetest/task/updateEndTime/${id}`,
    method: 'post',
    params: {
      endTime: endTime
    }
  })
}
