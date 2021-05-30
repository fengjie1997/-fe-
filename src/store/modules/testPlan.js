const testPlan = {
  state: {
    taskForm: {},
    testPlanId: null,
    taskId: null,
    schemaId: null,
    taskGroupId: null,
    // 切换传输端口
    testPortList: [],
    modemPort: null,
    selectedPort: null,
    portNumberList: null,
    deviceId: null
  },

  mutations: {
    SET_TESTPLANID: (state, testPlanId) => {
      state.testPlanId = testPlanId
    },
    SET_SCHEMAID: (state, schemaId) => {
      state.schemaId = schemaId
    },
    SET_TASKID: (state, taskId) => {
      state.taskId = taskId
    },
    SET_TASKGROUPID: (state, taskGroupId) => {
      state.taskGroupId = taskGroupId
    },
    SET_TESTPORTLIST: (state, testPortList) => {
      state.testPlanId = testPortList
    },
    SET_TASKFORM: (state, taskForm) => {
      state.taskForm = taskForm
    },
    SET_MODEM_PORT: (state, modemPort) => {
      state.modemPort = modemPort
    },
    SET_SELECTED_PORT: (state, selectedPort) => {
      state.selectedPort = selectedPort
    },
    SET_PORT_NUMBER_LIST: (state, portNumberList) => {
      state.portNumberList = portNumberList
    },
    SET_DEVICE_ID: (state, deviceId) => {
      state.deviceId = deviceId
    }
  },

  actions: {
    setTestPlanId({ commit }, testPlanId) {
      console.log(testPlanId)
      commit('SET_TESTPLANID', testPlanId)
    },
    setSchemaId({ commit }, schemaId) {
      commit('SET_SCHEMAID', schemaId)
    },
    setTaskId({ commit }, taskId) {
      commit('SET_TASKID', taskId)
    },
    setTaskGroupId({ commit }, taskGroupId) {
      commit('SET_TASKGROUPID', taskGroupId)
    },
    setPortList({ commit }, testPortList) {
      console.log('testPortList')
      commit('SET_TESTPORTLIST', testPortList)
    },
    setTaskForm({ commit }, taskForm) {
      console.log(taskForm)
      commit('SET_TASKFORM', taskForm)
    }

  }
}

export default testPlan
