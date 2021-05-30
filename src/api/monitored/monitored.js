import request from '@/utils/request'
import download from '@/utils/download'

export function fetchGroupList() {
  return request({
    url: '/group/currentVisible',
    method: 'get'
  })
}

/**
 * 概况
 */
export function fetchSummaryList(limit, page, data) {
  return request({
    url: '/deviceStatus/summary',
    method: 'post',
    params: {
      limit: limit,
      page: page
    },
    data: data
  })
}
/**
 * 设备状态
 * */
export function fetchDeviceStatusList(data, groupIds) {
  return request({
    url: '/deviceStatus/list',
    method: 'post',
    params: {
      limit: data.limit,
      page: data.page,
      field: data.field,
      isAsc: data.isAsc
    },
    data: {
      deviceIds: data.deviceIds,
      name: data.name,
      statuses: data.statuses,
      groupIds: groupIds,
      types: data.types
    }
  })
}
/**
 * 待上传文件列表
 */
export function fetchDeviceFileList(deviceId) {
  return request({
    url: `/deviceStatus/getDeviceFileList`,
    method: 'post',
    params: {
      deviceId: deviceId
    }
  })
}
/**
 * 上传当天日志
 */
export function fetchUploadLog(data) {
  return request({
    url: `/deviceStatus/uploadInDay`,
    method: 'post',
    data: {
      id: data.deviceId,
      type: Number(data.deviceType)
    }
  })
}
/**
 * 断开
 */
export function fetchDisconnect(data) {
  return request({
    url: '/deviceStatus/disconnect',
    method: 'post',
    data: {
      id: data.deviceId,
      type: Number(data.deviceType)
    }
  })
}
/**
 * 暂停
 */
export function fetchPause(data) {
  return request({
    url: '/deviceStatus/pause',
    method: 'post',
    data: {
      id: data.deviceId,
      type: Number(data.deviceType)
    }
  })
}
/**
 * 开始
 */
export function fetchPlay(data) {
  return request({
    url: '/deviceStatus/play',
    method: 'post',
    data: {
      id: data.deviceId,
      type: Number(data.deviceType)
    }
  })
}
/**
 * 重启
 */
export function fetchReboot(data) {
  return request({
    url: '/deviceStatus/reboot',
    method: 'post',
    data: {
      id: data.deviceId,
      type: Number(data.deviceType)
    }
  })
}
/**
 * 停止
 */
export function fetchStop(data) {
  return request({
    url: '/deviceStatus/stop',
    method: 'post',
    data: {
      id: data.deviceId,
      type: Number(data.deviceType)
    }
  })
}
/**
 * 更新计划
 */
export function fetchUpdatePlan(data) {
  return request({
    url: '/deviceStatus/updatePlan',
    method: 'post',
    data: {
      id: data.deviceId,
      type: Number(data.deviceType)
    }
  })
}
/**
 * 告警详情
 */
export function fetchAlarmDetailsList(data) {
  return request({
    url: '/deviceAlarm/get',
    method: 'post',
    params: {
      limit: data.limit,
      page: data.page,
      field: data.field,
      isAsc: data.isAsc
    },
    data: {
      alarmCodes: data.alarmCodes,
      alarmLevels: data.alarmLevels,
      alarmContent: data.alarmContent,
      deviceIds: data.deviceIds,
      startTime: data.startTime,
      endTime: data.endTime,
      groupIds: data.groupIds,
      deviceName: data.deviceName
    }
  })
}
/**
 * 事件详情
 */
export function fetchEventDetailsList(data) {
  return request({
    url: '/deviceEvent/get',
    method: 'post',
    params: {
      limit: data.limit,
      page: data.page,
      field: data.field,
      isAsc: data.isAsc
    },
    data: {
      codes: data.codes,
      content: data.content,
      deviceIds: data.deviceIds,
      endTime: data.endTime,
      ports: data.ports,
      startTime: data.startTime,
      groupIds: data.groupIds,
      deviceName: data.deviceName
    }
  })
}
/**
 * 登录日志 设备
 */
