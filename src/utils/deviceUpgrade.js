import { getCacheDict } from '@/utils/dictCache'

/**
 * @param timestamp 时间戳
 * @return String 格式化后的时间字符串'YY-MM-DD hh:mm:ss'
 **/
const timeFormat = timestamp => {
  console.log(timestamp)
  if (timestamp === undefined) {
    return '-'
  } else {
    const dateTime = new Date(timestamp)
    const YY = dateTime.getFullYear() + '-'
    const MM = (dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1) + '-'
    const DD = (dateTime.getDate() < 10 ? '0' + (dateTime.getDate()) : dateTime.getDate())
    const hh = (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()) + ':'
    const mm = (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()) + ':'
    const ss = (dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds())
    return YY + MM + DD + ' ' + hh + mm + ss
  }
}

/**
 *
 * @param fileSize 单位：Byte
 * @returns {string} 带单位的文件大小
 */
const fileSizeFormat = fileSize => {
  let size = ''
  if (fileSize < 1 * 1024) {
    // 如果小于0.1KB转化成B
    size = fileSize.toFixed(2) + ' B'
  } else if (fileSize < 1 * 1024 * 1024) {
    // 如果小于0.1MB转化成KB
    size = (fileSize / 1024).toFixed(2) + ' KB'
  } else if (fileSize < 1 * 1024 * 1024 * 1024) {
    // 如果小于0.1GB转化成MB
    size = (fileSize / (1024 * 1024)).toFixed(2) + ' MB'
  } else {
    // 其他转化成GB
    size = (fileSize / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }
  const sizestr = size + ''
  const len = sizestr.indexOf('\.')
  const dec = sizestr.substr(len + 1, 2)
  if (dec === '00') {
    // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}

// 时间易读性转换
export function getReadableTime(seconds) {
  if (typeof seconds !== 'number') return
  const days = Math.floor(seconds / (24 * 3600))// 计算出相差天数
  let remain = seconds - days * (24 * 3600) // 计算天数后剩余的秒数
  const hours = Math.floor(remain / 3600)// 计算出小时数
  remain = remain - hours * 3600 // 计算小时数后剩余的秒数
  const minutes = Math.floor(remain / 60) // 计算相差分钟数
  remain = remain - minutes * 60 // 计算分钟数后剩余的秒数
  let result = ''
  if (days) result += (days + 'd ')
  if (hours) result += (hours + 'h ')
  if (minutes) result += (minutes + 'min ')
  if (remain) result += (remain + 's ')
  return result
}

// 距离易读性转换
export function getReadableDistance(meters) {
  if (typeof meters !== 'number') return
  const kilometers = Math.floor(meters / 1000)// 计算出公里数
  const remain = meters - kilometers * 1000 // 计算天数后剩余的米数
  let result = ''
  if (kilometers) result += (meters / 1000 + ' ' + 'km ')
  else result += (remain + ' ' + 'm ')
  return result
}

// 设备升级状态映射
export function getDeviceUpgradeState(netTypeId) {
  const netType = getCacheDict('deviceUpgradeState').find(item => parseInt(item.code) === netTypeId)
  return netType ? netType.name : netTypeId
}
// 设备状态映射
export function getdeviceType(testSummaryId) {
  // console.log(testSummaryId)
  // console.log(getCacheDict('deviceType'))
  const testSummary = getCacheDict('deviceType').find(item => parseInt(item.code) === testSummaryId)
  return testSummary ? testSummary.name : testSummaryId
}
export function UngetdeviceType(testSummaryId) {
  // console.log(testSummaryId)
  // console.log(getCacheDict('deviceType'))
  const testSummary = getCacheDict('deviceType').find(item => parseInt(item.name) === testSummaryId)
  return testSummary ? testSummary.code : testSummaryId
}

export {
  timeFormat,
  fileSizeFormat
}
