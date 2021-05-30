import i18n from '@/lang'
import store from '@/store/index'
import splitPane from 'vue-splitpane'
import Pagination from '@/components/Pagination'
import RoadMap from './component/roadMap.vue'
import { getCacheDict } from '@/utils/dictCache'
import { fetchRoadTree, fetchRoadList, roadUploadUrl, administrativeTree, deleteData, deleteByDetailAreas } from '@/api/data/baseRoad.js'
export default {
  name: 'DataTraffic',
  components: { splitPane, RoadMap, Pagination },
  data() {
    return {
      trafficUploading: false,
      deleteList: [],
      afterDelete: [],
      uploadState: true,
      fileList: [],
      mapLoading: false,
      checkedListTow: [],
      roadName: '',
      valueType: null,
      options: getCacheDict('roadType'),
      chooseAreaId: [],
      token: store.state.user.token,
      requests: {},
      importType: 0,
      apiUrl: roadUploadUrl,
      checkedList: [],
      total: 0,
      listQuery: {
        areas: [],
        roadName: undefined
      },
      listParams: {
        page: 1,
        limit: 50,
        search: undefined,
        field: undefined,
        isAsc: undefined
      },
      treeData: [],
      viewType: 'map',
      stationTree: [],
      stationTableData: [],
      props: {
        label: 'name',
        children: 'children'
      },
      providersOp: [],
      cellOptions: [],
      netTypeOptions: [
        {
          label: 'LTE',
          value: 'LET'
        }
      ],
      dialogVisible: false,
      mapData: [],
      listLoading: false,
      treeList: []
    }
  },
  watch: {
    listQuery: {
      handler(newQuery) {
        console.log('监控listQuery', newQuery)
        if (newQuery.roadName === '') this.clearop()
      },
      deep: true
    },
    listParams: {
      handler(newParams) {
        console.log('监控listPa', newParams)
        this.getList()
      },
      deep: true
    }
  },
  computed: {
  },
  created() {
    // store.dispatch('setApiUrl', 'http://172.16.24.122:8001')
    // 请求道路Tree数据
    this.mapLoading = true
    fetchRoadTree().then(res => {
      if (res.data.code === 1) {
        this.treeData = Object.assign([], res.data.data)
        res.data.data.map(item => {
          if (item.hasOwnProperty('children')) {
            item.children.map(item2 => {
              if (item2.hasOwnProperty('children')) {
                item2.children.map(item3 => {
                  item3.id = String(item.id) + String(item2.id) + String(item3.roadType) + 'id'
                })
              }
            })
          }
        })
        this.stationTree = res.data.data
        this.mapLoading = false
      }
    })
  },
  methods: {
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      console.log(childValue)
      this.listLoading = childValue
      this.mapLoading = childValue
    },
    uploadError(res) {
      this.trafficUploading = false
    },
    codeTO(obj) {
      if (obj.hasOwnProperty('response')) {
        if (obj.response.code === 0) {
          return '失败'
        }
        if (obj.response.code === 1) {
          return '成功'
        }
      }
    },
    getMessage(data) {
      console.log(data)
      if (data !== undefined) {
        if (data.code === 1) {
          return this.$t('common.success')
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
    selectionChange(type) {
      this.deleteList = type
    },
    submitUpload() {
      if (this.chooseAreaId === null || this.chooseAreaId.length === 0) {
        this.$alert(this.$t('baseData.selectRoad1'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else if (this.valueType === null) {
        this.$alert(this.$t('baseData.selectRoad2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        this.$refs.upload.submit()
        this.trafficUploading = true
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    clearop() {
      this.listQuery.roadName = undefined
      const demeG = this.$refs.refRoadMap.lmap
      this.$refs.stationTree.getCheckedNodes().map(item => {
        if (item.hasOwnProperty('children')) {
          return
        }
        demeG.dataLayer[[item.areaId + '_' + item.roadType]].store.clearFilter()
      })
      fetchRoadList(this.listQuery, this.listParams).then(res => {
        // this.mapLoading = true
        // fetchRoadTree().then(res => {
        //   if (res.data.code === 1) {
        //     this.treeData = Object.assign([], res.data.data)
        //     res.data.data.map(item => {
        //       if (item.hasOwnProperty('children')) {
        //         item.children.map(item2 => {
        //           if (item2.hasOwnProperty('children')) {
        //             item2.children.map(item3 => {
        //               item3.id = String(item.id) + String(item2.id) + String(item3.roadType) + 'id'
        //             })
        //           }
        //         })
        //       }
        //     })
        //     this.stationTree = res.data.data
        //     this.mapLoading = false
        //   }
        // })
        this.stationTableData = res.data.data.records
        this.total = Number(res.data.data.total)
      })
    },
    todeleteAllData() {
      if (this.$refs.refRoadMap.ifEndReq === true) {
        const deteleList = []
        const lineLayerKeys = []
        this.afterDelete = []
        this.$refs.stationTree.getCheckedNodes().map(item => {
          if (!item.hasOwnProperty('children')) {
            lineLayerKeys.push(item.areaId + '_' + item.roadType)
            deteleList.push({
              cityAreaId: item.areaId,
              roadType: item.roadType
            })
          }
        })
        if (lineLayerKeys.length > 0) {
          this.$confirm(this.$t('baseData.deleteTipAll'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
            deleteByDetailAreas(deteleList).then(res => {
              lineLayerKeys.map(item2 => {
                const demeG = this.$refs.refRoadMap.lmap
                demeG.dataLayer[item2].destroy()
                delete demeG.dataLayer[item2]
              })
              fetchRoadList(this.listQuery, this.listParams).then(res => {
                this.mapLoading = true
                fetchRoadTree().then(res => {
                  if (res.data.code === 1) {
                    this.treeData = Object.assign([], res.data.data)
                    res.data.data.map(item => {
                      if (item.hasOwnProperty('children')) {
                        item.children.map(item2 => {
                          if (item2.hasOwnProperty('children')) {
                            item2.children.map(item3 => {
                              item3.id = String(item.id) + String(item2.id) + String(item3.roadType) + 'id'
                            })
                          }
                        })
                      }
                    })
                    this.stationTree = res.data.data
                    this.mapLoading = false
                    this.$notify({
                      title: this.$t('common.success'),
                      message: this.$t('common.deleteSuccess'),
                      type: 'success',
                      duration: 2000
                    })
                  }
                })
                this.stationTableData = res.data.data.records
                this.total = Number(res.data.data.total)
              })
            })
          })
        } else {
          this.$notify({
            title: this.$t('common.error'),
            message: this.$t('baseData.deleteRoad'),
            type: 'error',
            duration: 2000
          })
        }
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
          const delObject = {}
          var idList = []
          for (const item of this.checkedListTow) {
            const lineLayerKey = item.areaId + '_' + item.type
            if (delObject.hasOwnProperty(lineLayerKey)) {
              delObject[lineLayerKey].push(item.id)
            } else {
              delObject[lineLayerKey] = [item.id]
            }
            idList.push(item.id)
          }
          deleteData(idList).then(res => {
            fetchRoadList(this.listQuery, this.listParams).then(res => {
              this.mapLoading = true
              fetchRoadTree().then(res => {
                if (res.data.code === 1) {
                  this.treeData = Object.assign([], res.data.data)
                  res.data.data.map(item => {
                    if (item.hasOwnProperty('children')) {
                      item.children.map(item2 => {
                        if (item2.hasOwnProperty('children')) {
                          item2.children.map(item3 => {
                            item3.id = String(item.id) + String(item2.id) + String(item3.roadType) + 'id'
                          })
                        }
                      })
                    }
                  })
                  this.stationTree = res.data.data
                  this.mapLoading = false
                  console.log(this.stationTree)
                  const demeG = this.$refs.refRoadMap.lmap
                  for (const lineLayerKey in delObject) {
                    const lineLayerStore = demeG.dataLayer[lineLayerKey].getStore()
                    demeG.dataLayer[lineLayerKey].setData([lineLayerStore.getHeader(), ...lineLayerStore.rawRows.filter(item2 => !delObject[lineLayerKey].includes(item2[3]))], {
                      geojsonKey: 'RoadDefinition',
                      groupKey: 'group'
                    })
                  }
                }
              })
              this.stationTableData = res.data.data.records
              this.total = Number(res.data.data.total)
            })
          })
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.deleteSuccess'),
            type: 'success',
            duration: 2000
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
      console.log(row)
      const demeG = this.$refs.refRoadMap.lmap
      const lineLayerKey = row.areaId + '_' + row.type
      const lineLayerStore = demeG.dataLayer[lineLayerKey].getStore()
      console.log(lineLayerStore)
      console.log(demeG.dataLayer[lineLayerKey])
      demeG.dataLayer[lineLayerKey].setData([lineLayerStore.getHeader(), ...lineLayerStore.rawRows.filter(item => item[3] !== row.id)], {
        geojsonKey: 'RoadDefinition',
        groupKey: 'group'
      })
      this.$confirm(this.$t('baseData.deleteTipAll'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.mapLoading = true
        deleteData([row.id]).then(res => {
          fetchRoadList(this.listQuery, this.listParams).then(res => {
            this.mapLoading = true
            fetchRoadTree().then(res => {
              if (res.data.code === 1) {
                this.treeData = Object.assign([], res.data.data)
                res.data.data.map(item => {
                  if (item.hasOwnProperty('children')) {
                    item.children.map(item2 => {
                      if (item2.hasOwnProperty('children')) {
                        item2.children.map(item3 => {
                          item3.id = String(item.id) + String(item2.id) + String(item3.roadType) + 'id'
                        })
                      }
                    })
                  }
                })
                this.stationTree = res.data.data
                this.mapLoading = false
                console.log(this.stationTree)
              }
            })
            this.stationTableData = res.data.data.records
            this.total = Number(res.data.data.total)
          })
        })
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.deleteSuccess'),
          type: 'success',
          duration: 2000
        })
      })
    },
    mapFilter() {
      fetchRoadList(this.listQuery, this.listParams).then(res => {
        this.stationTableData = res.data.data.records
        this.total = Number(res.data.data.total)
        console.log(res)
      })
      if (this.listQuery.roadName !== undefined && this.listQuery.roadName !== '') {
        const demeG = this.$refs.refRoadMap.lmap
        const roadName = this.listQuery.roadName
        this.$refs.stationTree.getCheckedNodes().map(item => {
          if (!item.hasOwnProperty('children')) {
            demeG.dataLayer[[item.areaId + '_' + item.roadType]].store.setFilter(function(mapStore, row) {
              return mapStore.fetch(row, 'name') === roadName
            })
            // console.log(demeG.dataLayer[[item.areaId + item.roadType]].store)
            const filteredBounds = demeG.dataLayer[[item.areaId + '_' + item.roadType]].store.getFilteredBounds()
            console.log(filteredBounds)
            if (filteredBounds) {
              demeG.fitBounds(filteredBounds)
            }
          }
        })
      }
    },
    roadTypeSwitch(type) {
      var reallyType = ''
      if (typeof type === 'object') {
        reallyType = type.type
      } else { reallyType = type }
      var newname = ''
      const mapItem = this.options.filter(item => parseInt(item.code) === reallyType)
      newname = mapItem[0] ? mapItem[0].name : ''
      return newname
    },
    dialogVisibleShow() {
      this.dialogVisible = true
      administrativeTree().then(res => {
        this.treeList = res.data.data
        console.log(res.data.data)
      })
    },
    getList() {
      this.listLoading = true
      fetchRoadList(this.listQuery, this.listParams).then(res => {
        console.log('getList里边的赋值', res)
        this.stationTableData = res.data.data.records
        this.total = Number(res.data.data.total)
        this.listLoading = false
      })
    },
    handleNodeClick() {
      console.log(this.listQuery.roadName)
      if (this.listQuery.roadName !== undefined) {
        this.$notify({
          title: this.$t('common.error'),
          message: '请先清空搜索条件',
          type: 'error',
          duration: 2000
        })
      } else {
        this.listQuery = {
          areas: [],
          roadName: undefined
        }
        // this.listQuery.areas = []
        this.checkedList = this.$refs.stationTree.getCheckedNodes()
        this.$refs.stationTree.getCheckedNodes().map(item => {
          if (item.hasOwnProperty('areaId')) {
            this.listQuery.areas.push({
              cityAreaId: item.areaId,
              roadType: item.roadType
            })
            // this.listQuery.areaId = item.areaId
            // this.listQuery.roadType = item.roadType
          }
        })
        // 加载表格数据
        this.listLoading = true
        fetchRoadList(this.listQuery, this.listParams).then(res => {
          // this.afterDelete = this.$refs.stationTree.getCheckedKeys()
          this.total = 0
          this.stationTableData = res.data.data.records
          this.total = Number(res.data.data.total) + this.total
          this.listLoading = false
        })
      }
    },
    handleFilter() {

    },
    uploadSuccess(res) {
      if (res.code === 0) {
        const str = 'errorCode.' + res.errorCode
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t(str.toString()),
          type: 'error',
          duration: 2000
        })
      } else {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.updateSuccess'),
          type: 'success',
          duration: 2000
        })
        this.mapLoading = true
        fetchRoadTree().then(res => {
          if (res.data.code === 1) {
            this.treeData = Object.assign([], res.data.data)
            res.data.data.map(item => {
              if (item.hasOwnProperty('children')) {
                item.children.map(item2 => {
                  if (item2.hasOwnProperty('children')) {
                    item2.children.map(item3 => {
                      item3.id = String(item.id) + String(item2.id) + String(item3.roadType) + 'id'
                    })
                  }
                })
              }
            })
            this.stationTree = res.data.data
            this.mapLoading = false
          }
        })
      }
      this.uploadState = false
      this.trafficUploading = false
    }
  }
}
// 也许你有所期待 有所爱，满身伤痕也 希望有未来
