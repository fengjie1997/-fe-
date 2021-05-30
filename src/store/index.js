import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import monitored from './modules/monitored'
import user from './modules/user'
import testPlan from './modules/testPlan'
import mapGis from './modules/mapGis'
import getters from './getters'
import dataManagement from './modules/dataManagement'
import deviceList from './modules/deviceManagement/deviceList'
import current from './modules/current'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    mapGis,
    testPlan,
    monitored,
    dataManagement,
    deviceList,
    current
  },
  getters
})

export default store
