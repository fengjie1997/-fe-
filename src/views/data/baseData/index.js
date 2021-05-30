import Pagination from '@/components/Pagination'
import {
  updatCell,
  fetchCellTrue,
  fetchCellDetailList,
  deleteCellByIds, fetchAreaAdministration, fetchroadtype, fetchAreaAdministrationById, exportCellByIds, deleteAreaByIds,
  findRodaByIds, exportAreaByIds } from '@/api/data/baseData.js'
import { getToken } from '@/utils/auth'
import Map from '@/components/Leaflet'
import { exportxlsx, exportkml } from '@/vendor/Export2Txt.js'
export default {
  name: 'BaseData',
  components: {
    Pagination,
    Map
  },
  data() {
    return {
      areaImportDialog: false,
      stationImportDialog: false,
      myHeaders: { Authorization: getToken() },
      /**
       * 基站导入
       */
      stationImport: {
        select: {
          append: '0'
        },
        file: [],
        result: []
      },
      /**
       * 区域导入
       */
      areaform: {
        name: '',
        areaChooseData: '',
        opacity: null,
        fillColor: null,
        lineColor: null,
        lineWidth: null,
        level: null
      },
      formLabelWidth: '120px',
      areaEdit: false,
      areaImport: {
        areaLevel: [],
        areaType: [],
        areaAdministrativeLevel: [],
        areaTag: [],
        select: {
          parentId: '0',
          level: '1',
          type: '1',
          regionLevel: '1',
          coverType: '1',
          splitMifFile: false
        },
        file: [],
        result: []
      },
      /**
       * Map
       */
      mappagestyle: {
        height: '850px'
      },
      /**
       * 区域
       */
      listData: [
        {
          label: '自定义管理',
          name: '自定义管理',
          children: []
        },
        {
          name: '行政管理',
          label: '行政管理',
          children: []
        },
        { label: '场景管理', name: '场景管理', children: [] }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        name: 'name'
      },
      defaultPropsone: {
        children: 'tree',
        label: 'label',
        name: 'name'
      },
      afterAreaDate: null,
      areaDate: [],
      areaDate_self: [],
      areaDateScene: [],
      ids: [],
      idsAndType: {
        ids: [],
        oneRegion: true,
        type: 'kml'
      },
      /**
       * 基站
       */

      editCellDto: {

      },
      editCellShow: false,
      cellpage: {
        page: 1,
        limit: 10
      },
      cellexport: {
        city: '',
        format: '1',
        networkType: ''
      },
      cellcardShow: false,
      cellTrueData: [],
      cellDetailList: [],
      cellListLoading: false,
      cellDeleteVisible: false,
      cellListParams: {
        pageSize: 10,
        pageIndex: 1,
        total: 1,
        networkType: '',
        city: ''
      },
      nowSelect: '',
      popoverVisible: false,
      /**
       * road
       */
      roadListData: [
        {
          label: '铁路管理',
          name: '铁路管理',
          children: []
        },
        {
          name: '高速管理',
          label: '高速管理',
          children: []
        },
        { label: '地铁管理', name: '地铁管理', children: [] },
        { label: '街道管理', name: '街道管理', children: [] }
      ],
      roadDefaultProps: {
        children: 'children',
        label: 'label',
        name: 'name'
      },
      roadListParams: {
        pageSize: 10,
        pageIndex: 1,
        total: 7000
      },
      roadImportData: {
        afterRoadDate: '',
        type: '',
        file: [],
        result: [],
        parameter: {
          areaId: 0,
          roadType: 0,
          combineFile: true,
          fileCharset: 'GBK',
          dataCharset: 'big5'
        }
      },
      roadImportDialog: false,
      roadCardShow: false,
      roadMetroTree: [],
      roadStreetTree: [],
      roadRailwayTree: [],
      roadHighSpeedTree: [],
      areaId: 34,
      roadLevel: 0,
      roadType: 0,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  computed: {
    getAreaDate() {
      var newArr = []
      this.areaDate.forEach(item => {
        var obj = {
          id: item.id,
          name: item.name
        }
        console.log((item.hasOwnProperty('children')))
        if (item.hasOwnProperty('children')) {
          item.children.forEach(item => {
            var objitem = {
              id: item.id,
              name: item.name
            }
            newArr.push(objitem)
          })
        }
        newArr.push(obj)
        console.log(item)
      })
      return newArr
    }

  },
  created() {
    // this.optionsRedisCache()
    this.getCellTrue()
    this.getAreaAdministration()
    this.getfetchroadtype()
  },
  methods: {
    // async optionsRedisCache() {
    //   this.areaImport.areaLevel = getCacheDict('areaLevel')
    //   this.areaImport.areaType = getCacheDict('areaType')
    //   this.areaImport.areaAdministrativeLevel = getCacheDict(
    //     'areaAdministrativeLevel'
    //   )
    //   this.areaImport.areaTag = getCacheDict('areaTag')
    // },
    getUrl(url) {
      return process.env.BASE_API + url
    },
    /**
     * 基站
     */
    updeteEditCell() {
      console.log(this.editCellDto)
      var cellDto = {
        azimuth: this.editCellDto.azimuth,
        cellStatus: this.editCellDto.cellStatus,
        coverType: this.editCellDto.coverType,
        cpi: this.editCellDto.cpi,
        latitude: this.editCellDto.latitude,
        longitude: this.editCellDto.longitude,
        outdoorIndoor: this.editCellDto.outdoorIndoor
      }
      updatCell(this.editCellDto.id, cellDto).then(res => { console.log(res) })
    },
    editCellData(type) {
      this.editCellShow = true

      this.editCellDto = type
      console.log(this.editCellDto)
    },
    exportCell() {
      exportCellByIds(this.cellexport).then(res => {
        exportxlsx(res.data, '基站导出数据', '压缩文件夹')
        // export_json_to_excel(res.data)
        console.log(res)
      })
    },
    getCellTrue() {
      fetchCellTrue().then(res => {
        console.log(res)
        const data = res.data
        if (data.code === 1) {
          console.log(data.data)
          this.cellTrueData = data.data[0].tree
        }
      })
    },
    cellSwitchList(node, data) {
      this.cellcardShow = true
      console.log(node, data)
      this.mappagestyle.height = '500px'
      if (node.data.name === undefined) {
        this.cellListParams.networkType = 'LTEFDD'
        this.cellListParams.city = ''
      } else {
        this.cellListParams.networkType = 'LTEFDD'
        this.cellListParams.city = node.data.name
      }
      this.getCellDetailList()
      this.cellexport.city = node.data.name
      this.cellexport.networkType = node.parent.data.networkType
    },
    async getCellDetailList() {
      this.cellListLoading = true
      fetchCellDetailList(this.cellListParams.networkType, this.cellListParams.city, this.cellListParams.pageIndex, this.cellListParams.pageSize).then(res => {
        const data = res.data
        if (data.code === 1) {
          this.popoverVisible = true
          this.nowSelect = this.cellListParams.networkType + ' =>  ' + this.cellListParams.city
          this.cellDetailList = data.data.records
          console.log(data.data)
          this.cellListParams.total = parseInt(data.data.total)
          console.log(this.cellDetailList)
        }
      })
      this.cellListLoading = false
    },
    handleCellDelete() {
      const row = this.$refs.cellListTable.selection
      if (row.length > 0) {
        this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          if (row.id !== '') {
            const arr = []
            row.forEach(element => {
              arr.push(element.id)
            })
            deleteCellByIds(arr).then(res => {
              this.getCellTrue()
              this.getCellDetailList()
            })
          }
        })
      }
    },
    /**
     * 基站导入
     */
    handleStationClose(done) {
      this.$confirm('see you')
        .then(_ => {
          this.stationImportDialog = false
          this.$notify({
            title: '来自系统的消息',
            message: 'See you '
          })
        })
        .catch(_ => {})
    },
    submitStationUpload() {
      this.$refs.stationUpload.submit()
    },
    handleStationSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.code === 0 || response.code === 1) {
        this.stationImport.result.push({
          id: this.stationImport.result.length + 1,
          result: file.name + ' => ' + response.message
        })
      } else {
        this.stationImport.result.push({
          id: this.stationImport.result.length + 1,
          result: file.name + ' => Upload failed'
        })
      }
    },
    // 基站导入结束
    /**
     * 区域管理-行政管理
     */
    areaSwitchList(node) {
      var a = this.$refs.areaTree.getCheckedKeys()
      var b = this.$refs.areaTree.getCurrentNode()
      console.log(b)
      // this.ids = []
      // this.ids.push(node.data.id)
      console.log(a[0])
      if (a[0] === undefined) {
        this.$message({
          message: '请先选择',
          type: 'warning'
        })
      } else if (a.length > 1) {
        this.$message({
          message: '请先选择一条数据进行编辑',
          type: 'warning'
        })
      } else {
        this.areaEdit = true
        fetchAreaAdministrationById(a[0]).then(res => {
          if (res.data.data.level === 0) {
            this.areaform.level = ':A类(VIP区域)'
          } else if (res.data.data.level === 1) {
            this.areaform.level = 'B类(重点区域)'
          } else if (res.data.data.level === 2) {
            this.areaform.level = 'C类(V普通区域)'
          } else {
            this.areaform.level = 'D类(低关注区域)'
          }
          if (res.data.data.regionLevel === 0) {
            this.areaform.regionLevel = '国家'
          } else if (res.data.data.regionLevel === 1) {
            this.areaform.regionLevel = '省'
          } else if (res.data.data.regionLevel === 2) {
            this.areaform.regionLevel = '市'
          } else if (res.data.data.regionLevel === 3) {
            this.areaform.regionLevel = '区/县'
          } else {
            this.areaform.regionLevel = '乡/镇'
          }
          this.areaform.opacity = res.data.data.opacity
          this.areaform.fillColor = res.data.data.fillColor
          this.areaform.lineColor = res.data.data.lineColor
          this.areaform.lineWidth = res.data.data.lineWidth
          this.areaform.name = res.data.data.name
          // this.areaform.areaChooseData = node.data
          console.log(res)
        })
      }
      // mmp 终于找到怎么获取父节点了
      // node.data.city 子节点
      // node.parent.data.networkType 父节点

      // if (node.data.city === undefined) {
      //   this.cellListParams.networkType = node.data.networkType
      //   this.cellListParams.city = ''
      // } else {
      //   this.cellListParams.networkType = node.parent.data.networkType
      //   this.cellListParams.city = node.data.city
      // }
      // this.getCellDetailList()
      // console.log(node.parent.data.networkType, node.data.city)
    },
    daoChu() {
      if (this.$refs.areaTree.getCheckedKeys()[0] === undefined) {
        this.$message({
          showClose: true,
          message: '请先选择想要导出的文件',
          type: 'warning'
        })
      } else {
        this.idsAndType.ids = this.$refs.areaTree.getCheckedKeys()
        console.log(this.$refs.areaTree.getCheckedKeys())
        console.log(this.idsAndType.ids)
        exportAreaByIds(this.idsAndType).then(res => {
          console.log(res)
          exportkml(res.data, '导出数据', '压缩文件夹')
          // generateArray(res.data)
        })
      }
    },
    getAreaAdministration() {
      fetchAreaAdministration(1).then(res => {
        console.log(res)
        console.log('行政管理')
        const data = res.data
        if (data.code === 1) {
          this.areaDate = data.data
          this.listData[1].children = data.data
          console.log(this.listData[1].children)
        }
      })
      fetchAreaAdministration(2).then(res => {
        console.log(res)
        console.log('self')
        const data = res.data
        if (data.code === 1) {
          this.areaDate_self = data.data
          this.listData[0].children = data.data
          console.log(this.listData[0].children)
        }
      })
      fetchAreaAdministration(3).then(res => {
        const data = res.data
        if (data.code === 1) {
          this.areaDateScene = data.data
          this.listData[2].children = data.data
        }
      })
    },
    getdeleteAreaByIds() {
      if (this.$refs.areaTree.getCheckedKeys()[0] === undefined) {
        this.$message({
          showClose: true,
          message: '请先选择想要删除的选项',
          type: 'warning'
        })
      } else {
        this.ids = this.$refs.areaTree.getCheckedKeys()
        deleteAreaByIds(this.ids).then(res => {
          console.log(res)
          if (res.data.code === 1) {
            this.$message({
              message: ' success',
              type: 'success'
            })
            this.getAreaAdministration()
          } else {
            this.$message.error(`${res.data.message}`)
          }
        })
      }
    },
    /**
     * 区域导入
     */
    handleAreaClose(done) {
      this.$confirm('确定退出？')
        .then(_ => {
          this.roadImportDialog = false
          this.$notify({
            title: '来自系统的消息',
            message: '成功'
          })
        })
        .catch(_ => {})
    },
    submitAreaUpload() {
      this.$refs.areaUpload.submit()
    },
    handleAreaSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.code === 0 || response.code === 1) {
        this.areaImport.result.push({
          id: this.areaImport.result.length + 1,
          result: file.name + ' => ' + response.message
        })
      } else {
        this.areaImport.result.push({
          id: this.areaImport.result.length + 1,
          result: file.name + ' => Upload failed'
        })
      }
    },
    // 区域导入结束
    /**
     * 道路导入
     */
    submitRoadUpload() {
      this.$refs.roadUpload.submit()
    },
    /**
     * 道路管理
     */
    roadRailwaySwitchList(node, data) {
      console.log(node, data)
      this.roadCardShow = true
      this.mappagestyle.height = '500px'
      this.areaId = node.data.id
      this.roadType = data.parentId
      console.log(this.areaId, this.roadType)
      if (this.areaId === undefined && this.roadType === undefined) {
        this.$message({
          showClose: true,
          message: '请先选择具体地区',
          type: 'warning'
        })
      } else {
        findRodaByIds(this.areaId, this.roadType, this.roadListParams.pageIndex, this.roadListParams.pageSize).then(res => {
          this.gridData = res.data.data.records
          this.roadListParams.total = res.data.data.total
          console.log(res)
          console.log('new55555555')
        })
      }
    },
    roadPassPage() {
      findRodaByIds(this.areaId, this.roadType, this.roadListParams.pageIndex, this.roadListParams.pageSize).then(res => {
        this.gridData = res.data.data.records
      })
    },
    find(a, b) {
      console.log(a, b)
    },
    getfetchroadtype() {
      fetchroadtype(0).then(res => {
        console.log(res)
        this.roadListData[0].children = res.data.data
        console.log('铁路')
      })
      fetchroadtype(1).then(res => {
        this.roadListData[1].children = res.data.data
        console.log(res)
        console.log('高速')
      })
      fetchroadtype(2).then(res => {
        this.roadListData[3].children = res.data.data
        console.log(res)
        console.log('街道')
      })
      fetchroadtype(3).then(res => {
        this.roadListData[2].children = res.data.data
        console.log(res)
        console.log('地铁')
      })
    }
  },
  watch: {
    cellcardShow(newD) {
      console.log('11111111111', newD)
      if (newD === true && this.roadCardShow === true) {
        this.roadCardShow = false
      }
    },
    roadCardShow(newD) {
      console.log('11111111111', newD)
      if (newD === true && this.cellcardShow === true) {
        this.cellcardShow = false
      }
    }
  }
}
