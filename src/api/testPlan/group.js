import request from '@/utils/request'

/**
 * 获取测试计划中的任务组
 */
export const fetchtGroupListBySchemaId = (schemaId, planId) => {
  return request({
    url: `/uxTestplan/taskGroup/${schemaId}`,
    method: 'get',
    params: {
      planId: planId
    }

  })
}
