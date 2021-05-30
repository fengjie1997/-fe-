import request from '@/utils/request'

/**
 * 重复文件信息列表
 */
export function fetchRepeatList(data, params) {
  if (!data.hasOwnProperty('groupId')) {
    return request({
      url: `/srcRecChk/duplicateUploadFiles`,
      method: 'post',
      data: {},
      params: params
    })
  } else {
    return request({
      url: `/srcRecChk/duplicateUploadFiles`,
      method: 'post',
      data: {
        groupId: data.groupId
      },
      params: params
    })
  }
}

/**
 * 少上传文件信息列表
 */
export function fetchNotUploadList(data, params) {
  return request({
    url: `/srcRecChk/missUploadFiles`,
    method: 'post',
    data,
    params
  })
}

/**
 * 规定上传的文件信息列表
 */
export function fetchRequiredUploadList(data, params) {
  return request({
    url: `/srcRecChk/uploadFiles`,
    method: 'post',
    data,
    params
  })
}

/**
 * 已经完成上传的文件信息列表
 */
export function fetchUploadedList(data, params) {
  return request({
    url: `/srcRecChk/uploadedFiles`,
    method: 'post',
    data: {
      groupId: data.groupId,
      startDt: data.startDt
    },
    params
  })
}
// export function downloadSource(id, fileName) {
//   return download(
//     `/sourcefile/download/${id}`,
//     fileName
//   )
// }

