
import { getParamTrail, getGps, deviceMonitor, deviceState, alarmData, eventData, chooseData, getportNumber, getParamBatch } from '@/api/device/device.js'
import { deviceStateOne, getDeviceParam } from '@/api/monitored/trajectoryapi.js'
import Pagination from '@/components/Pagination'
// import store from '@/store/index.js'
import Paginationmini from '@/components/PaginationMiNi'
import contextButton from './contextButton.vue'
import store from '@/store'
// 引入fleetmap
import 'fleetmap/dist/locale/fleetmap.en'
import 'fleetmap/dist/styles/fleetmap.css'
import FM from 'fleetmap'

export default {
  name: 'Trajectory',
  components: {
    Map,
    Pagination,
    Paginationmini,
    contextButton
  },
  data() {
    return {
      // param1Total: 'param1Total',
      // 判断当前语言环境
      parameterListToFindName: [],
      language: '',
      rightEventRow: {},
      rightEventColum: {},
      menuVisible: false,
      toggleSelectionList: [],
      screenShow: {
        param: false,
        event: false,
        alarm: false
      },
      checkboxGroup: ['param', 'event', 'alarm'],
      MARKER: {},
      dataLayerKey: null,
      watchDataGPSSaveLats: {},
      watchDataGPSSaveLngs: {},
      // 设备刚开始监控
      gaodu: 700,
      style: {},
      newArrGPS: {},
      oldTimeGPS: null,
      timerGPS: '',
      newArrDto: {
        deviceIds: [],
        isMonitor: true
      },
      // 定时器
      newArrSave: {},
      oldTime: {},
      newTime: {},
      timerParam: {},
      timer: '',
      timerO: '',
      timerN: '',
      timerEvent: '',
      timerAlarm: '',
      timerDetail: '',
      watchGPSSaveTimer: '',
      // 显示Port
      ifDto: false,
      ListPort: [],
      PortName: '',
      //
      objName: '',
      obj: {
        name: '',
        clickable: true,
        clickType: 1,
        legends: {
        },
        offsetX: 0,
        offsetY: 0
      },
      objParam: {

      },
      objGPS: {
        name: 'GPS',
        clickable: true,
        clickType: 1,
        legends: {
          'GPS': { color: '#909399' }
        },
        realResponse: true,
        offsetX: 0, // 偏移
        offsetY: 0 // 偏移
      },
      dataLayers: {},
      //
      hh: 0,
      // 列表
      asideStyle: {
        height: '100%',
        weight: '20.625rem'
      },
      portChoList: [],
      portChoListNew: [],
      // 地图参数
      zoom: 15,
      center: [30.6191463470459, 122.0928726196289],
      // new towCilck
      twoClickShow: true,
      //   lmqqqq: [],
      radio: null,
      protListDto: null,
      num: null,
      portData: false,
      portDataDto: {},
      parameterListDto: {
        deviceId: null,
        ports: []
      },
      parameterListDtoShow: {
        deviceId: null,
        ports: null,
        name: ''

      },
      parameterListAll: {
        deviceAndPorts: [

        ],
        paramCodes: []
      },
      parameterListAllShow: [],
      /**
       * 事件参数
       */
      eventELCard: {
        //  overflow: "auto",
        height: '50%'
      },
      eventlistset: {
        page: 1,
        limit: 12,
        field: 'event_datetime',
        isAsc: 1
      },
      eventDeviceIds: [],
      eventDevicePorts: [],
      eventAllData: [],
      eventShow: true,
      eventCheckList: [],
      eventDataDto: {
        deviceIds: [2443],
        ports: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 255]
      },
      eventPortSum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 255],
      eventTotal: 0,
      /**
       * 警告参数
       */
      alarmDeviceIds: [],
      alarmDevicePorts: [],
      alarmELCard: {
        height: '50%'
        //  overflow: 'auto"
      },
      alarmShow: true,
      alarmAllData: [],
      portsum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 255],
      alarmlistset: {
        page: 1,
        limit: 12,
        field: 'alarm_datetime',
        isAsc: 1
      },
      alarmDataDto: {
        deviceIds: [],
        devicePorts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 255]
      },
      alarmChooseState: [],
      alarmChooseInt: [],
      alarmTotal: 0,
      /**
       * 点击参数弹窗
       */
      chooseParameter: [],
      mappagestyle: {
        'margin-left': '5px',
        'height': '100vh'
      },
      dataShow: true,
      dataWindow: false,
      IntData: [
      ],
      chooseInt: false,
      showAside: true,
      portNumberDataList: [],
      /**
       * 点击设置弹窗的参数
       */
      type: { label: -1 },
      gridData: [],
      trackData: [],
      upload: false,
      /**
       * 点击设备弹窗的参数
       */
      // 请求接口两个参数
      listset: {
        page: 1,
        limit: 10,
        field: 'device_name',
        isAsc: 1
      },
      deviceStatusDto: {
        deviceIds: [],
        groupIds: [],
        name: '',
        statuses: [1],
        types: []
      },
      //  总数
      sum: 0,
      //  只显示在线设备开关
      showChange: true,
      //  添加设备弹框是否显示
      dialogTableVisible: false,
      //  设置弹窗是否显示
      setWindow: false,
      //  添加设备列表请求信息
      stateAllData: [],
      //  被选中添加到操作栏的设备
      tableData: [],
      //  搜索栏的输入值
      inputName: '',
      /**
       * geoJson
       */
      geoShow: true,
      geojson: null,
      fillColor: '#e4ce7f' //  颜色

    }
  },
  /**
   * 计算属性 （我没用到都是地图的）
   */
  computed: {
    // portChoList(){
    //   return
    // }
  },
  watch: {
    /**
    * 左边栏 中间部分
    */
    portDataDto: {
      deep: true,
      handler: function(newval) {
        newval.onlineDuration = Math.floor(newval.onlineDuration * 100) / 100
        if (newval.speed) {
          newval.speed = Math.floor(newval.speed * 100) / 100
        }
      }
    },
    /**
     * 警告方法
     */
    tableData(newdata) {
      this.newArrDto.deviceIds = []
      this.newArrDto.isMonitor = true
      this.eventDeviceIds = []
      this.alarmDeviceIds = []
      this.alarmDataDto.deviceIds = []
      this.eventDataDto.deviceIds = []
      newdata.map(item => {
        this.newArrDto.deviceIds.push(item.deviceId)
        this.eventDeviceIds.push(item.deviceId)
        this.alarmDeviceIds.push(item.deviceId)
      })
      console.log(this.newArrDto, '开启设备参数')
      if (this.newArrDto.deviceIds.length >= 1) {
        deviceMonitor(this.newArrDto).then(res => {
        })
      }
      this.GPSShow()
    },
    alarmDeviceIds(newdata, olddata) {
      this.alarmDataDto.deviceIds = newdata
    },
    alarmDevicePorts(newdata, olddata) {
      this.alarmDataDto.devicePorts = newdata
    },
    alarmShow(newdata, olddata) {
      if (newdata === false) {
        this.eventELCard.height = '100%'
        this.alarmELCard.height = '0%'
        this.gaodu = 700
      } else if (newdata === true) {
        if (this.eventShow === true) {
          this.alarmELCard.height = '50%'
          this.eventELCard.height = '50%'
          this.gaodu = 700
        } else {
          this.alarmELCard.height = '100%'
          this.gaodu = 560
        }
      }
      this.lmap.invalidateSize()
    },
    /**
     * 事件方法
     */
    eventDeviceIds(newdata, olddata) {
      this.eventDataDto.deviceIds = newdata
    },
    eventDevicePorts(newdata, olddata) {
      this.eventDataDto.ports = newdata
    },
    eventShow(newdata, olddata) {
      if (newdata === false && this.alarmShow === true) {
        this.alarmELCard.height = '100%'
        this.eventELCard.height = '0%'
        this.gaodu = 700
      } else if (newdata === true) {
        if (this.alarmShow === false) {
          this.eventELCard.height = '100%'
          this.gaodu = 700
        } else {
          this.gaodu = 280
          this.eventELCard.height = '50%'
          this.alarmELCard.height = '50%'
        }
      }
      this.lmap.invalidateSize()
    },
    /**
     * 参数窗口大小监控
     */
    dataShow(newdata, olddata) {
      if (newdata === true) {
        this.mappagestyle.height = '70vh'
      } else {
        this.mappagestyle.height = '100vh'
      }
      this.lmap.invalidateSize()
    },
    /**
     * 列表高度大小
     */
    twoClickShow(newdata) {
      if (newdata === true) {
        this.asideStyle.height = '50%'
      } else {
        this.asideStyle.height = '100%'
      }
    },
    stateAllData(newData) {
      const that = this
      that.$nextTick(() => {
        // 从设备列表中选中已选取的设备
        if (that.tableData.length > 0 && that.stateAllData.length > 0) {
          const selectedDeviceIds = that.tableData.map(device => device.deviceId)
          for (let i = 0; i < that.stateAllData.length; i++) {
            if (selectedDeviceIds.includes(that.stateAllData[i].deviceId)) {
              that.$refs.multipleTable.toggleRowSelection(that.stateAllData[i], true)
            }
          }
        }
      })
    },
    dialogTableVisible(newValue) {
      /**
       * 选择设备窗口打开时，才加载设备列表数据
       */
      // 选择设备窗口打开时，才加载设备列表数据
      if (newValue) this.showOnline()
    },
    parameterListAllShow(newValue) {
      this.$refs.portAndParamTable.doLayout()
    },
    portChoList(newValue) {
      this.$refs.portAndParamTable.doLayout()
    }
  },
  created() {
    /**
     * 详情窗口当前展示的设备id
     */
    // 详情窗口当前展示的设备id
    this.detailDeviceId = undefined
    this.language = this.$store.getters.language
    console.log(this.language)
    // 浏览器内置数据库存储已选设备
    // if (localStorage.getItem('stateList')) {
    //   this.tableData = JSON.parse(localStorage.getItem('stateList'))
    // }
  },
  mounted() {
    window.map = this.lmap = (new FM.FleetMap('lmap', {
      center: this.center,
      zoom: this.zoom,
      contextmenu: true,
      tilelayer: false,
      scalecontrol: true,
      toolbar: true,
      zoomcontrol: true,
      baselayer: true,
      legend: true,
      scrollmsg: false,
      measure: true,
      draw: true,
      locate: true,
      coordpicker: true,
      overlaysex: true
    })).mapWrapper
    this.lmap.dataLayers = {}
    this.setDeviceMonitor()
    this.GPSShow()
    window.addEventListener('beforeunload', e => this.exit())
    console.log(this.lmap)
    // document.getElementsByClassName('el-checkbox__input')[0].classList.add('is-disabled')
    // document.getElementsByClassName('el-checkbox__original')[0].disabled = true
    // document.getElementsByClassName('common-table-header')[0].addEventListener('click', function() {
    //   event.stopImmediatePropagation()
    // }, true)
  },
  beforeDestroy() {
    this.lmap.remove()
  },
  destroyed() {
  },
  methods: {
    rowContextmenu(row, column, event) {
      this.rightEventRow = row
      this.rightEventColum = column
      console.log(row, column, event, this.portChoList)
      this.menuVisible = false
      this.menuVisible = true
      console.log(event)
      // 阻止右键默认行为
      event.preventDefault()
      this.$nextTick(() => {
        this.$refs.contextbutton.init(row, column, event)
      })
    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.foo)
    },
    handleOne() {
      console.log('点击菜单一')
      if (this.rightEventColum.label === 'Device Port') {
        this.$notify({
          title: this.$t('common.fail'),
          showClose: true,
          message: this.$t('trajectory.nodata'),
          type: 'warning'
        })
      } else {
        var item = this.portChoList.find(file => this.rightEventColum.label === file.name)
        console.log(item)
        this.mapDataUp(this.rightEventRow, item, this.rightEventRow[this.rightEventRow.deviceId][this.rightEventRow.ports][item.CODE])
      }
    },

    handleTwo() {
      if (this.rightEventColum.label === 'Device Port') {
        this.$notify({
          title: this.$t('common.fail'),
          showClose: true,
          message: this.$t('trajectory.nodata'),
          type: 'warning'
        })
      } else {
        var item = this.portChoList.find(file => this.rightEventColum.label === file.name)
        this.ListDataUp(this.rightEventRow, item, this.rightEventRow[this.rightEventRow.deviceId][this.rightEventRow.ports][item.CODE])
      }
    },
    handleThree() {
      var index = this.parameterListAllShow.findIndex(file => this.rightEventRow.id === file.id)
      console.log(this.rightEventRow, this.parameterListAllShow)
      this.cancelPortMonitoring(index, this.parameterListAllShow)
      console.log('点击菜单三')
    },

    toCtrlScreenShow(checkedList) {
      console.log(checkedList)
      // 使form card失去焦点
      const formCards1 = this.$refs.formCards1
      if (formCards1.focus) {
        formCards1.focus = false
      }
      const formCards2 = this.$refs.formCards1
      if (formCards2.focus) {
        formCards2.focus = false
      }
      const formCards3 = this.$refs.formCards1
      if (formCards3.focus) {
        formCards3.focus = false
      }
      // 设置form item 的显示/隐藏
      for (const key in this.screenShow) {
        this.screenShow[key] = checkedList.includes(key)
      }
      if (this.screenShow.param === true) {
        this.dataShow = true
      } else {
        this.dataShow = false
      }
      if (this.screenShow.event === true) {
        this.event()
      } else {
        this.closeEventCard()
      }
      if (this.screenShow.alarm === true) {
        this.alarm()
      } else {
        this.closeAlarmCard()
      }
    },
    // 计算旋转角
    getAngle(px, py, mx, my) { // 获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
      var x = Math.abs(px - mx)
      var y = Math.abs(py - my)
      var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      var cos = y / z
      var radina = Math.acos(cos)// 用反三角函数求弧度
      var angle = Math.floor(180 / (Math.PI / radina))// 将弧度转换成角度
      if (px === mx && py === my) {
        angle = 0
      }
      if (mx > px && my > py) { // 鼠标在第四象限
        angle = angle + 0
      }

      if (mx === px && my > py) { // 鼠标在y轴负方向上
        angle = 0
      }
      if (mx === px && my < py) { // 鼠标在y轴负方向上
        angle = 180
      }

      if (mx > px && my === py) { // 鼠标在x轴正方向上
        angle = 90
      }

      if (mx < px && my > py) { // 鼠标在第三象限
        angle = 270 + 90 - angle
      }

      if (mx < px && my === py) { // 鼠标在x轴负方向
        angle = 270
      }

      if (mx > px && my < py) {
        angle = 90 - angle + 90
      }

      if (mx < px && my < py) { // 鼠标在第二象限
        angle = 180 + 90 - angle
      }

      return angle
    },

    // blink() {
    //   // const winWidth = document.body.clientWidth - 128
    //   // const winHeight = document.body.clientHeight - 128
    //   const newLeft = 122.099513
    //   const newTop = 30.628236
    //   // const car = document.getElementById('car')
    //   const oldLeft = 122.091932
    //   const oldTop = 30.628236
    //
    //   const rotateDeg = this.getAngle(oldLeft, oldTop, newLeft, newTop)
    //   console.log(rotateDeg, 'see')
    //   // car.style.transform = `rotate(${rotateDeg}deg)`
    //   // car.style.top = `${newTop}px`
    //   // car.style.left = `${newLeft}px`
    // },
    // 设备状态 切换成中文喜
    equipmentStatusSW(row) {
      if (row.status === '0') {
        return this.$t('trajectory.offLine')
      } else {
        return this.$t('trajectory.onLine')
      }
    },
    // 转换在线时长
    onlineTimeSW(row) {
      if (row.hasOwnProperty('onlineDuration')) {
        return Math.floor(row.onlineDuration * 100) / 100
      } else {
        return '-'
      }
    },
    // 转换速度
    speedSW(row) {
      if (row.hasOwnProperty('speed')) {
        return Math.floor(row.speed * 100) / 100
      } else {
        return '-'
      }
    },
    // 定位方法 在线跟踪不在线定位
    locate(deviceItem, index) {
      // debugger
      var value = this.lmap.dataLayers[deviceItem.deviceId].getStore().getBounds()
      if (Math.abs(value.north) <= 90 && Math.abs(value.south) <= 90 && Math.abs(value.west) <= 180 && Math.abs(value.east) <= 180) {
        this.lmap.fitBounds(this.lmap.dataLayers[deviceItem.deviceId].getStore().getBounds())
        console.log(this.tableData[index].status)
        // 轨迹追踪功能---未开启
        if (this.tableData[index].status !== '0') {
          console.log(this.tableData[index])
          clearInterval(this.watchGPSSaveTimer)
          this.watchGPSSaveTimer = ''
          if (deviceItem.located) {
            if (deviceItem.located === true) {
              deviceItem.located = false
              this.$set(this.tableData, index, deviceItem)
              clearInterval(this.watchGPSSaveTimer)
              this.watchGPSSaveTimer = ''
            } else {
              this.watchGPSSaveTimer = window.setInterval(this.watchDataGPS, 3000)
              deviceItem.located = !(deviceItem.located)
              this.$set(this.tableData, index, deviceItem)
            }
          } else {
            this.watchGPSSaveTimer = window.setInterval(this.watchDataGPS, 3000)
            deviceItem.located = true
            this.$set(this.tableData, index, deviceItem)
          }
          this.dataLayerKey = deviceItem.deviceId
        }
      } else {
        this.$notify({
          title: this.$t('common.fail'),
          showClose: true,
          message: this.$t('trajectory.nodata'),
          type: 'warning'
        })
      }
    },
    // 监视GPS点的动态 Faster 跟踪功能
    watchDataGPS() {
      const id = this.dataLayerKey
      console.log(this.watchDataGPSSaveLngs[id], 'id')
      const lastGPSLng = this.watchDataGPSSaveLngs[id][this.watchDataGPSSaveLngs[id].length - 1]
      const lastGPSLat = this.watchDataGPSSaveLats[id][this.watchDataGPSSaveLats[id].length - 1]
      if (this.watchDataGPSSaveLngs[id].length > 0 && this.watchDataGPSSaveLats[id].length > 0) {
        // var obj = {
        //   east: Math.max(...this.watchDataGPSSaveLngs[id]),
        //   north: Math.max(...this.watchDataGPSSaveLats[id]),
        //   south: Math.min(...this.watchDataGPSSaveLats[id]),
        //   west: Math.min(...this.watchDataGPSSaveLngs[id])
        // }
        // 不用fitBounds
        console.log(lastGPSLng, lastGPSLat)
        this.lmap.setView({ lat: lastGPSLat, lng: lastGPSLng }, this.lmap.getZoom())
        // this.lmap.fitBounds(obj)
        this.watchDataGPSSaveLats[id] = []
        this.watchDataGPSSaveLngs[id] = []
      }
    },
    // 关闭设备监控
    exit() {
      this.newArrDto.deviceIds = []
      this.newArrDto.isMonitor = false
      try {
        this.tableData.map(item => {
          this.newArrDto.deviceIds.push(item.deviceId)
        })
      } catch (err) {
        alert(err)
      }
      deviceMonitor(this.newArrDto).then(res => {
        console.log('success')
      })
    },
    // 地图GPS加载

    GPSShow() {
      clearInterval(this.timerGPS)
      this.timerGPS = ''
      this.newTimeGPS = Date.parse(new Date())
      var newArr = [['lat', 'lng', 'group']]
      try {
        this.tableData.map(item => {
          var objDto = {
            deviceId: item.deviceId,
            startTime: 0,
            endTime: this.newTimeGPS
          }
          getGps(objDto).then(res => {
            newArr = [['lat', 'lng', 'group']]
            res.data.data.map(item => {
              newArr.push([item.latitude, item.longitude, 'GPS'])
              if (item.status !== '0') this.oldTimeGPS = item.time
            })
            this.newArrGPS[objDto.deviceId] = newArr
            const demoGPS = this.lmap.createCanvas({
              name: item.deviceName + '_GPS',
              clickable: true,
              clickType: 1,
              legends: {
                'GPS': { color: '#909399' }
              },
              realResponse: true,
              offsetX: 0, // 偏移
              offsetY: 0 // 偏移
            })
            this.lmap.controls.overlaysex.register(demoGPS)
            this.watchDataGPSSaveLats[objDto.deviceId] = []
            this.watchDataGPSSaveLngs[objDto.deviceId] = []
            this.removeMapLayerData(objDto.deviceId)
            this.lmap.dataLayers[objDto.deviceId] = demoGPS
            demoGPS.setData(this.newArrGPS[objDto.deviceId]
              , {
                groupKey: 'group',
                latKey: 'lat',
                lngKey: 'lng',
                crsCode: 'WGS84'
              })
            if (newArr.length > 2) {
              var angle = this.getAngle(newArr[newArr.length - 2][1], newArr[newArr.length - 2][0], newArr[newArr.length - 1][1], newArr[newArr.length - 1][0],)
              console.log(newArr)
              if (!this.MARKER[objDto.deviceId]) {
                this.MARKER[objDto.deviceId] = this.lmap.addMarker({ lat: newArr[newArr.length - 1][0], lng: newArr[newArr.length - 1][1] }, { iconCls: 'trajectory-marker', iconSize: [128, 128], rotate: angle })
              }
              console.log(angle)
            }
          })
        })
      } catch (err) {
        alert(err)
      }
      this.timerGPS = window.setInterval(this.getGPS, 2000)
    },
    /**
     * GPS 核心刷新方法
     * */
    getGPS() {
      // console.log('ok')
      this.newTimeGPS = Date.parse(new Date())
      try {
        this.tableData.map(itemTableData => {
          var objDto = {
            deviceId: itemTableData.deviceId,
            startTime: parseInt(this.oldTimeGPS),
            endTime: this.newTimeGPS
          }
          if (this.oldTimeGPS === null) {
            objDto.startTime = 0
          }
          getGps(objDto).then(res => {
            console.log(res)
            res.data.data.map(item => {
              if (item.latitude >= -90 && item.latitude <= 90 && item.longitude >= -180 && item.longitude <= 180) {
                var dataDto = [item.latitude, item.longitude, 'GPS']
                this.newArrGPS[objDto.deviceId].push(dataDto)
                if (itemTableData.status !== '0') {
                  this.watchDataGPSSaveLats[objDto.deviceId].push(item.latitude)
                  this.watchDataGPSSaveLngs[objDto.deviceId].push(item.longitude)
                  this.oldTimeGPS = item.time
                }
              }
            })
            var listLength = this.newArrGPS[objDto.deviceId].length
            if (listLength > 2) {
              var oldLat = this.newArrGPS[objDto.deviceId][listLength - 2][0]
              var oldLng = this.newArrGPS[objDto.deviceId][listLength - 2][1]
              var newLat = this.newArrGPS[objDto.deviceId][listLength - 1][0]
              var newLng = this.newArrGPS[objDto.deviceId][listLength - 1][1]
              var angle = this.getAngle(oldLng, oldLat, newLng, newLat)
              this.MARKER[objDto.deviceId].update({ lat: newLat, lng: newLng }, angle)
            }
            console.log(angle)
            const demeG = this.lmap.dataLayers[objDto.deviceId]
            demeG.setData(this.newArrGPS[objDto.deviceId]
              , {
                groupKey: 'group',
                latKey: 'lat',
                lngKey: 'lng'
              })
          })
        })
      } catch (err) {
        alert(err)
      }
    },
    /**
     * 开启设备监控
     */
    setDeviceMonitor() {
      this.newArrDto.isMonitor = true
      this.tableData.map(item => {
        this.newArrDto.deviceIds = []
        this.newArrDto.deviceIds.push(item.deviceId)
        deviceMonitor(this.newArrDto).then(res => {
          console.log(res)
        })
      })
    },
    /**
   *
   * @param {*} row
   * @param {*} item
   * @param {*} timeDto
   */
    mapDataUp(row, item, timeDto) {
      // console.log(timeDto)
      console.log(row, item, timeDto)
      var times = new Date()

      if (timeDto === undefined) {
        this.$notify({
          title: this.$t('common.fail'),
          showClose: true,
          message: this.$t('trajectory.nodata'),
          type: 'warning'
        })
      } else {
        const objParamDto = {
          name: '',
          clickable: true,
          clickType: 1,
          legends: {
          },
          offsetX: 0,
          offsetY: 0
        }
        objParamDto.name = this.getParamLayerKey({
          deviceName: row.name,
          devicePort: row.ports,
          code: item.CODE
          // name: item.name
        })
        // 清除重复图层
        // debugger
        if (this.objParam[objParamDto.name]) {
          this.removeMapLayerData(this.objParam[objParamDto.name].name)
        }

        // this.obj.name = this.getParamLayerKey({
        //   deviceName: row.name,
        //   devicePort: row.ports,
        //   code: item.CODE
        // })
        var str = JSON.parse(item.thresholds_str)
        str.map(item => {
          this.obj.legends[item.ThrStr] = { color: '#' + item.Color.slice(2) }
          objParamDto.legends[item.ThrStr] = { color: '#' + item.Color.slice(2) }
          // this.objParam
        })
        console.log(this.obj.name)
        getParamTrail({
          code: item.CODE,
          deviceId: row.deviceId,
          endTime: parseInt(times.getTime()),
          port: row.ports,
          startTime: 0
        }).then(res => {
          const traceId = objParamDto.name
          if (res.data.data !== []) {
            var newArr = [['lat', 'lng', 'group', 'value']]
            res.data.data.map(item => {
              var dataDto = [item.latitude, item.longitude, item.thrStr, item.value]
              newArr.push(dataDto)
              this.oldTime[objParamDto.name] = item.time
            })
            this.newArrSave[objParamDto.name] = newArr
            this.objParam[objParamDto.name] = objParamDto
            console.log(this.objParam)
            var demo = this.lmap.createCanvas(objParamDto)
            this.lmap.controls.overlaysex.register(demo)
            this.lmap.controls.legend.register(demo)

            this.lmap.dataLayers[traceId] = demo
            demo.setData(newArr, {
              groupKey: 'group',
              latKey: 'lat',
              lngKey: 'lng'
            })

            this.lmap.fitBounds(demo.store.getBounds())
          }
          this.watchData(row, item, objParamDto.name)
        })
      }
    },
    /**
     * 参数动态核心方法
     * @param {*} row
     * @param {*} item
     */
    get(row, item, timeDto) {
      console.log(row, item)
      var that = this
      const times = new Date()
      const portCount = this.parameterListAll.deviceAndPorts.reduce((pre, cur) => {
        pre += cur.ports.length
        return pre
      }, 0)
      const paramCount = this.parameterListAll.paramCodes.length
      console.log(this.parameterListAll, 'seeeeee')
      // 选中 端口 和 参数 才请求数据
      if (portCount > 0 && paramCount > 0) {
        getParamBatch(that.parameterListAll).then(res => {
          if ((row.deviceId in res.data.data) &&
            (row.ports in res.data.data[row.deviceId]) &&
            (item.CODE in res.data.data[row.deviceId][row.ports]) &&
            ('time' in res.data.data[row.deviceId][row.ports][item.CODE])) {
            that.newTime[timeDto] = res.data.data[row.deviceId][row.ports][item.CODE].time
            getParamTrail({
              code: item.CODE,
              deviceId: row.deviceId,
              endTime: parseInt(times.getTime()),
              port: row.ports,
              startTime: parseInt(that.oldTime[timeDto])
            }).then(res => {
              console.log(res)
              if (res.data.hasOwnProperty('data')) {
                res.data.data.map(item => {
                  var dataDto = [item.latitude, item.longitude, item.thrStr, item.value]
                  var Obj = Object.assign([], dataDto)
                  that.newArrSave[timeDto].push(Obj)
                  that.oldTime[timeDto] = item.time
                })
              }
              const demo = that.lmap.dataLayers[that.objParam[timeDto].name]
              if (demo) {
                demo.setData(that.newArrSave[timeDto], {
                  groupKey: 'group',
                  latKey: 'lat',
                  lngKey: 'lng'
                })
              }
            })
          }
        })
      }
    },
    /**
     * 开启参数监控
     * @param {*} row
     * @param {*} item
     * @param {*} timeDto
     */
    watchData(row, item, timeDto) {
      var that = this
      console.log(row, item)
      // clearInterval(this.timer)
      // this.timer = ''
      that.timerParam[timeDto] = window.setInterval(function() {
        that.get(row, item, timeDto)
      }, 3000)
    },
    ListDataUp(row, item, time) {
      // console.log(row, item, time)
      if (time === undefined) {
        time = { time: Date.parse(new Date()) }
      }
      this.ifDto = true
      this.PortName = item.name
      var objDto = {
        code: item.CODE,
        deviceId: row.deviceId,
        endTime: parseInt(time.time),
        port: row.ports,
        startTime: 0
      }
      getParamTrail(objDto).then(res => {
        console.log(res)
        this.ListPort = res.data.data
      })
    },
    /**
     * 参数获取
     */
    xhOne() {
      const portCount = this.parameterListAll.deviceAndPorts.reduce((pre, cur) => {
        pre += cur.ports.length
        return pre
      }, 0)
      const paramCount = this.parameterListAll.paramCodes.length
      // 选中 端口 和 参数 才请求数据
      if (portCount > 0 && paramCount > 0) {
        getParamBatch(this.parameterListAll).then(res => {
          this.parameterListAllShow = this.parameterListAllShow.map(item => {
            item = Object.assign(item, res.data.data)
            return item
          })
        })
      }
      console.log(this.parameterListAllShow)
      this.toggleSelectionList.map(item => {
        const index = this.parameterListAllShow.findIndex(file => item === file.id)
        if (index !== -1) {
          // this.$refs.portAndParamTable.selection.push(this.parameterListAllShow[index])
          this.$refs.portAndParamTable.toggleRowSelection(this.parameterListAllShow[index])
        }
      })
    },
    winChoosePort(selection, row) {
      // 移除定时器
      clearInterval(this.timerN)
      this.timerN = ''
      // 判断是选中还是取消选中 - true: 选中， false: 取消选中
      const select = selection.includes(row)
      if (select) {
        if (this.parameterListAll.paramCodes.length >= 5) {
          console.log(this.parameterListAll.paramCodes.length)
        } else {
          this.parameterListAll.paramCodes.push(row.CODE)
          this.portChoList.push(row)
        }
      } else {
        const paramCodeIndex = this.parameterListAll.paramCodes.indexOf(row.CODE)
        if (paramCodeIndex !== -1) {
          this.parameterListAll.paramCodes.splice(paramCodeIndex, 1)
        }
        const paramIndex = this.portChoList.findIndex(item => item.CODE === row.CODE)
        if (paramIndex !== -1) {
          this.portChoList.splice(paramIndex, 1)
          // 移除参数数据地图图层
          if (this.parameterListAllShow.length > 0) {
            for (const devicePort of this.parameterListAllShow) {
              const layerKey = this.getParamLayerKey({
                deviceName: devicePort.name,
                devicePort: devicePort.ports,
                code: row.CODE
              })
              this.removeMapLayerData(layerKey)
            }
          }
        }
      }

      // 开启定时器
      if (this.timerN === '' && this.portChoList.length > 0) {
        this.timerN = setInterval(this.xhOne, 3000)
        // this.xhOne()
      }
    },
    portDataDetails(type) {
      var that = this
      clearInterval(that.timerDetail)
      that.timerDetail = ''
      that.twoClickShow = true
      that.detailDeviceId = type.deviceId
      var objDto = {
        deviceId: type.deviceId
      }
      var obj = {
        deviceIds: [type.deviceId]
      }
      getDeviceParam(objDto).then(res => {
        that.protListDto = res.data.data
        // console.log(that.protListDto)
        that.num = that.protListDto.length + 1
      })
      deviceStateOne(obj).then(res => {
        that.portDataDto = res.data.data.records[0]
      })
      //   console.log(type)
      that.timerDetail = window.setInterval(function() {
        that.getDetail(type.deviceId)
      }, 3000)
    },
    portDataDetails2(type) {
      var that = this
      that.portData = true
      var obj = {
        deviceIds: [type.deviceId]
      }
      deviceStateOne(obj).then(res => {
        that.portDataDto = res.data.data.records[0]
      })
    },
    getDetail(deviceId) {
      var obj = {
        deviceIds: [deviceId]
      }
      var objDto = {
        deviceId: deviceId
      }
      getDeviceParam(objDto).then(res => {
        this.protListDto = res.data.data
        console.log(this.protListDto)
        this.num = this.protListDto.length
      })
      deviceStateOne(obj).then(res => {
        this.portDataDto = res.data.data.records[0]
        console.log(this.portDataDto)
      })
    },
    // 无用方法
    suibianda(row) {
      var newarr = []
      row.forEach(res => {
        var item = '<span>' + res.IncludeRight + '</sapn>'
        newarr.push(item)
      })
      return newarr.join(',')
    },
    openParamWin() {
      this.$nextTick(() => {
        const paramTabs = this.$refs.paramTabs
        // currentName = '0' 为tab导航
        this.getChooseData(paramTabs.$children[parseInt(paramTabs.currentName) + 1])
      })
    },
    getChooseData(tabCard) {
      const paramType = parseInt(tabCard.label)
      const paramTable = tabCard.$children[0]
      chooseData(paramType).then(res => {
        console.log(res)
        this.parameterListToFindName.push(...res.data.data)
        this.chooseParameter = res.data.data
        // 默认选中已选参数
        this.$nextTick(() => {
          const selectedParamCodes = this.portChoList.map(param => param.CODE)
          if (this.chooseParameter.length > 0) {
            for (let i = 0; i < this.chooseParameter.length; i++) {
              if (selectedParamCodes.includes(this.chooseParameter[i].CODE)) {
                paramTable.toggleRowSelection(this.chooseParameter[i], true)
              }
            }
          }
        })
      })
    },
    /**
     * 警告获取数据方法
     */
    alarm() {
      this.alarmShow = true
      this.alarmDataDto.deviceIds = this.tableData.map(item => {
        return item.deviceId
      })
      if (this.timerAlarm === '') {
        this.timerAlarm = setInterval(this.getAlarm, 3000)
      }
    },
    getAlarm() {
      if (this.alarmDataDto.deviceIds.length > 0) {
        alarmData(this.alarmlistset, this.alarmDataDto).then(res => {
          this.alarmAllData = res.data.data.records
          this.alarmTotal = parseInt(res.data.data.total)
        })
      } else {
        this.alarmAllData = []
        this.alarmTotal = 0
      }
    },
    /**
     * 事件获取数据方法
     */
    event() {
      this.eventShow = true
      this.eventDataDto.deviceIds = this.tableData.map(item => {
        return item.deviceId
      })
      if (this.timerEvent === '') {
        this.timerEvent = setInterval(this.getEvent, 3000)
      }
    },
    getEvent() {
      if (this.eventDataDto.deviceIds.length > 0) {
        eventData(this.eventlistset, this.eventDataDto).then(res => {
          this.eventAllData = res.data.data.records
          this.eventTotal = parseInt(res.data.data.total)
        })
      } else {
        this.eventAllData = []
        this.eventTotal = 0
      }
    },
    /**
     * Aside栏
     */
    closeAside() {
      this.showAside = false
    },
    /**
     * 添加设备所需要的方法
     */
    showOnline() {
      if (this.showChange === true) {
        this.deviceStatusDto.statuses = [1, 2, 3, 4]
      } else {
        this.deviceStatusDto.statuses = []
      }
      this.getDeviceList()
    },
    searchData() {
      this.deviceStatusDto.name = this.inputName
      this.getDeviceList()
      // this.deviceStatusDto.name = ''
    },
    getDeviceList() {
      deviceState(this.listset, this.deviceStatusDto).then(res => {
        if (res.data.code === 1) {
          // console.log(res.data.data.records)
          this.stateAllData = res.data.data.records
          this.sum = parseInt(res.data.data.total)
        }
      })
    },
    // 警告级别转换
    alarmLevelSw(row) {
      var returnData = ''
      switch (row.alarmLevel) {
        case 3:
          returnData = this.$t('common.urgent')
          break
        case -1:
          returnData = this.$t('common.clear')
          break
        case 0:
          returnData = this.$t('common.tip')
          break
        case 1:
          returnData = this.$t('common.secondary')
          break
        case 2:
          returnData = this.$t('common.important')
          break
      }
      return returnData
    },
    // 时间戳转换（所有时间转化方法--待优化）
    formatDateAlarm(data) {
      var date = new Date(data.alarmDatetime)
      // var YY = date.getFullYear() + '-'
      // var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      // var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return hh + mm + ss
      // + ss
    },
    formatDate(data) {
      var date = new Date(parseInt(data.time))
      var YY = date.getFullYear() + '-'
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return hh + mm + ss + '  ' + '  ' + YY + MM + DD
      // + ss
    },
    formatDateEvent(data) {
      var date = new Date(data.eventDatetime)
      // var YY = date.getFullYear() + '-'
      // var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      // var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return hh + mm + ss
      // + ss
    },
    // 前端参数转化方法
    param0Total(val) {
      if (val !== undefined) {
        switch (val) {
          case -1 :
            return 'RXAGC'
          case 0 :
            return 'RXLevel Full'

          case 1 :
            return 'Current Network Type'

          case 2 :
            return 'WCDMA Total RSCP'

          case 3:
            return 'PCCPCH RSCP'

          case 4 :
            return 'WiMax'
          case 5 :
            return 'RSSI'
          case 6 :
            return 'CMMB'
          case 7 :
            return 'RSRP'
          case 8 :
            return 'NR SINR'
          default:
            return '-'
        }
      } else {
        return ' '
      }
    },
    param1Total(val) {
      if (val !== undefined) {
        switch (val) {
          case -1 :
            return ' '
          case 0 :
            return 'RXQual Sub'

          case 1 :
            return 'Total Ec/lo'

          case 2 :
            return 'WCDMA Total Eclo'

          case 3:
            return 'PCCPCH SIR'

          case 4 :
            return 'WiMax'
          case 5 :
            return ' '
          case 6 :
            return 'CMMB'
          case 7 :
            return 'SINR'
          case 8 :
            return 'RSRP'
          default:
            return '-'
        }
      } else {
        return ' '
      }
    },
    // 端口方法
    netStyle(row) {
      switch (row.currentNetType) {
        case -1 :
          return 'Null'
        case 0 :
          return 'GSM'

        case 1 :
          return 'CDMA'

        case 2 :
          return 'WCDMA'

        case 3:
          return 'TDSCDMA'

        case 4 :
          return 'WiMax'
        case 5 :
          return 'WiFi'
        case 6 :
          return 'CMMB'
        case 7 :
          return 'LTE'
        case 8 :
          return 'NR'
        default:
          return '-'
      }
    },
    dataStyle(row, comuln) {
    //   console.log(row, comuln)
      switch (row.portDeviceType) {
        case 0 :
          return 'MODEM'

        case -1 :
          return 'Null'

        case 1 :
          return 'GPS'

        case 2:
          return 'HANDSET'

        case 3 :
          return 'SCANNER'

        default:
          return 'Other'
      }
    },
    getportNumberData() {
      this.chooseInt = true
      const deviceIds = Array.from(new Set(this.parameterListAllShow.map(item => item.deviceId)))
      this.tableData.forEach((item, idx) => {
        getportNumber(item.deviceId).then(res => {
          this.tableData[idx].tableData = res.data.data
          // 解决数据改变页面不刷新
          this.$set(this.tableData, idx, this.tableData[idx])

          // 默认选中已选端口
          this.$nextTick(() => {
            const portTableMap = this.$refs.parameterList.reduce((pre, cur) => {
              pre[cur.$attrs.label] = cur
              return pre
            }, {})
            if (deviceIds.includes(this.tableData[idx].deviceId)) {
              for (const item of this.parameterListAllShow) {
                if (item.deviceId === this.tableData[idx].deviceId) {
                  for (let i = 0; i < this.tableData[idx].tableData.length; i++) {
                    if (item.ports === this.tableData[idx].tableData[i].portNumber) {
                      portTableMap[item.deviceId].toggleRowSelection(this.tableData[idx].tableData[i], true)
                    }
                  }
                }
              }
            }
          })
        })
      })
    },
    // 设备选择--刷新方法
    rePage() {
      this.getDeviceList()
    },
    // 端口选择--刷新方法
    refreshPortTable() {
      this.getportNumberData()
    },
    // 端口选择方法
    choosePort(selection, row) {
      // 判断是选中还是取消选中 - true: 选中， false: 取消选中
      const select = selection.includes(row)
      if (select) {
        const newArr = Object.assign([], this.$refs.parameterList)
        // console.log(newArr, 'newArr')
        newArr.forEach((item, index) => {
          if (item.selection.length > 0) {
            this.parameterListDto.deviceId = item.$attrs.label
            var name = item.$attrs.name
            // this.parameterListDto.name = item.$attrs.name
            this.parameterListDto.ports = []
            item.selection.forEach(items => {
              this.parameterListDtoShow.ports = null
              this.parameterListDtoShow.deviceId = this.parameterListDto.deviceId
              this.parameterListDtoShow.name = name
              this.parameterListDtoShow.ports = items.portNumber
              this.parameterListDtoShow.id = this.parameterListDto.deviceId + '_' + items.portNumber
              var Objshow = Object.assign({}, this.parameterListDtoShow)
              this.hh = 0
              this.parameterListAllShow.forEach(item => {
                if (item.deviceId === this.parameterListDtoShow.deviceId && item.ports === this.parameterListDtoShow.ports) {
                  this.hh = 1
                }
              })
              if (this.hh === 0) {
                this.parameterListAllShow.push(Objshow)
              }
              this.parameterListDto.ports.push(items.portNumber)
            })
            var Obj = Object.assign({}, this.parameterListDto)
            if (Obj.deviceId !== null) {
              const storedDevicePort = this.parameterListAll.deviceAndPorts.find(item => item.deviceId === Obj.deviceId)
              if (storedDevicePort) {
                // 合并端口数组（去重）
                const storedPorts = storedDevicePort.ports
                storedDevicePort.ports = Array.from(new Set(storedPorts.concat(Obj.ports)))
              } else {
                this.parameterListAll.deviceAndPorts.push(Obj)
              }
            }
          }
        })
      } else {
        const portTables = this.$refs.parameterList
        if (portTables.length > 0) {
          for (const portTable of portTables) {
            const ports = portTable.data || []
            if (ports.includes(row)) {
              const deviceId = portTable.$attrs.label
              for (let i = 0; i < this.parameterListAllShow.length; i++) {
                const devicePort = this.parameterListAllShow[i]
                if (devicePort.deviceId === deviceId && devicePort.ports === row.portNumber) {
                  // 移除端口监控
                  this.cancelPortMonitoring(i, this.parameterListAllShow)
                  break
                }
              }
            }
          }
        }
      }

      getParamBatch(this.parameterListAll).then(res => {
        this.parameterListAllShow = this.parameterListAllShow.map(item => {
          item = Object.assign(item, res.data.data)
          return item
        })
      })
    },
    // 设置部分--删除方法
    deleteData(index, rows) {
      rows.splice(index, 1)
    },
    // 地图--方法
    deleteRow(index, rows) {
      clearInterval(this.watchGPSSaveTimer)
      this.watchGPSSaveTimer = ''
      var newArr = {
        deviceIds: [rows[index].deviceId],
        isMonitor: false
      }
      if (this.MARKER[rows[index].deviceId]) {
        this.MARKER[rows[index].deviceId].destroy()
        this.MARKER[rows[index].deviceId] = null
      }
      deviceMonitor(newArr).then(res => {
        // 移除设备GPS图层
        this.removeMapLayerData(rows[index].deviceId)
        // 隐藏详情页信息
        if (this.detailDeviceId === rows[index].deviceId) {
          clearInterval(this.timerDetail)
          this.portDataDto = {}
          // this.twoClickShow = false
          // this.portData = false
        }
        // 移除设备已选端口
        if (this.parameterListAllShow.length > 0) {
          for (let i = 0; i < this.parameterListAllShow.length; i++) {
            if (this.parameterListAllShow[i].deviceId === rows[index].deviceId) {
              this.cancelPortMonitoring(i, this.parameterListAllShow)
            }
          }
        }
        rows.splice(index, 1)
        localStorage.setItem('stateList', JSON.stringify(rows))
      })
    },
    toggleSelection(selection, row) {
      console.log(selection, row)
      if (selection.length > 0) {
        this.toggleSelectionList = selection.map(item => {
          return item.id
        })
      } else {
        this.toggleSelectionList = []
      }
    },
    // 移除设备端口监控
    cancelPortMonitoring(index, rows) {
      const row = rows[index]
      const params = row[row.deviceId][row.ports]
      console.log(rows, 'seeeee')
      for (const k in params) {
        // 移除地图数据图层
        const layerKey = this.getParamLayerKey({
          deviceName: row.name,
          devicePort: row.ports,
          code: k
        })
        clearInterval(this.timerParam[layerKey])
        this.timerParam[layerKey] = ''
        this.removeMapLayerData(layerKey)
      }
      // 移除数据行
      rows.splice(index, 1)
      for (const item of rows) {
        if (row.deviceId === item.deviceId) {
          const ports = item[item.deviceId]
          for (const port in ports) {
            if (port === String(row.ports)) {
              delete ports[port]
            }
          }
        }
      }
      const devicePort = this.parameterListAll.deviceAndPorts.find(item => item.deviceId === row.deviceId)
      if (devicePort) {
        const portIndex = devicePort.ports.findIndex(item => item === row.ports)
        devicePort.ports.splice(portIndex, 1)
        if (devicePort.ports.length === 0) {
          const devicePortIndex = this.parameterListAll.deviceAndPorts.indexOf(devicePort)
          this.parameterListAll.deviceAndPorts.splice(devicePortIndex, 1)
        }
      }
    },
    //  设备名称--方法
    handleSelectionChange(selection, row) {
      // 判断是选中还是取消选中 - true: 选中， false: 取消选中
      const select = selection.includes(row)
      if (select) {
        this.tableData.push(row)
        localStorage.setItem('stateList', JSON.stringify(this.tableData))
        this.alarm()
        this.event()
      } else {
        const deviceIndex = this.tableData.findIndex(item => item.deviceId === row.deviceId)
        if (deviceIndex !== -1) {
          this.deleteRow(deviceIndex, this.tableData)
        }
      }
    },
    //  警告--方法
    handleDeviceName(row) {
      return row.deviceName + '-P' + row.devicePort
    },
    removeMapLayerData(layerKey) {
      const map = this.lmap
      if (map.dataLayers[layerKey]) {
        map.dataLayers[layerKey].destroy()
        delete map.dataLayers[layerKey]
      }
    },
    getParamLayerKey(param) {
      var index = this.parameterListToFindName.findIndex(file => file.CODE === parseInt(param.code))
      return param.deviceName + '_' + param.devicePort + '_' + this.parameterListToFindName[index].name
    },
    closeAlarmCard() {
      this.alarmShow = false
      // 移除定时器
      clearInterval(this.timerAlarm)
      this.timerAlarm = ''
    },
    closeEventCard() {
      this.eventShow = false
      // 移除定时器
      clearInterval(this.timerEvent)
      this.timerEvent = ''
    }
  },
  beforeRouteEnter(to, from, next) {
    // 地图语言切换
    if (store.getters.language === 'zh') {
      Promise.all([import('fleetmap/dist/locale/fleetmap.zh_CN')]).then(() => {
        next()
      })
    } else {
      next()
    }
  }
}
