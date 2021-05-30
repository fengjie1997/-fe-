import { fetchGroupList, fetchRoleTree, getAdminRegionTree } from '@/api/current'

/**
 *  将分组树数据展开
 *  @param {Array} groupTree
 */
const flattenGroups = (groupTree) => {
  let mapping = {}
  for (const group of groupTree) {
    mapping[group.id] = group
    if (Array.isArray(group.children) && group.children.length > 0) {
      mapping = { ...mapping, ...flattenGroups(group.children) }
    }
  }
  return mapping
}

const current = {
  state: {
    groupTree: [],
    roleTree: [],
    regionTree: []
  },
  getters: {
    getGroupTree: state => {
      return state.groupTree
    },
    getRoleTree: state => {
      return state.roleTree
    },
    getRegionTree: state => {
      return state.regionTree
    },
    flattenGroups: state => {
      return flattenGroups(state.groupTree)
    }
  },
  mutations: {
    SET_GROUP: (state, payload) => {
      state.groupTree = payload
    },
    SET_ROLE: (state, payload) => {
      state.roleTree = payload
    },
    SET_REGION: (state, payload) => {
      state.regionTree = payload
    }
  },
  actions: {
    getGroup({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetchGroupList().then(res => {
          const data = res.data
          if (data.code === 1) {
            commit('SET_GROUP', data.data)
          } else {
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 刷新组树
     */
    refreshGroupTree({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetchGroupList().then(res => {
          const data = res.data
          if (data.code === 1) {
            commit('SET_GROUP', data.data)
          } else {
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 刷新角色树
     */
    refreshRoleTree({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetchRoleTree().then(res => {
          const data = res.data
          if (data.code === 1) {
            commit('SET_ROLE', data.data)
          } else {
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 刷新区域树
     */
    refreshRegionTree({ commit, state }) {
      return new Promise((resolve, reject) => {
        getAdminRegionTree().then(res => {
          const data = res.data
          if (data.code === 1) {
            commit('SET_REGION', data.data)
          } else {
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default current
