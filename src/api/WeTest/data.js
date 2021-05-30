import request from '../../utils/request'
import download from '../../utils/download'

export function fetchList(query, uuid, parameter) {
  console.log(uuid)
  if (uuid === ['']) {
    return request({
      url: '/wetest/result/list',
      method: 'post',
      params: query,
      data: {
        page: query.page,
        pageSize: query.pageSize,
        appType: 1,
        order: query.order
      }
    })
  } else {
    return request({
      url: '/wetest/result/list',
      method: 'post',
      params: query,
      data: {
        page: query.page,
        pageSize: query.pageSize,
        uniqueIds: uuid,
        appType: 1,
        order: query.order
      }
    })
  }
}
export function fetchBusinessList(parameter) {
  console.log(parameter)
  return request({
    url: '/wetest/result/list',
    method: 'post',
    data: parameter
  })
}

export function fetchTestPlanList(parameter) {
  return request({
    url: '/wetest/result/result/grouped',
    method: 'post',
    data: parameter
  })
}

export function fetchTaskList(planId, uuid, appType) {
  return request({
    url: `/wetest/result/detail/${planId}`,
    method: 'get',
    params: {
      uuid: uuid,
      appType: appType
    }
  })
}

export function fetchTaskByUUIDsList(listQuery, uuids) {
  return request({
    url: `/wetest/task/device/list`,
    method: 'post',
    params: listQuery,
    data: uuids
  })
}

export function exportCsv(task, taskId, query) {
  // const data = {
  //   startTime: query.startTime,
  //   endTime: query.endTime,
  //   order: query.order,
  //   task: query.task,
  //   taskId: query.taskId,
  //   uniqueIds: query.uniqueIds,
  //   appType: query.appType,
  //   jobIds: query.jobIds
  // }
  return request({
    url: '/wetest/result/csv',
    method: 'post',
    data: {
      startTime: query.startTime,
      endTime: query.endTime,
      order: query.order,
      task: task,
      taskId: taskId,
      uniqueIds: query.uniqueIds,
      appType: query.appType,
      jobIds: query.jobIds
    },
    responseType: 'blob'
  })
  // return download(
  //   '/wetest/result/csv',
  //   fileName,
  //   'post',
  //   data,
  //   bool
  // )
}
export function exportOneCsv(fileName, query) {
  const data = {
    startTime: query.startTime,
    endTime: query.endTime,
    order: query.order,
    task: query.task,
    taskId: query.taskId,
    uniqueIds: query.uniqueIds,
    appType: query.appType,
    jobIds: query.jobIds
  }
  // return request({
  //   url: '/wetest/result/csv',
  //   method: 'post',
  //   data: {
  //     startTime: query.startTime,
  //     endTime: query.endTime,
  //     order: query.order,
  //     task: query.task,
  //     taskId: query.taskId,
  //     uniqueIds: query.uniqueIds,
  //     appType: query.appType,
  //     jobIds: query.jobIds
  //   },
  //   responseType: 'blob'
  // })
  return download(
    '/wetest/result/csv',
    fileName,
    'post',
    data
  )
}
