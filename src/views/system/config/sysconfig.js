import Pagination from '@/components/Pagination'
import { hexCharCodeToStr } from '@/utils/RGB'
import { saveParamConfig, reportAndMonitorT, reportAndMonitor, getDataTow, getDataOne, dataSegmentationList, fileConfig, fileConfigStorage, fileConfigOperation, fileOperationtype, switchEnable, dataConfig, dataUpdate, saveDescribe, detailsConfigData, alarmList, ifShow, ifSMS, ifEm, saveOpen } from '@/api/system/sysconfig.js'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      /**
       * 参数阈值分段
       */
      styleH: {
        height: '85vh'
      },
      styleNH: {
        height: '500'
      },
      symbol: null,
      detailCard: false,
      ifLX: true,
      ifEm: false,
      valueSlot: this.$t('common.positiveSequence'),
      baseyz: {},
      baseyzDto: {
        Color: '0xFF0000',
        IncludeLeft: 1,
        IncludeRight: 0,
        IsIncludeLeft: false,
        IsIncludeRight: false,
        LeftValue: -9.2233720368547758E+18,
        Note: '<=0',
        RightValue: 0,
        ThrStr: '<0'
      },
      baseyzDtoList: [],
      detailDataDtoMap: [{ threshold: 'null' }],
      baseyzShow: {},
      num: 0,
      baseyzShowInt: {
        0: ''
      },
      passDetailData: {},
      detailDataDto: {
        0: { displayUnitCode: '' }
      },
      detailDataDtoListNew: [],
      detailDataDtoList: {},
      reportAndMonitorDto: {},
      dataRangList: [],
      dataRangeSum: 0,
      dataRangePage: {
        keyWord: null,
        isId: null,
        limit: 10,
        page: 1
      },
      dataRangeDto: null,
      input3: '',
      dataSelist: [],
      selectData: '',
      leftRight: this.$t('sysConfig.leftRight'),
      thresholdTypeDto: [{
        Name: this.$t('sysConfig.continuity'),
        Value: 0
      }, {
        Name: this.$t('sysConfig.equal'),
        Value: 1
      }, {
        Name: this.$t('sysConfig.dispersed'),
        Value: 2
      }],
      // Tab
      activeName: '',
      // 双击后的单位
      dw: [{
        Name: '[EMPTY]',
        Value: -9999
      }, {
        Name: 'Six Minute',
        Value: 45313
      }, {
        Name: 's',
        Value: 20739
      }, {
        Name: 'chip/8s',
        Value: 41217
      }, {
        Name: 'MHzs',
        Value: 28931
      }, {
        Name: 'Mbps',
        Value: 16643
      }, {
        Name: 'm',
        Value: 24835
      }, {
        Name: 'KB',
        Value: 12547
      }, {
        Name: 'dBm',
        Value: 33025
      }, {
        Name: 'km',
        Value: 24836
      }, /* {
        Name: 'MHz',
        Value: '28929'
    },*/ {
        Name: 'chip',
        Value: 37121
      }, {
        Name: 'KHz',
        Value: 28930
      }, {
        Name: 'dB',
        Value: 8449
      }, {
        Name: 'bps',
        Value: 16641
      }, {
        Name: '%',
        Value: 4353
      }, {
        Name: 'Kbps',
        Value: 16642
      }, {
        Name: 'Byte',
        Value: 12546
      }, {
        Name: 'ms',
        Value: 20738
      }],
      /**
       * 数据保存配置
       */
      dialogFormVisible1: false,
      dialogFormVisibletow: false,
      getDataList: [],
      dataUpdataDto: {
      },
      /**
       * TAB切换页面参数
       */
      pageName: '',
      /**
       * 文件配置参数
       */
      fileConfigDto: {
      },
      fileConfigList: [],
      /**
       * 算法配置参数
       */
      saveOpenDto: {
        itemId: 0,
        items: [

        ]
      },
      detailData: [],
      saveRunDto: {
        itemId: 0,
        en: '',
        description: ''
      },
      textarea: '',
      operationOptions: [],
      fileOperayionList: [],
      fileOperayionListDto: {
        keyword: '',
        filterClass: '',
        page: 1,
        limit: 10
      },
      fileOperayionListSum: 0,
      chooseFile: '',
      inputName: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      /**
      * 设备报警
      */
      chooseContentValue: '',
      allalarmDataList: [],
      listset: {
        page: 1,
        limit: 10,
        name: '',
        alarmType: null,
        level: null
      },
      sum: 0,
      alarmDataList: [],
      deviceWarningContentChoose: '',

      data: [{
        label: this.$t('sysConfig.file'),
        name: this.$t('sysConfig.file'),
        children: [{
          label: this.$t('sysConfig.fileConfig'),
          name: this.$t('sysConfig.fileConfig')
        }, {
          label: this.$t('sysConfig.fileAloConfig'),
          name: this.$t('sysConfig.fileAloConfig')
        }]
      }, {
        value: 'Parameterthreshold',
        label: 'Parameterthreshold',
        name: this.$t('sysConfig.paras'),
        children: []
      },
      { label: this.$t('sysConfig.deviceAlarm'), name: this.$t('sysConfig.deviceAlarm') },
      { label: this.$t('sysConfig.dataConfig'), name: this.$t('sysConfig.dataConfig') }],
      defaultProps: {
        children: 'children',
        label: 'name',
        name: 'label',
        value: 'value'
      }
    }
  },
  created() {
    this.getfileConfigOperation()
    this.getFileList()
    this.getopreationtype()
    this.getdata()
    this.getalarmlist()
    // store.dispatch('setApiUrl', 'http://172.16.6.43:8001')
    // store.dispatch('setApiUrl', 'http://172.16.6.101:8001')
    this.getDataSegmentationList()
  },
  computed: {
    getDetailList() {
      // return
      // this.fileOperayionList
      // this.detailData
    }

  },
  watch: {
    detailData(data) {
      console.log('new', data)
    }
  },
  methods: {
    close() {
      console.log('close 进来了')
      this.detailCard = false
    },
    formatDate(data) {
      var date = new Date(data)
      var YY = date.getFullYear() + '-'
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      // + ':'
      // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return YY + MM + DD + ' ' + hh + mm
      // + ss
    },
    topage_cs(node, data) {
      this.styleNH.height = '500'
      this.styleH.height = '85vh'
      this.detailCard = false
      if (node.code !== undefined) {
        this.pageName = this.$t('sysConfig.paras')
        this.dataRangeDto = node
        this.dataRangePage.page = 1 // 为修改bug#1456
        this.getGetDataTow()
      } else { this.pageName = node.name }
      console.log(node, data)
    },
    toDetailData(row, column, cell, event) {
      console.log(row, column, cell, event)
    },
    /**
     * 参数阈值分段ks
     */

    valueChange() {
      if (this.detailDataDto[this.num].thresholdType === 2) {
        this.ifEm = true
        this.ifLX = false
      }
    },
    TypeChange() {
      if (this.symbol === 0) {
        this.baseyzDtoList[this.num].map(item => {
          item.IncludeLeft = 1
          item.IncludeRight = 0
        })
        console.log(this.symbol, '触发了')
      } else {
        this.baseyzDtoList[this.num].map(item => {
          item.IncludeLeft = 0
          item.IncludeRight = 1
        })
        console.log(this.symbol, '触发了')
      }
    },
    slotChange(type) {
      this.baseyzDtoList[type] = this.baseyzDtoList[type].reverse()
    },
    saveReportAndMonitorOne(type) {
      console.log(type)
      // this.reportAndMonitorDto.fieldName = 'monitor'
      this.reportAndMonitorDto.enable = type.afMonitor
      console.log(this.reportAndMonitorDto)
      reportAndMonitor(type.id, this.reportAndMonitorDto).then(res => {
        console.log(res)
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
    },
    sendReAadAf(type) {
      console.log(type)
      // this.reportAndMonitorDto.fieldName = 'report'
      this.reportAndMonitorDto.enable = type.enableReport
      console.log(this.reportAndMonitorDto)
      reportAndMonitorT(type.id, this.reportAndMonitorDto).then(res => {
        console.log(res)
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
    },
    getGetDataTow() {
      getDataTow(this.dataRangeDto.code, this.dataRangePage).then(res => {
        console.log(res)
        this.dataRangList = res.data.data.records
        this.dataRangeSum = res.data.data.total
      })
    },
    getGetDataOne(row) {
      this.passDetailData = row
      console.log(row, '这里有你想要的')
      getDataOne(row.code).then(res => {
        console.log(res.data.data)
        if (res.data.data.length === 0) {
          console.log('进来了')
          this.styleNH.height = '500'
          this.styleH.height = '85vh'
          this.detailCard = false
          this.$notify({
            title: this.$t('common.warn'),
            message: this.$t('sysConfig.noData'),
            type: 'warning'
          })
        } else {
          this.detailCard = true
          this.styleH.height = '48vh'
          this.styleNH.height = '360'
          this.detailDataDtoMap = res.data.data
          this.activeName = this.Change(this.detailDataDtoMap[0].threshold)
          res.data.data.map((item, index) => {
            this.detailDataDto[index] = item
            console.log(item, '多次循环的结果')
            this.detailDataDtoList[index] = JSON.parse(this.detailDataDto[index].thresholdStr)
            console.log(this.detailDataDtoList[index])
            this.baseyz[index] = []
            this.baseyzShow[index] = []
            this.detailDataDtoList[index].forEach((element, index2) => {
              element.Color = '#' + element.Color.slice(2)
              this.baseyz[index].push(element.LeftValue, element.RightValue)
            })
            this.baseyz[index] = this.baseyz[index].filter(function(item, index, self) {
              return self.indexOf(item) === index
            })
            this.baseyz[index].map(item => {
              if (item > 9999999999 || item < -999999999) {
              // console.log('none')
              } else {
                this.baseyzShow[index].push(item)
              }
            })
            console.log(this.baseyzShow)
            this.xvanran(index)
            console.log(index, 'index&&&&&***************')
          })// res map over
        }
      })
    },
    xvanran(index) {
      this.baseyzDtoList[index] = []
      this.baseyz[index].forEach((item, index2, self) => {
        var baseyzDto = {
          Color: '#3322B5',
          IncludeLeft: 1,
          IncludeRight: 0,
          LeftValue: -9.2233720368547758E+18,
          Note: '',
          RightValue: 0,
          ThrStr: ''
        }
        if (self[index2 + 1] !== undefined) {
          if (this.symbol === 1) {
            baseyzDto.IncludeLeft = 1
            baseyzDto.IncludeRight = 0
          } else {
            baseyzDto.IncludeLeft = 0
            baseyzDto.IncludeRight = 1
          }
          baseyzDto.LeftValue = item
          baseyzDto.RightValue = self[index2 + 1]
          this.detailDataDtoList[index].forEach(item => {
            if (item.LeftValue === baseyzDto.LeftValue && item.RightValue === baseyzDto.RightValue) {
              baseyzDto.Color = item.Color
              baseyzDto.ThrStr = item.ThrStr
            }
          })
          this.baseyzDtoList[index].push(baseyzDto)
        }
      })
      this.baseyzShowInt[index] = this.baseyzShow[index].toString()
      this.baseyzShowInt = Object.assign({}, this.baseyzShowInt)
      // this.$set(this.baseyzShowInt,)
      console.log(this.baseyzDtoList[index], '左边颜色')
      console.log(this.baseyzShowInt[index], '最终展示')
    },
    changIndex(type) {
      console.log(type)
      this.num = type.index
    },
    Change(type) {
      switch (type) {
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
        default:
          return 'LTE'
      }
    },
    updateDto(index) {
      this.baseyzShow[index] = this.baseyzShowInt[index].split(',') // 用,分割
      // 变成int类型
      this.baseyzShow[index] = this.baseyzShow[index].map(item => {
        return parseInt(item)
      })
      // 去重
      this.baseyzShow[index] = this.baseyzShow[index].filter(function(item, index2, self) {
        return self.indexOf(item) === index2
      })
      console.log(this.baseyzShow)
      this.baseyzShow[index].sort(function(a, b) { return a - b })
      console.log(this.baseyzShow)
      var newArr = []
      newArr.push(this.baseyz[index][0])
      newArr.push(this.baseyz[index][this.baseyz[index].length - 1])
      this.baseyzShow[index].map(item => {
        newArr.push(item)
      })
      this.baseyz[index] = newArr
      // 用户输入重复 去重
      this.baseyz[index] = this.baseyz[index].filter(function(item, index3, self) {
        return self.indexOf(item) === index3
      })
      // 用户输入不规范 排序
      this.baseyz[index].sort(function(a, b) { return a - b })
      this.xvanran(index)
    },
    toSaveParamConfig() {
      console.log(this.baseyzDtoList)
    },
    getDataSegmentationList() {
      dataSegmentationList().then(res => {
        this.dataSelist = res.data.data
        this.data[1].children = res.data.data
        console.log(this.dataSelist)
      })
    },
    /**
     * 设备警告
     */
    chooseIFShow(type) {
      console.log(type)
      var typeDto = {
        value: type.isDisplay
      }
      console.log(typeDto)
      ifShow(type.id, typeDto.value).then(res => {
        console.log(res)
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
      // this.getalarmlist()
    },
    chooseIfSMS(type) {
      console.log(type)
      var typeDto = {
        id: type.id,
        value: type.enableSms
      }
      console.log(typeDto)
      ifSMS(type.id, typeDto).then(res => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
        console.log(res)
      })
      // this.getalarmlist()
    },
    chooseIfEm(type) {
      console.log(type)
      var typeDto = {
        id: type.id,
        value: type.enableMail
      }
      console.log(typeDto)
      ifEm(type.id, typeDto).then(res => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
        console.log(res)
      })
      // this.getalarmlist()
    },
    getalarmlist() {
      var datagetall = {
        page: 1,
        limit: 10000
      }
      alarmList(datagetall).then(res => {
        console.log(res)
        this.allalarmDataList = res.data.data.records
        console.log(this.allalarmDataList)
        console.log(res.data.data)
      })
      alarmList(this.listset).then(res => {
        console.log(res)
        this.alarmDataList = res.data.data.records
        this.sum = res.data.data.total
        console.log(this.alarmDataList)
      })
    },
    /**
     * 数据保存
     */
    UpdataChange(req) {
      console.log(req)
      this.dataUpdataDto = req
      dataUpdate(this.dataUpdataDto).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.actionSuccess'),
            type: 'success'
          })
          console.log(res)
        }
      })
    },
    dataUpdateAndSava(req) {
      this.dataUpdataDto = req
      this.dialogFormVisible1 = true
    },
    getdata() {
      dataConfig().then(res => {
        console.log(res)
        this.getDataList = res.data.data
      })
    },
    getDataUpdate() {
      this.dialogFormVisible1 = false
      console.log(this.dataUpdataDto)
      dataUpdate(this.dataUpdataDto).then(res => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
        console.log(res)
      })
    },
    /**
     * 算法配置
    */
    tosaveOpenfuhao() {
      this.saveOpenDto.items = []
      console.log(this.detailData)
      this.detailData.map(item => {
        var obj = {
          conditionLogic: item.conditionLogic,
          conditionNameEn: item.conditionNameEn,
          conditionValue: item.conditionValue
        }
        this.saveOpenDto.items.push(obj)
      })
      saveOpen(this.saveOpenDto).then(res => {
        console.log(res)
        this.dialogFormVisibletow = false
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
      console.log(this.saveOpenDto, '算法要保存的数据')
    },
    save(type) {
      console.log(type)
    },
    handleClickDetail(type) {
      console.log(type)
      this.dialogFormVisibletow = true
      this.saveOpenDto.itemId = type.itemId
      detailsConfigData(type.itemId).then(res => {
        this.detailData = res.data.data
        console.log(this.detailData)
      })
    },
    getsaveDescribe() {
      this.dialogFormVisible = false
      saveDescribe(this.saveRunDto.itemId, this.saveRunDto).then(res => {
        console.log(res)
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
        this.getfileConfigOperation()
      })
    },
    handleClick(req) {
      this.dialogFormVisible = true
      this.saveRunDto.itemId = req.itemId
      this.saveRunDto.en = localStorage.getItem('language') === 'en'
      this.saveRunDto.description = req.itemDescCh
    },
    getopreationtype() {
      fileOperationtype().then(res => {
        // console.log(res.data.data)
        this.operationOptions = res.data.data
      })
    },
    enableChange(req) {
      var ites = parseInt(req.enable)
      var dto = {
        id: req.id,
        enable: ites
      }
      switchEnable(req.id, dto).then(res => {
        console.log(res)
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
    },
    dataChange(req) {
      var dto = {
        id: req.id,
        enable: req.enable
      }
      switchEnable(req.id, dto).then(res => {
        console.log(res)
      })
      this.getfileConfigOperation()
    },
    getfileConfigOperation() {
      fileConfigOperation(this.fileOperayionListDto).then(res => {
        // console.log(res.data.data)
        this.fileOperayionList = res.data.data.records
        this.fileOperayionListSum = res.data.data.total
        console.log(this.fileOperayionList)
      })
    },
    /**
     * 提交阈值参数
    */
    submit() {
      this.passDetailData
      console.log(this.detailDataDto[this.num], 'old')
      var submitDto = Object.assign([], this.baseyzDtoList[this.num])
      console.log(submitDto)
      submitDto.map(item => {
        item.Color = '0x' + item.Color.slice(1)
      })
      // this.detailDataDto[this.num].thresholdStr = JSON.stringify(submitDto)
      console.log(this.baseyzDtoList)
      var obj = {
        code: this.passDetailData.code,
        displayUnitCode: this.detailDataDto[this.num].displayUnitCode,
        id: this.passDetailData.id,
        orderMode: this.detailDataDto[this.num].orderMode,
        paintSize: this.detailDataDto[this.num].paintSize,
        thresholdCode: this.detailDataDto[this.num].threshold,
        thresholdStr: submitDto,
        thresholdType: this.detailDataDto[this.num].thresholdType
      }
      this.detailDataDto[this.num].code = this.passDetailData.code
      this.detailDataDto[this.num].id = this.passDetailData.id
      this.detailDataDto[this.num].thresholdCode = this.passDetailData.netType
      console.log(this.detailDataDto[this.num], 'new')
      console.log(obj, 'newobj')
      saveParamConfig(obj).then(res => {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.actionSuccess'),
          type: 'success'
        })
      })
    },
    /**
     * 切换tab
    */
    topage(node, data) {
      console.log(node, data)
      if (data.code !== undefined) {
        this.pageName = this.$t('sysConfig.paras')
        this.dataRangeDto = data
        this.getGetDataTow()
      } else { this.pageName = data.name }
    },
    /**
     * 获取文件有效配置列表
     */
    getFileList() {
      fileConfig(this.fileConfigDto).then(res => {
        this.fileConfigList = res.data.data.records
      })
    },
    /**
     * 警告转换
    */
    alarmTypeSw(row) {
      console.log(row, 'alarmType')
      var returnData = ''
      switch (row.alarmType) {
        case 1:
          returnData = 'RCU'
          break
        case 2:
          returnData = 'ATU'
          break
      }
      return returnData
    },
    // 这里写国际化真是要了我的命
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
    /**
     * 保存文件配置
     */
    DateSwitch(row) {
      var returnData = ''
      switch (row.keepType) {
        case '0':
          returnData = this.$t('common.year')
          break
        case '1':
          returnData = this.$t('common.month')
          break
        case '2':
          returnData = this.$t('common.week')
          break
        case '3':
          returnData = this.$t('common.day')
          break
      }
      return returnData
    },
    fileStorage(data) {
      // console.log('????', data)
      var req = {
        itemName: data.itemName,
        fieldValue: data.value,
        isEdit: data.isEdit,
        moduleNameEn: data.moduleNameEn
      }
      fileConfigStorage(req).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.actionSuccess'),
            type: 'success'
          })
          console.log(res)
        }
      })
    },
    //  十进制转十六进制rgb
    getRGB(data) {
      // console.log(data)
      // console.log(data.toString(16))
      return hexCharCodeToStr(data.toString(16))
    }
  }
}
