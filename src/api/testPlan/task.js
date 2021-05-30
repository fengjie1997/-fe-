import request from '@/utils/request'

// 删除任务
export const delTask = taskId => {
  return request({
    url: `/uxTestplan/task/delete/${taskId}`,
    method: 'get'
  })
}
