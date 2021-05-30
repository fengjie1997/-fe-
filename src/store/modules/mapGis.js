// import { fetchtSchemaPortList } from '@/api/device/mapGisList.js'
// import { savingTestPlanPortInfo } from '@/api/device/mapGisList.js'
const mapGis = {
  state: {
    listParams: {}
  },

  mutations: {
    SET_LISTPARAMS: (state, listParams) => {
      state.listParams[listParams.name] = listParams.data
    }
  },

  actions: {
    setListParams({ commit }, listParams) {
      console.log(listParams)
      commit('SET_LISTPARAMS', listParams)
    }

  }
}

export default mapGis
