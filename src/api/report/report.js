import request from '@/utils/request'

export function fetchReportTree() {
  return request({
    url: '/reportDefine/tree',
    method: 'get'
  })
}

export function postReportTask(name, type, reportFiles, sources) {
  return request({
    url: '/reportTask/post/task',
    method: 'post',
    data: {
      name: name,
      type: type,
      reportFiles: reportFiles,
      sources: sources
    }
  })
}
