// import store from '@/store'
import request from '@/utils/request'

// 获取端口列表
export const fetchPortListByPlanId = (deviceId, planId) => {
  return request({
    url: `/uxTestplan/schemaPort/${deviceId}`,
    params: {
      planId: planId
    },
    method: 'get'
  })
}
/**
 * 保存/更新测试计划中的端口信息
 * @param {*} testPlanId
 * @param {*} schemaInfoVo
 */
export const setSchemaInfo = (testPlanId, schemaInfoVo) => {
  return request({
    url: `/uxTestplan/schema/${testPlanId}`,
    method: 'post',
    data: schemaInfoVo
  })
}

/**
 * 切换传输端口
 * @param {*} deviceId 设备ID
 * @param {*} planId 测试计划ID
 * @param {*} modemPort 传输端口编号
 */
export const switchModemPort = (deviceId, planId, modemPort) => {
  return request({
    url: `/uxTestplan/switchModemPort/${deviceId}`,
    method: 'post',
    params: {
      planId,
      modemPort
    }
  })
}
