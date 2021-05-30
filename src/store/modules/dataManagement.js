import { fetchStationTree, fetchStationMapList, deleteByCitys } from '@/api/data/baseStation'
import {
  fetchDataRegionTree,
  getAdminRegion,
  addRegion,
  editRegionForm,
  fetchGeometry,
  getRegionDetail
} from '@/api/data/region'
import { getGeoStyle } from '@/utils/mapUtil'
import { copy } from 'copy-anything'

/**
 *  递归给非行政区域节点增加一个虚拟id
 */
const completeRegionTreeNodeData = (nodeData, parentId) => {
  if (!nodeData.hasOwnProperty('id') && parentId !== undefined) {
    nodeData.id = 'temp_'.concat(parentId).concat('_').concat(nodeData.name)
    nodeData.isNonAdminArea = true
  } else {
    if (nodeData.hasOwnProperty('children') && Array.isArray(nodeData.children)) {
      for (const childNode of nodeData.children) {
        completeRegionTreeNodeData(childNode, nodeData.id)
      }
    }
  }
}

/**
 *  将行政区数据展开
 */
const flattenAdminRegions = (regions) => {
  let mapping = {}
  for (const region of regions) {
    mapping[region.id] = region
    if (Array.isArray(region.children) && region.children.length > 0) {
      mapping = { ...mapping, ...flattenAdminRegions(region.children) }
    }
  }
  return mapping
}

const dataManagement = {
  namespaced: true,
  state: {
    baseStationTree: [],
    regionTree: [],
    adminRegions: []
    // baseStationList:[]
  },
  getters: {
    dataRegionTree: state => {
      const regionData = copy(state.regionTree)
      for (const item of regionData) {
        completeRegionTreeNodeData(item)
      }
      return regionData
    },
    adminRegionMapping: state => {
      return flattenAdminRegions(state.adminRegions)
    }
  },
  mutations: {
    SET_BASESTATION_TREE: (state, payload) => {
      state.baseStationTree = payload.baseStationTree
    },
    SET_ADMIN_REGIONS: (state, payload) => {
      state.adminRegions = payload.adminRegions
    },
    SET_REGION_TREE: (state, payload) => {
      state.regionTree = payload.regionTree
    }
    // SET_BASESTATION_List: (state, payload) => {
    //   state.baseStationList = payload.baseStationList
    // }
  },
  actions: {
    getBaseStationTree(conText, payload) {
      // 发出请求前
      if (payload && payload.beforeRequest) {
        payload.beforeRequest()
      }
      fetchStationTree().then(res => {
        if (res.data.code === 1) {
          const newBaseStationTree = res.data.data.map(item => {
            if (item.hasOwnProperty('children')) {
              item.children.map(item2 => {
                item2.id = item2.province + item2.city
              })
            }
            item.id = item.province
            return item
          })
          conText.commit('SET_BASESTATION_TREE', { baseStationTree: newBaseStationTree })
          // 请求成功后
          if (payload && payload.success) {
            payload.success()
          }
        }
      })
    },
    getBaseStationList(conText, payload) {
      const pageSize = 50000
      // 发出请求前
      if (payload && payload.beforeRequest) {
        payload.beforeRequest()
      }
      const listQuery = { page: 1, limit: 50000 }
      // 获取总数
      fetchStationMapList(payload.param, listQuery).then(res => {
        if (res.data.code === 1) {
          const allList = {
            titles: res.data.data.titles,
            records: []
          }
          //  请求成功后
          if (res.data.data['pages'] > 1) {
            var obj = [{ page: 1, limit: pageSize }]
            for (var index = 2; index < res.data.data.pages + 1; index++) {
              obj.push({ page: index, limit: pageSize })
            }
            Promise.all(obj.map(item => fetchStationMapList(payload.param, item))).then(stations => {
              for (var items in stations) {
                allList.records.push(...stations[items].data.data.records)
              }
              if (payload && payload.success) {
                payload.success(allList)
              }
            })
          } else {
            allList.records = res.data.data.records
            payload.success(allList)
          }
        }
      })
    },
    deleteStationAllDataByCity(conText, payload) {
      if (payload && payload.beforeRequest) {
        payload.beforeRequest()
      }
      const deleteCityList = payload.data.map(item => {
        return {
          city: item.city,
          province: item.province
        }
      })
      deleteByCitys(deleteCityList).then(res => {
        if (payload && payload.success) {
          payload.success()
        }
      })
    },
    getRegionTree(conText, payload) {
      // 发出请求前
      if (payload && payload.beforeRequest) {
        payload.beforeRequest()
      }
      fetchDataRegionTree().then(res => {
        if (res.data.code === 1) {
          conText.commit('SET_REGION_TREE', { regionTree: res.data.data })
          // 请求成功后
          if (payload && payload.success) {
            payload.success()
          }
        }
      })
    },
    getAdminRegions(conText, payload) {
      // 发出请求前
      if (payload && payload.beforeRequest) {
        payload.beforeRequest()
      }
      getAdminRegion().then(res => {
        if (res.data.code === 1) {
          conText.commit('SET_ADMIN_REGIONS', { adminRegions: res.data.data })
          // 请求成功后
          if (payload && payload.success) {
            payload.success()
          }
        }
      })
    },
    saveRegion(conText, payload) {
      const id = payload.id
      const params = payload.params
      if (payload && payload.beforeRequest) {
        payload.beforeRequest()
      }
      if (id) {
        // 更新区域
        editRegionForm(id, params).then(res => {
          if (res.data.code === 1) {
            if (payload && payload.success) {
              payload.success()
            }
          }
        })
      } else {
        // 新增区域
        addRegion(params).then(res => {
          if (res.data.code === 1) {
            if (payload && payload.success) {
              payload.success(res.data)
            }
          }
        })
      }
    },
    getRegionInfo(conText, payload) {
      const requests = [fetchGeometry(payload.regionId), getRegionDetail(payload.regionId)]
      Promise.all(requests).then(resp => {
        const geometryResp = resp[0]
        const propertyResp = resp[1]
        if (!geometryResp.canceled && !propertyResp.canceled) {
          if (geometryResp.data.code === 1 && propertyResp.data.code === 1) {
            const regionGeoJSON = {
              type: 'Feature'
            }
            regionGeoJSON.geometry = geometryResp.data.data
            const properties = propertyResp.data.data
            const geoStyle = getGeoStyle(properties)
            regionGeoJSON.properties = { id: payload.regionId, ...properties, ...geoStyle }
            if (payload && payload.success) {
              payload.success(regionGeoJSON)
            }
          }
        }
      })
      return requests
    }
  }
}

export default dataManagement
