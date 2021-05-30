import Vue from 'vue'
import { analyzeParamTree, currentVisible, areatree, deviceNameType, getKey, infoDatsaKey } from '@/api/analyze/param.js'
import { getDtaEventInfo, fetchEventKeys, getDtaEventPageData } from '@/api/analyze/event.js' // getDtaEventPageData
import { getCacheDict } from '@/utils/dictCache'
import EventCharts from '../../map/components/eventCharts/index.vue'
// import DataUtil from '@/utils/map/std/util/data-util'
export default {
  name: '',
  components: { EventCharts },
  data() {
    return {
      iconOverlay: {},
      maptitles: [],
      requestAlarm: '',
      loading: false,
      eventMap: {},
      event: {},
      eventOptions: [],
      netList: {},
      operators: [],
      obj: {
        name: '',
        opacity: 0.7,
        clickable: true,
        style: {
          color: 'red'
        },
        legends: {}
      },
      lmaq: null,
      DataAll: {},
      timerN: '',
      showWindow: false,
      showWindowArea: false,
      gridData: [],
      pass: 1,
      AllData: {},
      startDt: '',
      endDt: '',
      value1: '',
      tableData: [],
      netType: '',
      objNaem: '',
      groupIds: [],
      groups: [],
      areaIds: [],
      areas: [],
      areaList: [],
      deviceNameList: [],
      operatorId: null,
      code: null,
      Name: '',
      filePart: null,
      fileType: null,
      deviceType: null,
      deviceName: null,
      infoCacheKey: '',
      pageCacheKey: '',
      timeRegion: [],
      form: {
        areaIds: [],
        deviceIds: [],
        endDt: null, // 1620921600000
        startDt: null, // 1523289600000
        filterAbnormal: true,
        groupIds: [],
        operators: [], // { operatorId: 2, codes: [197377] }
        ports: [],
        roadIds: [],
        taskTypes: []
      },
      MapSzie: getCacheDict('gridSize'),
      portNum: getCacheDict('dataFilePort'),
      taskTypes: getCacheDict('testSummary'),
      deviceTypes: getCacheDict('deviceType'),
      dataStatistic: getCacheDict('dataStatisticType')
    }
  },
  watch: {
    timeRegion: {
      handler(arr) {
        if (arr !== null && arr.length > 0) {
          this.form.startDt = arr[0]
          this.form.endDt = arr[1]
        }
      },
      deep: true
    },
    filePart(n) {
      this.form.ports = n
    },
    fileType(n) {
      this.form.taskTypes = n
    },
    deviceName(n) {
      this.form.deviceIds = n
    },
    value1(newData) {
      this.form.startDt = newData[0]
      this.form.endDt = newData[1]
    }

  },
  created() {
    // dtaEvent
    this.getEventInfo().then(data => {
      this.handleEventParams(data)
    })
    analyzeParamTree().then(res => {
      this.AllData = res.data.data
    })
    currentVisible().then(res => {
      this.gridData = res.data.data
    })
    areatree().then(res => {
      this.areaList = res.data.data
    })
  },
  computed: {
    // 运营商
    operatorNameList() {
      return getCacheDict('operatorName')
    },
    // 网络类型
    netTypeList() {
      this.operatorId = null
      return this.netList[this.Name]
    },
    programName() {
      var arr = []
      this.groups.forEach(item => {
        arr.push(item.name)
      })
      return arr.join('/')
    },
    areaName() {
      var arr = []
      this.areas.forEach(item => {
        arr.push(item.name)
      })
      return arr.join('/')
    }

  },
  mounted() { },
  methods: {
    // 获取事件参数
    getEventInfo() {
      return new Promise((resolve, reject) => {
        getDtaEventInfo().then(res => {
          if (res.data.code === 1) {
            this.event = res.data.data.event
            this.operators = res.data.data.operators
            resolve(res.data.data)
          }
        })
      })
    },
    // 解析事件参数
    handleEventParams(data) {
      data.operators.forEach(item => {
        this.netList[item.operatorName] = item.operatorInfo
      })
    },
    // 事件列表
    handleEventOption(val) {
      var list = this.netList[this.Name]
      list.forEach(item => {
        if (item.operatorId === val) {
          this.code = null
          this.eventOptions = this.event[item.netType]
        }
      })
    },
    handleOperatorClear() {
      this.code = null
    },
    // 添加事件
    handleEventAdd(val) {
      // type
      var netType = null
      this.netTypeList.forEach(item => {
        if (item.operatorId === this.operatorId) {
          netType = item.netType
        }
      })
      if (this.tableData.length < 5) {
        // table
        this.eventOptions.forEach(item => {
          if (item.code === val) {
            this.tableData.push(
              { name: this.Name + '_' + this.getNetName(netType) + '_' + item.name, code: val, operatorId: this.operatorId }
            )
          }
        })
        // form
        var formData = {
          operatorId: this.operatorId,
          codes: [val]
        }
        this.form.operators.push(formData)
      } else {
        this.$notify.error({
          title: this.$t('common.error'),
          message: this.$t('analyze.message.max'),
          duration: 1000
        })
      }
    },
    // 查询表单
    handleSearch(map) {
      if (this.form.operators.length <= 0) {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('analyze.message.lackNetwork'),
          type: 'error',
          duration: 1000
        })
        return false
      }
      map.eChartsEventPanel = map.createPanel({
        position: 'topleft',
        visible: false,
        body: '<div id="cell-lookup" />',
        bodyStyle: {
          width: '300px',
          height: '400px'
        },
        data: [1, 2, 3, 4, 5],
        resizable: true,
        header: {
          icon: '/static/icons/map/chart_icon.svg',
          title: this.$t('analyze.title.analyze')
        }
      })
      this.eventMap = map
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          // 获取key
          fetchEventKeys(this.form).then(res => {
            if (res.data.code === 1) {
              this.$emit('setLoading', true)
              this.infoCacheKey = res.data.data.infoCacheKey
              this.pageCacheKey = res.data.data.pageCacheKey
              // 定时请求基本数据
              this.requestAlarm = setInterval(this.handleRequestAlarm, 2000)
            }
          })
        } else {
          this.$notify({
            title: this.$t('common.error'),
            message: this.$t('analyze.message.lackMust'),
            type: 'error',
            duration: 1500
          })
          return false
        }
      })
    },
    handleFormValid() {

    },
    handleRequestAlarm() {
      infoDatsaKey({ key: this.infoCacheKey }).then(res => {
        // this.maptitles = Object.assign([], res.data.data.titles)
        var title = res.data.data.data.titles
        // this.loading.close()
        if (res.data.data.status === 0) {
          // 处理中
          console.log('继续请求')
        } else if (res.data.data.status === 1) {
          this.legends = res.data.data.data.thr
          this.removeAlarmInterval()
          // 请求业务数据
          getDtaEventPageData({
            key: this.pageCacheKey,
            page: 1,
            pageSize: 100000
          }).then(res2 => {
            var data = Object.assign([], res2.data.data)
            // 有数据才赋值到地图
            if (data.length > 0) {
              data.splice(0, 0, Object.assign([], title))
              this.mapSetData(data)
            }
            this.$emit('setLoading', false)
            if (!(data.length > 0)) {
              this.$message({
                message: this.$t('analyze.message.noData'),
                type: 'warning'
              })
            }
          })
          this.$emit('setLoading', false)
        } else {
          this.removeAlarmInterval()
          // 处理完成且无数据
          console.log('处理完成且无数据')
          this.$emit('setLoading', false)
          this.$message({
            message: this.$t('analyze.message.noData'),
            type: 'warning'
          })
        }
      })
    },
    handleEventMapData(data) {
      this.mapSetData(data)
    },
    removeAlarmInterval() {
      clearInterval(this.requestAlarm)
      this.requestAlarm = ''
    },
    getKeyData() {
      return new Promise((resolve, reject) => {
        fetchEventKeys(this.form).then(res => {
          if (res.data.code === 1) {
            this.loading = this.$loading({
              lock: true,
              text: this.$t('analyze.placeholder.onRequest'),
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            this.infoCacheKey = res.data.data.infoCacheKey
            this.pageCacheKey = res.data.data.pageCacheKey
            resolve(res.data.data)
          }
        })
      })
    },
    // 网络名称
    getNetName(type) {
      var list = getCacheDict('analyzeNetType')
      var name = ''
      list.forEach(item => {
        if (Number(item.name) === Number(type)) {
          name = item.code
        }
      })
      return name
    },
    /**
     * 处理地图node
     * @param
     */
    handleMapNode() {
      console.log(this.eventMap)
      var param = {
        name: this.$t('analyze.title.exception3'),
        icon: require('@/assets/icons/map/layers-icon.png'),
        checked: false,
        onclick: function(clickedItem) { console.log(clickedItem) }
      }
      this.eventMap.controls.overlays.addNode(undefined, param)
    },
    /**
     * 统计图表
     * @param
     *
     */
    handleMapCharts() {
      this.eventMap.eChartsEventPanel.on('show', this.handleMapChartsView.bind(this))
      this.eventMap.eChartsEventPanel.setVisible(true)
      this.mapSetData()
    },
    /**
     * 绘图
     * @param {*} data
     */
    mapSetData(data) {
      console.log(data)
      var mapData = Object.assign([], data)
      console.log(this.tableData)
      var mapLegends = Object.assign({}, this.legends)
      var iconsLegends = {}
      Object.keys(mapLegends).forEach(key => {
        console.log(key)
        let name = ''
        this.tableData.map(item => {
          item.code === Number(key)
          name = item.name
        })
        iconsLegends[key] = {
          showAs: name,
          icon: '/static/eventIcon/24/' + mapLegends[key]['iconFileName']
        }
      })

      this.eventMap.eventDataLayer = this.iconOverlay = this.eventMap.createCanvas({
        name: this.$t('analyze.title.errMap'),
        offsetX: 30,
        offsetY: 30,
        style: {
          color: 'green'
        },
        // 服务端提供一个图例集
        legends: iconsLegends
      }, 'icon')

      this.iconOverlay.setData(mapData, {
        groupKey: 'eventCode',
        latKey: 'latitude',
        lngKey: 'longitude',
        crsCode: 'WGS84'
      })
      this.iconOverlay.mapWrapper.fitBounds(this.iconOverlay.getStore().getBounds())
      this.iconOverlay.mapWrapper.controls.legend.unregister(this.iconOverlay)
      this.iconOverlay.mapWrapper.controls.legend.register(this.iconOverlay)
      this.iconOverlay.setVisible(true)
      this.$emit('close')
    },
    /**
     * 事件视图
     */
    handleMapChartsView(mapData) {
      const chartEl = this.eventMap.eChartsEventPanel._bodyEl.firstChild
      new Vue({
        el: chartEl,
        components: { EventCharts },
        data: {
          data: mapData
        },
        methods: { },
        template: `<EventCharts :data="data" />`
      })
    },
    findIt(map) {
      this.lmap = map
      getKey(this.form).then(res => {
        this.infoCacheKey = res.data.data.infoCacheKey
        this.pageCacheKey = res.data.data.pageCacheKey
        this.timerN = setInterval(this.xhOne, 3000)
      })
    },
    findarea() {
      this.showWindowArea = true
    },
    chooseData() {
      this.form.groupIds = []
      this.groups = []
      this.$refs.stationTree.getCheckedNodes().map(item => {
        if (!item.hasOwnProperty('children')) {
          this.form.groupIds.push(item.id)
          this.groups.push(item)
        }
      })
    },
    tabdeviceName(type) {
      if (type.length > 0) { // 选中设备类型才请求设备数据
        deviceNameType(type).then(res => {
          this.deviceNameList = res.data.data
          const ids = this.deviceNameList.map(item => item.id)
          for (let i = 0; i < this.deviceName.length; i++) {
            if (!ids.includes(this.deviceName[i])) {
              this.deviceName.splice(i--, 1)
            }
          }
        })
      } else { // 未选中设备类型则清空设备数据
        this.deviceNameList = []
        this.deviceName = []
      }
    },
    chooseArea() {
      this.form.areaIds = []
      this.areas = []
      this.$refs.area.getCheckedNodes().map(item => {
        if (!item.hasOwnProperty('children')) {
          this.form.areaIds.push(item.id)
          this.areas.push(item)
        }
      })
    },
    append(node, data) {
      console.log(node, data)
    },
    deleteRow(index, rows) {
      this.form.operators.map((item, index2) => {
        var dto = []
        if (item.operatorId === rows[index].operatorId) {
          if (item.codes.length >= 2) {
            item.codes.map(item2 => {
              if (item2 !== rows[index].code) {
                dto.push(item2)
              }
            })
            item.codes = dto
          } else {
            this.form.operators.splice(index2, 1)
          }
        }
      })
      rows.splice(index, 1)
    }
    // addFile(type) {
    //   var lastName = ''
    //   console.log(this.AllData.params[Number(this.netType)])
    //   this.AllData.params[Number(this.netType)].forEach(item => {
    //     if (item.code === type) {
    //       lastName = item.name
    //     }
    //   })
    //   var name = { name: this.Name + this.IntTypeChange(this.netType) + lastName, code: type, operatorId: this.operatorId }
    //   this.tableData.push(name)
    //   var objDto = {
    //     operatorId: this.operatorId,
    //     codes: [type]
    //   }
    //   if (this.form.operators.length > 0) {
    //     this.form.operators.map(item => {
    //       if (item.operatorId === this.operatorId) {
    //         item.codes.push(type)
    //       } else {
    //         this.form.operators.push(objDto)
    //       }
    //     })
    //   } else {
    //     this.form.operators.push(objDto)
    //   }
    //   console.log(this.form.operators)
    // }
  }
}