export function fetchLoginLogListByDevice(params, data) {
  return request({
    url: '/deviceConnectLog/summary',
    method: 'post',
    params: {
      limit: params.limit,
      page: params.page,
      field: params.field,
      isAsc: params.isAsc
    },
    data: {
      deviceIds: data.deviceIds,
      deviceName: data.deviceName,
      deviceTypes: data.deviceTypes,
      endTime: data.endTime,
      startTime: data.startTime,
      groupIds: data.groupIds
    }
  })
}
/**
 * 登录日志 详细
 */
export function fetchLoginLogList(params, data) {
  return request({
    url: '/deviceConnectLog/get',
    method: 'post',
    params: {
      limit: params.limit,
      page: params.page,
      field: params.field,
      isAsc: params.isAsc
    },
    data: {
      deviceIds: data.deviceIds,
      deviceName: data.deviceName,
      deviceTypes: data.deviceTypes,
      endTime: data.endTime,
      startTime: data.startTime,
      groupIds: data.groupIds
    }
  })
}
export function exportLoginLogList(fileName, query) {
  return download(
    '',
    fileName,
    'post',
    query
  )
}
/**
 * 状态统计
 */
export function fetchStateStatisticsByDeviceList(params, data) {
  return request({
    url: '/deviceStatus/summaryDevice',
    method: 'post',
    params: {
      limit: params.limit,
      page: params.page,
      field: params.field,
      isAsc: params.isAsc
    },
    data: {
      deviceIds: data.deviceIds,
      deviceName: data.deviceName,
      deviceTypes: data.deviceTypes,
      endTime: data.endTime,
      startTime: data.startTime,
      ports: data.ports
    }
  })
}
// 状态统计-按组统计
export function fetchStateStatisticsListByGroup(data) {
  return request({
    url: '/deviceStatus/summaryGroup',
    method: 'post',
    data: {
      deviceIds: data.deviceIds,
      groupIds: data.groupIds,
      deviceName: data.deviceName,
      deviceTypes: data.deviceTypes,
      endTime: data.endTime,
      startTime: data.startTime
    }
  })
}
// 状态统计-按设备统计
export function fetchStateStatisticsListByDevice(data) {
  return request({
    url: '/deviceStatus/summaryDevice',
    method: 'post',
    params: {
      limit: data.limit,
      page: data.page
    },
    data: {
      deviceIds: data.deviceIds,
      deviceTypes: data.deviceTypes,
      groupIds: data.groupIds,
      ports: data.ports,
      endTime: data.endTime,
      startTime: data.startTime
    }
  })
}
/**
 * 设备日志 list
 */
export function fetchDeviceLogList(data) {
  return request({
    url: '/sourceFileOther/get',
    method: 'post',
    params: {
      limit: data.limit,
      page: data.page
    },
    data: {
      deviceIds: data.deviceIds,
      deviceName: data.deviceName,
      deviceTypes: data.deviceTypes,
      groupIds: data.groupIds
    }
  })
}
/**
 * 设备日志 日志下载
 */
export function fetchLogDown(id, fileName) {
  return download(
    `/sourceFileOther/download/${id}`,
    fileName,
    'get'
  )
}
// export function exportLoginLogList(fileName, query) {
//   return download(
//     '',
//     fileName,
//     'post',
//     query
//   )
// }
// export function exportLoginLogList(params, data) {
//   return request({
//     url: '/deviceConnectLog/get',
//     method: 'post',
//     params: {
//       limit: params.limit,
//       page: params.page,
//       field: params.field,
//       isAsc: params.isAsc
//     },
//     data: {
//       deviceIds: data.deviceIds,
//       deviceName: data.deviceName,
//       deviceTypes: data.deviceTypes,
//       endTime: data.endTime,
//       startTime: data.startTime
//     }
//   })
// }
