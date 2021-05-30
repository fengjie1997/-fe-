import request from '@/utils/request'

/**
 * 保存/更新测试计划中的端口信息
 * @param {*} testPlanId
 * @param {*} params 请求参数
 * @param {*} schemaInfoVo
 */
export const setSchemaInfo = (testPlanId, params, schemaInfoVo) => {
  return request({
    url: `/uxTestplan/schema/${testPlanId}`,
    params: params,
    method: 'post',
    data: schemaInfoVo
  })
}
