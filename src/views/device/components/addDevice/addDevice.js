import { getCacheDict } from '@/utils/dictCache.js'
import { create, fetchRasList, deleteRas, createRas, fetchDeviceInfo, update, deleteRcuPort } from '@/api/device/device.js'
import { fetchGroupList } from '@/api/system/group'
import Template from '../../../template/template'
import { mapGetters } from 'vuex'

import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'AddDeviceView',
  // eslint-disable-next-line vue/no-unused-components
  components: { Template, TreeSelect },
  // eslint-disable-next-line vue/require-prop-types
  props: ['typeId', 'parent'],
  data() {
    return {
      innerDialog3: false,
      innerDialog2: false,
      innerDialog: false,
      alog: false,
      checked: false,
      dveData: [
        { value: 'rcu20' },
        { value: 'rcu30' }
      ],
      reserveDeviceId: '',
      GPS: -1,
      maxPort: 0,
      flag: 1,
      hasRcuPort: '',
      missPort: [],
      status: '',
      networkType: [],
      devicePortType: [],
      devicePortTypeTemp: 1,
      tempPort: 1,
      testDeviceTypes: [],
      deviceTypes: [],
      factory: [],
      groupData: [],
      childrenData: [],
      rasData: [],
      tempData: [],
      temp: [],
      rasIds: [],
      ports: [1, 2, 3, 4, 5, 6, 7, 8],
      rasIndex: -1,
      times: [{ t: 60 }, { t: 65 }, { t: 70 }, { t: 75 }, { t: 80 }, { t: 85 }, { t: 90 }, { t: 95 }, { t: 100 },
        { t: 105 }, { t: 110 }, { t: 115 }, { t: 120 }
      ],
      rcu: {
        id: null,
        port: 1,
        portDeviceType: 2,
        netType: 7,
        deviceModel: 'Qualcomm',
        imsi: '',
        phoneNumber: '',
        smscNumber: '',
        rasNumber: '',
        name: '',
        apn: '',
        userName: '',
        password: '',
        timeout: 60,
        tempType: 2
      },
      ras: {
        id: -1,
        rasNumber: '',
        name: '',
        encryptType: '',
        operator: '',
        loginType: '',
        driveSource: '',
        band: 0,
        timeout: '',
        apn: '',
        serverAddress: '',
        userName: '',
        password: '',
        caCertPath: '',
        caCertMd5: '',
        deviceType: ''
      },
      deviceForm: {
        type: '',
        group: '',
        groupId: undefined,
        deviceId: '',
        guid: '',
        name: '',
        deviceVersion: '',
        maxExtendPort: '',
        staticLongitude: '',
        staticLatitude: '',
        imei: '',
        phoneModel: '',
        vendor: '',
        rcuPort: []
      },
      nowSimInfoNum: 0,
      /* rules: {
        guid: [
          { validator: validateDeviceId, trigger: 'blur' }
        ]
      },
      rules2: {
        name: [
          { required: true, trigger: 'blur' }
        ],
        rasNumber: [
          { required: true, trigger: 'blur' }
        ]
      },*/
      multipleSelection: [],
      rcuPortMultiple: [],
      rcuPortIds: []
    }
  },
  computed: {
    ...mapGetters({
      flattenGroups: 'flattenGroups'
    })
  },
  created() {
    this.loadDict()
    this.getGroupList()
    var onrRcuPort = Object.assign({}, this.rcu)
    onrRcuPort.portDeviceType = 0
    onrRcuPort.tempType = 0
    this.deviceForm.rcuPort.push(onrRcuPort)
    this.networkType.unshift(Object.assign({}, { 'code': -1 }, { 'name': ' ' }))
    this.handleParsInt(this.networkType)
    this.handleParsInt(this.devicePortType)
    this.handleParsInt(this.testDeviceTypes)
    for (var i = 0; i < this.devicePortType.length; i++) {
      if (this.devicePortType[i].name === 'MODEM') {
        this.devicePortType[i]['disabled'] = true
      }
      if (this.devicePortType[i].name === 'GPS') {
        this.devicePortType[i]['disabled'] = false
      }
    }
  },
  /* activated() {
    var onrRcuPort = Object.assign({}, this.rcu)
    onrRcuPort.portDeviceType = 0
    onrRcuPort.tempType = 0
    this.deviceForm.rcuPort.push(onrRcuPort)
  },*/
  methods: {
    groupNormalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children,
        isDisabled: !node.allowDevice
      }
    },
    selectBlur(e, row) {
      if (e.target.value !== null && e.target.value.toString().length > 0) {
        if (row !== -1000) {
          row.deviceModel = e.target.value
        } else {
          this.deviceForm.deviceVersion = e.target.value
        }
      }
    },
    handelAddRasData() {
      this.ras.id += -1
      this.rasData.push(Object.assign({}, this.ras))
    },
    handleDeleteRas() {
      if (this.multipleSelection.length === 0) {
        return
      }
      this.multipleSelection.forEach(row => {
        if (row.id !== -1) {
          this.rasIds.push(row.id)
        } else {
          this.rasData.pop()
        }
      })
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (this.rasIds.length > 0) {
          deleteRas(this.rasIds).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getRasList()
            }
          })
        }
        this.rasIds = []
      })
    },
    // 处理端口号
    handleRcuPort() {
      if (this.rcuPortMultiple.length === 0) {
        return
      }
      for (var j = 0; j < this.rcuPortMultiple.length; j++) {
        if (this.rcuPortMultiple[j].port === 0 || this.rcuPortMultiple[j].port === 1) {
          this.$confirm(this.$t('device.tip'), this.$t('common.tip'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning',
            center: false
          })
          return
        }
      }
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        for (var j = 0; j < this.rcuPortMultiple.length; j++) {
          if (this.rcuPortMultiple[j].id === null) {
            for (var i = 0; i < this.deviceForm.rcuPort.length; i++) {
              if (this.rcuPortMultiple[j].port === this.deviceForm.rcuPort[i].port) {
                this.deviceForm.rcuPort.splice(i, 1)
              }
            }
          } else {
            this.rcuPortIds.push(this.rcuPortMultiple[j].id)
          }
        }
        if (this.rcuPortIds.length > 0) {
          deleteRcuPort(this.rcuPortIds, this.reserveDeviceId).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getDeviceInfo(-1, this.reserveDeviceId)
              this.parent.getDeviceList()
            }
          })
          this.rcuPortIds = []
        }
      })
    },
    handelNetType(port) {
      for (var k = 0; k < this.deviceForm.rcuPort.length; k++) {
        if (this.deviceForm.rcuPort[k].port === port && this.deviceForm.rcuPort[k].portDeviceType === 1) {
          this.deviceForm.rcuPort[k].netType = -1
          alert(this.$t('device.netTypeTips'))
          break
        }
      }
    },
    // 处理端口设备类型MODEM只能唯一 选择GPS提示信息
    handelPortDeviceType(portDeviceType, port) {
      var temp
      if (portDeviceType === 1) {
        for (var k = 0; k < this.deviceForm.rcuPort.length; k++) {
          if (this.deviceForm.rcuPort[k].port === port) {
            temp = this.deviceForm.rcuPort[k].portDeviceType
            this.deviceForm.rcuPort[k].portDeviceType = this.deviceForm.rcuPort[k].tempType
            break
          }
        }
        this.$confirm(this.$t('device.GPSTips'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.deviceForm.rcuPort[k].portDeviceType = temp
          this.deviceForm.rcuPort[k].tempType = temp
          this.deviceForm.rcuPort[k].netType = -1
          for (var j = 0; j < this.devicePortType.length; j++) {
            if (this.devicePortType[j].name === 'GPS' && this.devicePortType[j].code === portDeviceType) {
              this.GPS = port
              this.devicePortType[j].disabled = true
              break
            }
          }
        })
      }
      if (port === this.GPS) {
        for (var i = 0; i < this.devicePortType.length; i++) {
          if (this.devicePortType[i].name === 'GPS') {
            this.GPS = -1
            this.devicePortType[i].disabled = false
            break
          }
        }
      }
      if (port === this.tempPort) {
        for (i = 0; i < this.devicePortType.length; i++) {
          if (this.devicePortType[i].name === 'MODEM') {
            this.tempPort = -1
            this.devicePortType[i].disabled = false
            break
          }
        }
      } else {
        for (var j = 0; j < this.devicePortType.length; j++) {
          if (this.devicePortType[j].name === 'MODEM' && this.devicePortType[j].code === portDeviceType) {
            this.tempPort = port
            this.devicePortType[j].disabled = true
            break
          }
        }
      }
      // 保持tempType和portDeviceType一致 用于处理选择了GPS又取消了的时候回填上次的值
      for (k = 0; k < this.deviceForm.rcuPort.length; k++) {
        if (this.deviceForm.rcuPort[k].port === port) {
          this.deviceForm.rcuPort[k].tempType = this.deviceForm.rcuPort[k].portDeviceType
          break
        }
      }
    },
    // ras 数据回显
    handleRasData(nowNum) {
      for (var i = 0; i < this.rasData.length; i++) {
        if (this.deviceForm.rcuPort[nowNum].name === this.rasData[i].name) {
          this.deviceForm.rcuPort[nowNum].rasNumber = this.rasData[i].rasNumber
          this.deviceForm.rcuPort[nowNum].timeout = this.rasData[i].timeout
          this.deviceForm.rcuPort[nowNum].password = this.rasData[i].password
          this.deviceForm.rcuPort[nowNum].userName = this.rasData[i].userName
          this.deviceForm.rcuPort[nowNum].apn = this.rasData[i].apn
        }
      }
    },
    getRasList() {
      fetchRasList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.rasData = res.data
          this.tempData = res.data
        }
      })
    },
    handleRas() {
      this.innerDialog2 = true
      this.getRasList()
    },
    handleCoordinate() {
      if (!this.checked) {
        this.deviceForm.staticLongitude = ''
        this.deviceForm.staticLatitude = ''
      }
    },
    getGroupList() {
      fetchGroupList().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.groupData = res.data
        }
      })
    },
    getDeviceInfo(type, id) {
      /* this.handleParsInt(this.networkType)
      this.handleParsInt(this.devicePortType)
      this.handleParsInt(this.testDeviceTypes)*/
      this.reserveDeviceId = id
      this.maxPort = 0
      this.flag = 1
      this.missPort = []
      this.hasRcuPort = ''
      fetchDeviceInfo(type, id).then(response => {
        var res = response.data
        if (res.code === 1) {
          for (var i = 0; i < this.devicePortType.length; i++) {
            if (this.devicePortType[i].name === 'MODEM') {
              this.tempPort = -1
              this.devicePortType[i].disabled = false
              break
            }
          }
          res.data['group'] = ''
          if (res.data.rcuPort === null || res.data.rcuPort.length === 0) {
            this.hasRcuPort = null
            res.data.rcuPort = []
            this.tempPort = 1
            res.data.rcuPort.push(Object.assign({}, this.rcu))
          } else {
            // 查找回显的数据中有MODEM和GPS的端口就设置这两个选择为禁用
            for (var j = 0; j < res.data.rcuPort.length; j++) {
              if (res.data.rcuPort[j].portDeviceType === 0) {
                this.tempPort = res.data.rcuPort[j].port
                this.devicePortType[i].disabled = true
              }
              if (res.data.rcuPort[j].portDeviceType === 1) {
                for (i = 0; i < this.devicePortType.length; i++) {
                  if (this.devicePortType[i].name === 'GPS') {
                    this.GPS = res.data.rcuPort[j].port
                    this.devicePortType[i].disabled = true
                    break
                  }
                }
              }
            }
          }
          this.deviceForm = res.data
          // tempType 为了方便选择GPS的时候提示的信息
          for (var k = 0; k < this.deviceForm.rcuPort.length; k++) {
            this.deviceForm.rcuPort[k].tempType = this.deviceForm.rcuPort[k].portDeviceType
          }
          this.deviceForm.group = res.data.parentGroupId
          const parentGroup = this.flattenGroups[res.data.parentGroupId]
          this.childrenData = (parentGroup && parentGroup.children) ? parentGroup.children : []
          if (res.data.vendor !== null) {
            if (res.data.vendor < 1) {
              this.deviceForm.vendor = this.factory[0].code
            } else {
              this.deviceForm.vendor = this.factory[res.data.vendor - 1].code
            }
          }
          this.deviceForm.deviceId = id
        }
      })
    },
    handleSaveDevice() {
      if (!this.handleCheckGroup()) return
      if ((this.typeId === '0' || this.typeId === '3' || this.typeId === '2' || this.typeId === '5' || this.typeId === '6' || this.typeId === '8' || this.typeId === '9' || this.typeId === '11')) {
        if (!this.handleCheckGuid()) {
          return
        }
      }
      this.deviceForm.type = this.typeId
      if (this.tempPort === -1) {
        this.$confirm(this.$t('device.modem'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          this.save()
        })
      } else {
        this.save()
      }
    },
    save() {
      this.$refs['addDeviceForm'].validate((valid) => {
        if (valid) {
          create(this.deviceForm).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success',
                duration: 2000
              })
              this.checked = false
              this.resetForm()
              this.parent.getDeviceList()
              this.parent.dialogVisible = false
            }
          })
        }
      })
    },
    handleCheckGuid() {
      const pattern = /[{]{1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[}]$/
      if (this.deviceForm.guid.match(pattern) == null) {
        this.$confirm(this.$t('device.guidTip'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        })
        return false
      }
      return true
    },
    handleCheckGroup() {
      if (!this.deviceForm.groupId) {
        this.$confirm(this.$t('device.requiredGroup'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        })
        return false
      }
      return true
    },
    handleUpdateDevice() {
      if (!this.handleCheckGroup()) return
      if ((this.typeId === 0 || this.typeId === 2 || this.typeId === 5 || this.typeId === 8)) {
        if (!this.handleCheckGuid()) {
          return
        }
      }
      /* if (this.hasRcuPort === null) {
        this.deviceForm.rcuPort = []
      }*/
      this.$refs['addDeviceForm'].validate((valid) => {
        if (valid) {
          update(this.deviceForm).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
              this.resetForm()
              this.parent.getDeviceList()
              this.parent.dialogVisible = false
            }
          })
        }
      })
    },
    handleSaveRas() {
      var temp = []
      for (var i = 0; i < this.rasData.length; i++) {
        if (this.rasData[i].id <= -1 && this.rasData[i].name !== '') {
          temp.push(Object.assign({}, this.rasData[i]))
        }
      }
      if (temp.length === 0) { return }
      createRas(temp).then(response => {
        if (response.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.createSuccess'),
            type: 'success',
            duration: 2000
          })
          this.getRasList()
          this.innerDialog2 = false
        }
      })
    },
    resetFrom2(i) {
      if (this.parent.deviceDialogStatus !== 'update') {
        this.deviceForm.rcuPort[i].rasNumber = ''
        this.deviceForm.rcuPort[i].timeout = ''
        this.deviceForm.rcuPort[i].password = ''
        this.deviceForm.rcuPort[i].userName = ''
        this.deviceForm.rcuPort[i].apn = ''
        this.deviceForm.rcuPort[i].smscNumber = ''
        this.deviceForm.rcuPort[i].phoneNumber = ''
      }
      this.innerDialog = false
    },
    resetForm() {
      this.$refs['addDeviceForm'].resetFields()
      this.nowSimInfoNum = 0
      this.deviceForm.rcuPort = []
      var onrRcuPort = Object.assign({}, this.rcu)
      onrRcuPort.portDeviceType = 0
      onrRcuPort.tempType = 0
      this.tempPort = 1
      this.deviceForm.rcuPort.push(onrRcuPort)
      this.checked = false
      this.maxPort = 0
      this.flag = 1
      this.missPort = []
      for (var i = 0; i < this.devicePortType.length; i++) {
        if (this.devicePortType[i].name === 'MODEM') {
          this.devicePortType[i]['disabled'] = true
        }
        if (this.devicePortType[i].name === 'GPS') {
          this.devicePortType[i]['disabled'] = false
        }
      }
      this.parent.dialogVisible = false
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelection(val) {
      this.rcuPortMultiple = val
    },
    async loadDict() {
      this.networkType = getCacheDict('TNetworkType')
      this.devicePortType = getCacheDict('devicePortType')
      this.testDeviceTypes = getCacheDict('testDeviceType')
      this.factory = getCacheDict('factory')
    },
    selectedGroup(parentId) {
      this.deviceForm.groupId = ''
      const group = this.flattenGroups[parentId]
      this.childrenData = (group && group.children) ? group.children : []
    },
    // 一次增加多个端口
    rcuPorts(num) {
      for (let i = 0; i < num; i++) {
        this.handlePorts()
      }
    },
    // 增加一个端口号
    handlePorts() {
      const existPorts = this.deviceForm.rcuPort.map(item => item.port)
      for (let i = 2; ; i++) {
        if (!existPorts.includes(i)) {
          const newPort = Object.assign({}, this.rcu)
          newPort.port = i
          this.deviceForm.rcuPort.push(newPort)
          return
        }
      }
    },
    handleParsInt(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].code = Number(data[i].code)
      }
    }
  }
}

