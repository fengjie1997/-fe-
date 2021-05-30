import i18n from '@/lang'
import store from '@/store/index'
import splitPane from 'vue-splitpane'
import Pagination from '@/components/Pagination'
import StationMap from './component/stationMap.vue'
import downloadByFrame from '@/utils/downloadCell'
// todo 后续换成异步数据流方式
import { fetchStationList, cellUploadUrl, deleteCellByIds, UpdataCellByIds } from '@/api/data/baseStation.js'
import { mapState, mapActions } from 'vuex'
import { getCacheDict } from '@/utils/dictCache'
export default {
  name: 'BaseStation',
  components: { splitPane, StationMap, Pagination },
  data() {
    return {
      stationUploading: false,
      deleteList: [],
      cityList: [],
      netTypeList: [],
      cityOption: [],
      network: null,
      exportShow: false,
      uploadState: true,
      editShow: false,
      editStationData: {
        province: null,
        city: null,
        btsName: null,
        cellId: null,
        cellStatus: null
      },
      fileList: [],
      afterDelete: [],
      checkedListTow: [],
      mapLoading: false,
      dataLayers: {},
      lookupTableData: [],
      token: store.state.user.token,
      size: store.state.app.size,
      importType: 0,
      apiUrl: cellUploadUrl,
      checkedList: [],
      total: 0,
      listParams: {
        cellName: '',
        cellTypes: [],
        networkTypes: [],
        providers: [],
        provinceCitys: []
      },
      listQuery: {
        page: 1,
        limit: 50,
        search: undefined,
        field: 'id',
        isAsc: 0
      },
      treeData: [],
      viewType: 'map',
      stationTableData: [],
      props: {
        label: 'name',
        children: 'children'
      },
      providersOp: [
        { name: 'Huawei', code: 'Huawei' },
        { name: 'ZTE', code: 'ZTE' },
        { name: 'Nokia', code: 'Nokia' },
        { name: 'Ericsson', code: 'Ericsson' }
      ],
      cellOptions: [
        { name: 'Indoor', code: 'Indoor' },
        { name: 'Outdoor', code: 'Outdoor' }
      ],
      netTypeOptions: getCacheDict('cwNetworkType'),
      dialogVisible: false,
      mapData: [],
      listLoading: false
    }
  },
  watch: {
    listQuery: {
      handler(newQuery) {
        this.loadTableData()
        // this.getList(this.listParams, newQuery)
      },
      deep: true
    }
    // ,
    // listParams: {
    //   handler(newParams) {
    //     this.getCellLookupData(newParams)
    //     this.getList(newParams, this.listQuery)
    //   },
    //   deep: true
    // }
  },
  computed: {
    ...mapState({
      baseStationTree: state => state.dataManagement.baseStationTree,
      name: state => state.user.name
    })
  },
  created() {
    const that = this
    // 请求基站Tree数据
    this.getBaseStationTree({
      beforeRequest: function() {
        that.mapLoading = true
      },
      success: function() {
        that.mapLoading = false
      }
    })
    // store.commit('SET_NAME', '实验')
  },
  methods: {
    ...mapActions({
      deleteStationAllDataByCity: 'dataManagement/deleteStationAllDataByCity',
      getBaseStationTree: 'dataManagement/getBaseStationTree',
      getBaseStationList: 'dataManagement/getBaseStationList'
    }),
    exportData() {
      console.debug(this.baseStationTree)
      this.cityList = []
      this.baseStationTree.map(item => {
        item.children.map(item2 => {
          this.cityList.push(item2.city)
        })
      })
      this.netTypeList = []
      this.netTypeOptions.map(item => {
        this.netTypeList.push(item.code)
      })
      this.exportShow = true
    },
    submitExport() {
      // const that = this
      this.cityOption.map(item => {
        console.log(this.cityOption)
        // var obj = {
        //   city: item,
        //   modelType: 1,
        //   networkType: 'LTEFDD'
        // }
        downloadByFrame(`/cell/export/?modelType=0&city=` + item, '', 'get', {}, true, {
          success: () => {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('baseData.exportDownload'),
              type: 'success'
            })
          },
          error: (errorData) => {
            console.log(errorData)
            this.$notify({
              title: this.$t('common.error'),
              message: this.$t('baseData.downloadFailed'),
              type: 'error',
              duration: 2000 })
          }
        }).then(res => {
          console.log(res)
        })
      })
    },
    uploadError(res) {
      this.stationUploading = false
    },
    codeTO(obj) {
      if (obj.hasOwnProperty('response')) {
        if (obj.response.code === 0) {
          return this.$t('common.fail')
        }
        if (obj.response.code === 1) {
          return this.$t('common.success')
        }
      }
    },
    getMessage(data) {
      console.log(data)
      if (data !== undefined) {
        if (data.code === 1) {
          return this.$t('common.success')
        }
        if (data.errorCode === 11302) {
          return data.message.slice(6)
        } else {
          const key = 'errorCode' + '.' + data.errorCode.toString()
          data.message = i18n.t(key)
          return data.message
        }
      } else {
        return
      }
    },
    handleFileDel() {
      this.deleteList.map(item => {
        this.fileList.map((item2, index) => {
          if (item === item2) {
            this.fileList.splice(index, 1)
          }
        })
      })
    },
    Edit(type) {
      console.log(type)
      this.editShow = true
      this.editStationData = type
    },
    selectionChange(type) {
      this.deleteList = type
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.stationUploading = true
    },
    submit() {
      const updata = {
        azimuth: this.editStationData.azimuth,
        cellStatus: this.editStationData.cellStatus,
        coverType: this.editStationData.coverType,
        cpi: this.editStationData.cpi,
        latitude: this.editStationData.latitude,
        longitude: this.editStationData.longitude,
        outdoorIndoor: this.outdoorIndoor
      }
      UpdataCellByIds(this.editStationData.id, updata).then(res => {
        console.log('success', res)
        this.editShow = false
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.success'),
          type: 'success'
        })
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    todeleteAllData() {
      if (this.$refs.stationTree.getCheckedNodes().length >= 1) {
        this.$confirm(this.$t('baseData.deleteTipAll'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          const that = this
          that.deleteStationAllDataByCity({
            data: that.$refs.stationTree.getCheckedNodes(),
            beforeRequest: function() {
              console.log('beforeRequest')
            },
            success: function() {
              that.getBaseStationTree()
              that.handleSearch()
              that.afterDelete = []
            }
          })
        })
      } else {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('baseData.chooseRoadFirst'),
          type: 'error',
          duration: 2000
        })
      }
    },
    todeleteData() {
      this.checkedListTow = this.$refs.stationTableDatas.selection
      if (this.checkedListTow.length >= 1) {
        this.$confirm(this.$t('baseData.deleteTipAll'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          const arr = []
          this.checkedListTow.map(item => {
            arr.push(item.id)
          })
          const that = this
          deleteCellByIds(arr).then(res => {
            that.getBaseStationTree({
              success: function() {
                var baseStationTreeIdList = []
                that.baseStationTree.map(item => {
                  if (item.hasOwnProperty('children')) {
                    item.children.map(item2 => {
                      baseStationTreeIdList.push(item2.id)
                    })
                  }
                })
                var afterDeleteList = Object.assign([], that.afterDelete)
                that.afterDelete = []
                afterDeleteList.map(item3 => {
                  that.afterDelete.push(...baseStationTreeIdList.filter(file => file === item3))
                })
              }
            })
            that.handleSearch()
          })
        })
      } else {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('baseData.chooseRoadFirst'),
          type: 'error',
          duration: 2000
        })
      }
    },
    todeleteDataOne(row) {
      this.$confirm(this.$t('baseData.deleteTipAll'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        const that = this
        deleteCellByIds([row.id]).then(res => {
          that.getBaseStationTree({
            success: function() {
              var baseStationTreeIdList = []
              that.baseStationTree.map(item => {
                if (item.hasOwnProperty('children')) {
                  item.children.map(item2 => {
                    baseStationTreeIdList.push(item2.id)
                  })
                }
              })
              var afterDeleteList = Object.assign([], that.afterDelete)
              that.afterDelete = []
              afterDeleteList.map(item3 => {
                that.afterDelete.push(...baseStationTreeIdList.filter(file => file === item3))
              })
            }
          })
          that.handleSearch()
        })
        this.$message({
          type: 'success',
          message: this.$t('common.deleteSuccess')
        })
      })
    },
    getCellLookupData(params) {
      fetchStationList(params).then(res => {
        this.lookupTableData = res.data.data.records
      })
    },
    // handleSearch() {
    //   this.getList(this.listParams, this.listQuery)
    //   this.$refs.refCellMap.handleSearchLayer(this.listParams)
    // },
    getList(params, listQuery) {
      this.listLoading = true
      if (params.provinceCitys.length === 0) {
        this.stationTableData = []
        this.total = 0
        this.listLoading = false
      } else {
        fetchStationList(params, listQuery).then(res => {
          this.stationTableData = res.data.data.records
          this.total = Number(res.data.data.total)
          // 数据读取完毕
          this.listLoading = false
        })
      }
    },
    handleNodeClick(node, checkedObj) {
      this.afterDelete = this.$refs.stationTree.getCheckedKeys()
      console.log(this.$refs.stationTree.getCheckedNodes())
      // this.listParams.provinceCitys = []
      // var checkedList = this.checkedList = this.$refs.stationTree.getCheckedNodes()
      // if (checkedList.length > 0) {
      //   this.mapLoading = true
      // }
      // // data layer
      // checkedList.forEach(item => {
      //   var city = []
      //   city.push(item.city)
      //   var ele = {
      //     citys: city,
      //     province: item.province
      //   }
      //   this.listParams.provinceCitys.push(ele)
      // })

      // 加载/移除地图基站图层
      const leafNodes = node.hasOwnProperty('children') ? node.children : [node]
      if (leafNodes.length > 0) {
        const isCheck = checkedObj.checkedNodes.includes(node)
        for (const leafNode of leafNodes) {
          isCheck ? this.addCellLayer(leafNode) : this.removeCellLayer(leafNode)
        }
      }

      // 加载表格数据
      this.loadTableData()
    },
    removeCellLayer(node) {
      const cellMap = this.$refs.refCellMap.cellMap
      const dataLayers = cellMap.dataLayers
      if (dataLayers[node.id]) {
        const mapWrapper = cellMap.map.mapWrapper
        dataLayers[node.id].destroy()
        delete dataLayers[node.id]
        const bounds = this.getDataLayersBounds()
        if (bounds) mapWrapper.fitBounds(bounds)
      }
    },
    addCellLayer(node) {
      const cellMap = this.$refs.refCellMap.cellMap
      const mapWrapper = cellMap.map.mapWrapper
      const dataLayers = cellMap.dataLayers
      const param = {
        ...this.listParams,
        provinceCitys: [
          {
            province: node.province,
            citys: [node.city]
          }
        ]
      }
      const mapNotify = mapWrapper.notify({
        type: 'loading',
        content: this.$t('baseData.stationDataLoading')
      })
      this.getBaseStationList({
        param,
        success: (data) => {
          if (Array.isArray(data.records) && data.records.length > 0) {
            const title = data.titles
            const rows = [title].concat(data.records)
            const layer = dataLayers[node.id] = mapWrapper.createCellOverlay({
              directionKey: 'azimuth',
              labelOffset: 0,
              labelFields: ['cpi', 'cellName']
            })
            layer.setData(rows, {
              latKey: 'latitude',
              lngKey: 'longitude',
              crsCode: 'WGS84'
            })
          }
          mapNotify.destroy()
          const bounds = this.getDataLayersBounds()
          if (bounds) mapWrapper.fitBounds(bounds)
        }
      })
    },
    getDataLayersBounds() {
      const dataLayers = this.$refs.refCellMap.cellMap.dataLayers
      if (dataLayers && Object.keys(dataLayers).length > 0) {
        const lats = []
        const lngs = []
        for (const layerKey in dataLayers) {
          const layer = dataLayers[layerKey]
          const layerBounds = layer.getStore().getBounds()
          lats.push(layerBounds.north)
          lats.push(layerBounds.south)
          lngs.push(layerBounds.east)
          lngs.push(layerBounds.west)
        }
        return {
          east: Math.max(...lngs),
          north: Math.max(...lats),
          south: Math.min(...lats),
          west: Math.min(...lngs)
        }
      }
    },
    handleFilter() {

    },
    uploadSuccess(res) {
      const that = this
      if (res.code === 1) {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('baseData.uploadSuccess'),
          type: 'success',
          duration: 2000
        })
        this.getBaseStationTree({
          beforeRequest: function() {
            that.mapLoading = true
          },
          success: function() {
            that.mapLoading = false
          }
        })
      } else {
        const str = 'errorCode.' + res.errorCode
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t(str.toString()),
          type: 'error',
          duration: 2000
        })
      }
      this.uploadState = false
      this.stationUploading = false
    },
    mapFilter() {
      const fileters = Object.assign({}, this.listParams)
      const mapList = this.$refs.refCellMap.cellMap.dataLayers
      delete fileters.provinceCitys
      console.log(fileters)
      Object.keys(fileters).forEach(fkey => {
        // 条件为空移除筛选条件
        if (fileters[fkey].length <= 0) {
          Object.keys(mapList).forEach(key => {
            mapList[key].store.clearFilter()
          })
        } else {
          // 逐个图层筛选
          Object.keys(mapList).forEach(key => {
            console.log(fkey)
            mapList[key].store.setFilter(function(mapStore, row) {
              return mapStore.fetch(row, fkey) === fileters[fkey]
            })
          })
        }
      })
    },
    handleSearch() {
      const checkedLeafNodes = this.$refs.stationTree.getCheckedNodes(true)
      const dataLayers = this.$refs.refCellMap.cellMap.dataLayers
      // 清空地图当前图层
      for (const layerKey in dataLayers) {
        dataLayers[layerKey].destroy()
        delete dataLayers[layerKey]
      }
      if (checkedLeafNodes.length === 0) {
        // 清空表格
        this.stationTableData = []
        this.total = 0
      } else {
        // 重新加载地图和表格数据
        for (const node of checkedLeafNodes) {
          this.addCellLayer(node)
        }
        this.loadTableData()
      }
    },
    loadTableData() {
      const checkedLeafNodes = this.$refs.stationTree.getCheckedNodes(true)
      const tableParams = {
        ...this.listParams,
        provinceCitys: []
      }
      for (const node of checkedLeafNodes) {
        // 组装表格请求参数
        const province = node.province
        const city = node.city
        const proCitiesItem = tableParams.provinceCitys.find(item => item.province === province)
        if (proCitiesItem) {
          proCitiesItem.citys.push(city)
        } else {
          tableParams.provinceCitys.push({
            province: province,
            citys: [city]
          })
        }
      }
      this.getList(tableParams, this.listQuery)
    }
  }
}
