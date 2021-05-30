import request from '@/utils/request'
import download from '@/utils/download'
import { formatTime2 } from '@/utils/index'

export function fetchList(query) {
  return request({
    url: '/reportTask/list',
    method: 'get',
    params: query
  })
}

export function deleteReportTask(id) {
  return request({
    url: `/reportTask/delete/${id}`,
    method: 'post'
  })
}

export function downloadRportFile(id) {
  const fileName = formatTime2(new Date(), 'yyyyMMddhhmmss') + '.xlsx'
  return download(
    `/reportTask/download/report/${id}`,
    fileName,
    'post'
  )
}
