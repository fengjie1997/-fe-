import request from '@/utils/request'

/**
 * 删除测试计划任务组
 * @param {} groupId
 */
export const delTaskGroupById = (planId, groupId) => {
  return request({
    url: `/uxTestplan/taskGroup/delete/${groupId}`,
    method: 'get',
    params: { planId: planId }
  })
}

// 获取任务组中的任务
export const fetchTaskFromTaskGroup = taskId => {
  return request({
    url: `/uxTestplan/task/${taskId}`,
    method: 'get'
  })
}
// 删除任务
export const delTask = taskId => {
  return request({
    url: `/uxTestplan/task/delete/${taskId}`,
    method: 'get'
  })
}
