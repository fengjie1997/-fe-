// import store from '@/store/index.js'
import Vue from 'vue'
import EventCharts from '../../map/components/gridCharts/index.vue'
import { analyzeParamTree, currentVisible, areatree, deviceNameType, getKey, infoDatsaKey, gridParamPageData } from '@/api/analyze/param.js'
// import echarts from 'echarts'
import { getCacheDict } from '@/utils/dictCache'
export default {
  name: '',
  components: { },
  data() {
    return {
      scale: [],
      dataCount: [],
      await: 0,
      echartsData: {},
      netList: {},
      ThrStrList: [],
      obj: {
        name: '',
        opacity: 0.7,
        clickable: true,
        gridSize: 0.0005,
        style: {
          color: 'red'
        },
        legends: {}
      },
      objN: [],
      objDto: [],
      typeDto: [],
      thrsALL: [],
      lmaq: null,
      DataAll: {},
      timerN: '',
      showWindow: false,
      showWindowArea: false,
      gridData: [],
      pass: null,
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
      input3: '',
      input4: '',
      infoCacheKey: '',
      pageCacheKey: '',
      newArrGd: {},
      form: {
        operators: [],
        groupIds: [],
        startDt: null,
        endDt: null,
        areaIds: [],
        ports: [],
        filterAbnormal: true,
        taskTypes: [],
        deviceIds: [],
        gridSize: '10',
        statisticsType: '1'
      },
      MapSzie: getCacheDict('gridSize'),
      portNum: getCacheDict('dataFilePort'),
      fileTypes: getCacheDict('testSummary'),
      deviceTypes: getCacheDict('deviceType'),
      dataStatistic: getCacheDict('dataStatisticType')
    }
  },
  watch: {
    value1: {
      handler(arr) {
        this.form.startDt = arr[0]
        this.form.endDt = arr[1]
      },
      deep: true
    },
    areas(newData) {
      const newArr = []
      newData.map(item => {
        newArr.push(item.name)
      })
      this.input4 = newArr.toString()
    },
    groups(newData) {
      const newArr = []
      newData.map(item => {
        newArr.push(item.name)
      })
      this.input3 = newArr.toString()
    },
    filePart(newData) {
      this.form.ports = newData
    },
    fileType(newData) {
      this.form.taskTypes = newData
    },
    deviceName(newData) {
      this.form.deviceIds = newData
    },
    'Name': {
      handler: function(newData, oldData) {
        // do something
        if (newData === 'China Mobile') {
          this.pass = 0
        } else if (newData === 'China Telecom') {
          this.pass = 1
        } else {
          this.pass = 2
        }
      }
    },
    'form.typeAndId': {
      handler: function(newData, oldData) {
        console.log(newData)
      }
    }
  },
  created() {
    // store.dispatch('setApiUrl', 'http://172.16.24.122:8001')
    analyzeParamTree().then(res => {
      this.AllData = res.data.data
      this.handleEventParams()
    })
    currentVisible().then(res => {
      this.gridData = res.data.data
    })
    areatree().then(res => {
      this.areaList = res.data.data
    })
  },
  computed: {
    netTypeList() {
      return this.netList[this.Name]
    },
    operatorNameList() {
      return getCacheDict('operatorName')
    },
    getGridOptions() {
      var arr
      console.log(this.AllData)
      if (this.AllData.hasOwnProperty('operators')) {
        this.AllData.operators.forEach(item => {
          if (item.operatorName === this.Name) {
            item.operatorInfo.forEach(item2 => {
              if (item2.operatorId === this.operatorId) {
                this.netType = item2.netType
                arr = this.AllData.params[Number(item2.netType)]
              }
            })
          }
        })
      }
      return arr
    }
  },
  mounted() {
  },
  methods: {
    clearOperatorParam() {
      this.operatorId = null
      this.code = null
    },

    /**
     * 处理地图node
     * @param
     */
    handleMapNode() {

    },
    handleEventParams() {
      console.log(this.AllData)
      this.AllData.operators.forEach(item => {
        this.netList[item.operatorName] = item.operatorInfo
      })
      console.log(this.netList)
    },
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
    findIt(map) {
      if (this.form.operators.length <= 0) {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('analyze.message.lackNetwork'),
          type: 'error',
          duration: 1000
        })
        return false
      }
      // this.$parent.shiyan()

      this.lmap = map
      this.objN = []

      // this.handleMapNode()
      console.log(this.form.operators.length, this.startDt)
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.operators.length >= 1) {
            getKey(this.form).then(res => {
              if (res.data.code === 1) {
                this.$emit('Toloading', true)
                console.log(res, 'get key')
                this.infoCacheKey = res.data.data.infoCacheKey
                this.pageCacheKey = res.data.data.pageCacheKey
                this.timerN = setInterval(this.xhOne, 3000)
              }
            })
          } else {
            this.$message({
              message: this.$t('analyze.error'),
              type: 'warning'
            })
          }
        } else {
          return false
        }
      })
    },
    xhOne() {
      var objDto = {
        key: this.infoCacheKey
      }
      infoDatsaKey(objDto).then(res => {
        console.log(res, 'infoDatsaKey返回')
        if (res.data.data.status === 1) {
          this.DataAll = res.data.data.data
          // this.DataSum = res.data.data
          console.log('看这里拿到总数', res)
          clearInterval(this.timerN)
          this.timerN = ''
          this.toGetData()
          this.$emit('Toloading', false)
        } else if (res.data.data.status === 0) {
          console.log('继续请求')
        } else {
          clearInterval(this.timerN)
          this.timerN = ''
          this.$message({
            message: this.$t('message.noData'),
            type: 'warning'
          })
          this.$emit('Toloading', false)
        }
      })
    },
    async toGetData() {
      // this.pass = this.toGetData()
      // 创建echart
      var that = this
      console.log(that.tableData, 'tableData,用来循环')

      // 清空地图请求参数列表，后续重新构建
      that.typeDto = []

      for (var i = 0; i < that.tableData.length; i++) {
        console.log(that.tableData[i], 'TAble 数据 ')
        var thrs = that.DataAll[that.tableData[i].operatorId][that.tableData[i].code].thrs
        that.dataCount[i] = that.DataAll[that.tableData[i].operatorId][that.tableData[i].code].dataCount
        that.scale[i] = that.DataAll[that.tableData[i].operatorId][that.tableData[i].code].scale
        that.thrsALL[i] = thrs
        var objNEW = {
          name: '',
          opacity: 0.7,
          clickable: true,
          gridSize: 0.0005,
          style: {
            color: 'red'
          },
          legends: {}
        }
        that.objN.push(objNEW)
        thrs.map(item => {
          that.objN[i].legends[item.ThrStr] = { color: '#' + item.Color.slice(2) }
        })
        that.objN[i].name = that.tableData[i].name
        that.setMap(that.tableData[i], i)
      }
    },
    setMap(item, i) {
      var that = this
      const requestList = []
      for (let index = 0; index < Math.ceil(that.dataCount[i] / 10000); index++) {
        const type = {
          operatorId: item.operatorId,
          code: item.code,
          key: that.pageCacheKey,
          page: index + 1,
          pageSize: 10000
        }
        requestList.push(type)
      }
      Promise.all(requestList.map(param => gridParamPageData(param))).then(grids => {
        const listAll = []
        grids.map(item => { listAll.push(...item.data.data) })
        console.log(listAll, i)
        that.$emit('Toloading', false) // 执行showFaceDia函数并把要改变的值作为参数带过去
        that.$emit('close')
        var newArr = [['lng', 'lat', 'group']]
        listAll.map(item => {
          let value = 0
          if (item[5] !== 0) {
            value = item[5] / item[6] / that.scale[i]
          }
          that.thrsALL[i].map(item2 => {
            that.ThrStrList.push(item2.ThrStr)
            // 以后要改
            if (Number(item2.LeftValue) / 100 < value && value <= Number(item2.RightValue) / 100) {
              value = item2.ThrStr
            }
          })
          var objDto = [item[0], item[1], value]
          newArr.push(objDto)
        })
        that.newArrGd[i] = newArr
        var demo = that.lmap.createWebGlGridOverlay(that.objN[i])
        that.lmap.dataLayers[item.operatorId + item.code] = demo
        var demo1 = that.lmap.dataLayers[item.operatorId + item.code]
        console.log(demo1, 'ditu')
        console.log(that.newArrGd[i], 'shuzu')
        demo1.setData(that.newArrGd[i]
          , {
            lngKey: 'lng',
            latKey: 'lat',
            groupKey: 'group'
          })
        demo1.setVisible(true)
        const getBounds = demo1.store.getBounds()
        const legendCtrl = that.lmap.controls.legend
        that.lmap.getClickableLayers().forEach(function(layer) {
          legendCtrl.register(layer)
        })
        that.lmap.controls.overlaysex.register(... that.lmap.getClickableLayers())
        if (getBounds) {
          that.lmap.fitBounds(getBounds)
        }
        var newArray = []
        that.thrsALL[i].map(item => {
          if (demo1.store.getGroup(item.ThrStr) !== undefined) {
            newArray.push(demo1.store.getGroup(item.ThrStr).getCount())
          } else {
            newArray.push(0)
          }
        })
        that.echartsData[i] = newArray

        if (!that.lmap.echartPanel) {
          that.lmap.echartPanel = that.lmap.createPanel({
            position: 'topleft',
            visible: false,
            body: `<div></div>`,
            bodyStyle: {
              width: '100%',
              height: '100%'
            },
            // resizable: true,
            header: {
              title: '柱状图'
            }
          })
          that.lmap.echartPanel.on('show', function(e) {
            const target = e.target
            const chartEl = target._bodyEl.firstChild
            console.log(that.echartsData, 'that。tableDaTA')
            console.log(that.thrsALL, 'that。tableDaTA')
            console.log(that.tableData, 'that。tableDaTA')
            new Vue({
              el: chartEl,
              components: { EventCharts },
              data: {
                datas: that.echartsData,
                thr: that.thrsALL,
                tableData: that.tableData
              },
              i18n: that.$i18n,
              methods: { },
              template: `<EventCharts :datas="datas"  :thr="thr" :tableData="tableData" />`
            })
          },)
        }
        that.lmap.echartPanel.show()
      })
    },
    findObj() {
      this.showWindow = true
    },
    findarea() {
      this.showWindowArea = true
    },
    chooseData() {
      this.groupIds = []
      this.groups = []
      console.log(this.$refs.stationTree.getCheckedNodes())
      this.$refs.stationTree.getCheckedNodes().map(item => {
        if (item.hasOwnProperty('children')) {
          console.log('pass')
        } else {
          this.groupIds.push(item.id)
          this.groups.push(item)
        }
        this.form.groupIds = this.groupIds
        console.log(this.groups)
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
        if (item.hasOwnProperty('children')) {
          console.log('pass')
        } else {
          this.form.areaIds.push(item.id)
          this.areas.push(item)
        }
        console.log(this.areaIds)
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
    },
    addFile(type) {
      if (this.tableData.length >= 5) {
        this.$notify.error({
          title: this.$t('common.error'),
          message: this.$t('analyze.message.max'),
          duration: 1000
        })
        return false
      }
      var lastName = ''
      // console.log(this.AllData.params[Number(this.netType)])
      this.AllData.params[Number(this.netType)].forEach(item => {
        if (item.code === type) {
          lastName = item.name
        }
      })
      var name = { name: this.Name + '_' + this.IntTypeChange(this.netType) + '_' + lastName, code: type, operatorId: this.operatorId }
      this.tableData.push(name)
      var objDto = {
        operatorId: this.operatorId,
        codes: [type]
      }
      if (this.form.operators.length > 0) {
        this.form.operators.map(item => {
          if (item.operatorId === this.operatorId) {
            item.codes.push(type)
          } else {
            this.form.operators.push(objDto)
          }
        })
      } else {
        this.form.operators = []
        this.form.operators.push(objDto)
      }
      console.log(this.form.operators)
    },
    NameChange(name) {
      var Data = ''
      switch (name) {
        case 'China Mobile' :
          Data = this.$t('analyze.label.mobile')
          break
        case 'China Telecom' :
          Data = this.$t('analyze.label.telecom')
          break
        default:
          Data = this.$t('analyze.label.unicom')
      }
      return Data
    },
    IntTypeChange(type) {
      switch (type) {
        case '0' :
          return 'GSM'
        case '1' :
          return 'CDMA'
        case '2' :
          return 'WCDMA'
        case '3':
          return 'TDSCDMA'
        case '4' :
          return 'WiMax'
        case '5' :
          return 'WiFi'
        case '6' :
          return 'CMMB'
        case '7' :
          return 'LTE'
        case '8' :
          return 'ENDC'
        default:
          return 'NR'
      }
    }
  }
}
