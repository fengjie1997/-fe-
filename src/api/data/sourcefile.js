import request from '@/utils/request'
import download from '@/utils/download'
import { formatTime2 } from '@/utils/index'

/**
 * 获取文件列表
 */
export function fetchList(params, data) {
  return request({
    url: `/sourcefile/list`,
    method: 'post',
    params,
    data
  })
}

export function downloadSource(id, fileName) {
  return download(
    `/sourcefile/download/${id}`,
    fileName
  )
}

export function downloadPack(ids) {
  const fileName = formatTime2(new Date(), 'yyyyMMddhhmmss') + '.zip'
  return download(
    `/sourcefile/download_pack`,
    fileName,
    'post',
    {
      ids: ids
    }
  )
}

export function fetchDetail(id) {
  return request({
    url: `/sourcefile/detail/${id}`,
    method: 'get'
  })
}

export function reDecode(sourceId) {
  return request({
    url: `/sourcefile/redecode/${sourceId}`,
    method: 'get'
  })
}

export function deleteSources(ids) {
  return request({
    url: `/sourcefile/delete`,
    method: 'post',
    data: {
      ids: ids
    }
  })
}

export function batchSetTag(ids, tag1, tag2, tag3) {
  return request({
    url: `/sourcefile/saveTags`,
    method: 'post',
    data: {
      tag1: tag1,
      tag2: tag2,
      tag3: tag3,
      ids: ids
    }
  })
}

/**
 * 导出测试数据列表
 * @param params
 * @param data
 */
export function exportSourcefiles(params, data) {
  return download(
    `/sourcefile/exports`,
    `sourcefiles_${new Date().getTime()}.xlsx`,
    'post',
    data,
    false,
    params
  )
}

