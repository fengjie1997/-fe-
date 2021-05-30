// import store from '@/store'
import request from '@/utils/request'

/**
 * 创建测试计划基本信息
 * @param {*} deviceId
 * @param {*} baseConfig
 */
export const savingPlanBaseConf = (deviceId, baseConfig, testPlanId) => {
  return request({
    url: `/uxTestplan/create/${deviceId}`,
    method: 'post',
    params: {
      testPlanId: testPlanId
    },
    data: baseConfig
  })
}
/**
 * 获取测试计划基本配置
 */
export const fetchtPlanBaseInfo = (deviceId, testPlanId) => {
  return request({
    url: `/uxTestplan/uxTestplan/${testPlanId}`,
    params: {
      deviceId: deviceId
    },
    method: 'get'
  })
}
/**
 * 当前测试计划的列表
 */
