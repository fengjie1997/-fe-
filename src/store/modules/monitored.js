const monitored = {
  state: {
    monitoredGroupId: -1,
    monitoredGroupName: 'Device'
  },
  mutations: {
    SET_MONITORED_GROUP: (state, {
      groupId,
      groupName
    }) => {
      state.monitoredGroupId = groupId
      state.monitoredGroupName = groupName
    }
  },
  actions: {
    SetMonitoredGroup({ commit }, { groupId, groupName }) {
      console.log({
        groupId,
        groupName
      })
      commit('SET_MONITORED_GROUP', {
        groupId,
        groupName
      })
    }
  }
}

export default monitored
