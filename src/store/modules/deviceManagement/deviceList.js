import { setSchemaInfo } from '@/api/device/planPort'
import { addTaskGroup } from '@/api/device/testPlanList'

const deviceList = {
  namespaced: true,
  state: {
    testPlanId: undefined,
    schemaInfoVo: {}
  },
  mutations: {
    SET_TEST_PLAN_ID: (state, payload) => {
      state.testPlanId = payload.testPlanId
    },
    SET_SCHEMA_INFO_VO: (state, payload) => {
      state.schemaInfoVo = payload.schemaInfoVo
    }
  },
  actions: {
    setSchemaInfoVo: (conText, payload) => {
      setSchemaInfo(payload.testPlanId, payload.schemaInfoVo).then(res => {
        if (res.status === 200 && res.data.code === 1) {
          if (payload && payload.success) {
            payload.success()
          }
        }
      })
    },
    saveTaskGroup: (conText, payload) => {
      addTaskGroup(payload.schemaId, payload.taskGroup, payload.groupId).then(res => {
        if (res.status === 200 && res.data.code === 1) {
          if (payload && payload.success) {
            payload.success(res.data.data)
          }
        }
      })
    }
  }
}

export default deviceList
