import { firmwareVersions, uploadFirmwareFtp, deleteFirmwareVersions, uploadFirmwareFile, uploadFirmwareFileTow, deviceUpgrades, devicesId, firmwareSetToRcu, cancelUpgrade, updateFirmwareVersion } from '@/api/device/deviceUp'
import Pagination from '@/components/Pagination'
import FleetCardTable from '@/components/FleetCardTable'
import store from '@/store/index'
import { fileSizeFormat, timeFormat, getdeviceType, getDeviceUpgradeState } from '@/utils/deviceUpgrade.js'
import { getCacheDict } from '@/utils/dictCache'

export default {
  components: { Pagination, FleetCardTable },
  created() {
    firmwareVersions().then(res => {
      console.log(res)
      this.list = res.data.data.records
      this.total = res.data.data.total
    })
  },
  watch: {
    dialogVisibleUpdata(newData) {
      if (newData === false) {
        this.upDataAddFileShow = false
      }
    },
    list(newData) {
      newData.map(item => {
        if (item.fileJson) {
          var ListObj = JSON.parse(item.fileJson)
          for (var k in ListObj) {
            if (k === 'FileType' || k === 'MD5') {
              console.log('pass')
            } else {
              if (!item.firmwareVersion) item.firmwareVersion = ''
              item.deviceType = item.deviceType + k + '; '
              item.firmwareVersion = item.firmwareVersion + k + ':' + ListObj[k] + '; '
            }
          }
        }
      })
    },
    dialogVisible(newData, oldData) {
      if (newData === false) {
        this.getDeviceList()
        this.fileList = []
        this.form = {}
        this.formFTP = {}
        this.form2 = {}
        this.nextUpload = false
      }
    }
  },
  data() {
    return {
      formFTPRemark: {
        remark: ''
      },
      upDataAddFileShow: false,
      rules: {
        firmwareVersion: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        ftpUrl: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        ftpFilePath: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      nextUploadObj: {},
      nextUpload: false,
      res: {},
      token: store.state.user.token,
      fileList: [],
      options: [],
      apiUrl: uploadFirmwareFile,
      formFTP: {
        deviceTypeId: '0',
        firmwareVersion: '',
        ftpUrl: '',
        ftpFilePath: ''
      },
      form: {},
      form2: {},
      form2UpdataFTP: {
        remark: null
      },
      formUpdataFTP: {
        firmwareVersion: null,
        ftpUrl: null,
        ftpFilePath: null,
        ftpUser: null,
        ftpPwd: null,
        remark: null
      },
      deviceTypeShow: '',
      formUpdata: {
        deviceTypeId: null,
        firmwareVersion: null,
        vendor: null,
        remark: null
      },
      list: [],
      tableData: [],
      tableDataUpgradeEnd: [],
      tableDataToDevice: [],
      filterFieldList: [
        { label: this.$t('upgrade.version'), type: 'input', value: 'version', width: '200px' }
      ],
      filterData: {
        version: ''
      },
      fimId: null,
      searchId: null,
      disabled: false,
      dialogVisibleUpdata: false,
      dialogVisibleDevice: false,
      dialogVisibleJSON: false,
      dialogVisibleUp: false,
      dialogVisibletoDevice: false,
      multipleSelection: [],
      dialogVisible: false,
      input: '',
      value: false,
      typeUpdata: false,
      textarea: '',
      jsonData: '',
      listQuery: {
        limit: 20,
        page: 1,
        firmwareVersionKey: '',
        isAsc: 0
      },
      total: 0,
      listQueryUp: {
        limit: 20,
        page: 1,
        searchKey: ''
      },
      listQueryEnd: {
        limit: 20,
        page: 1,
        status: null,
        key: ''
      },
      listQueryNow: {
        limit: 20,
        page: 1,
        status: '',
        key: ''
      },
      totalNow: 0,
      totalEnd: 0,
      totalUp: 0
    }
  },
  methods: {
    cancleDeviceUp() {
      if (this.$refs.updataNowTable.selection.length > 0) {
        var arr = []
        this.$refs.updataNowTable.selection.map(item => {
          arr.push(item.id)
        })
        cancelUpgrade(arr).then(res => {
          this.dialogVisibleUpFunction()
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.actionSuccess'),
            type: 'success'
          })
        })
      }
    },
    saveUpdataUseFTPOne() {
      if (this.typeUpdata) {
        updateFirmwareVersion(this.formUpdataFTP).then(res => {
          firmwareVersions(this.listQuery).then(res => {
            this.list = res.data.data.records
            this.total = res.data.data.total
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.actionSuccess'),
              type: 'success'
            })
          })
        })
        console.log(this.formUpdataFTP)
      } else {
        if (this.upDataAddFileShow) {
          updateFirmwareVersion(this.form2UpdataFTP).then(res => {
            firmwareVersions(this.listQuery).then(res => {
              this.list = res.data.data.records
              this.total = res.data.data.total
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.actionSuccess'),
                type: 'success'
              })
            })
          })
        } else {
          updateFirmwareVersion(this.formUpdata).then(res => {
            firmwareVersions(this.listQuery).then(res => {
              this.list = res.data.data.records
              this.total = res.data.data.total
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.actionSuccess'),
                type: 'success'
              })
            })
          })
        }
      }
    },
    upDataTableData(row) {
      console.log(row)
      this.temporaryObj = row
      this.dialogVisibleUpdata = true
      if (row.upgradeType === 'NormalUpgrade') {
        this.typeUpdata = false
        if (row.fileJson) {
          this.upDataAddFileShow = true
          this.form2UpdataFTP.txtId = row.id
          this.form2UpdataFTP.remark = row.remark
          this.form2UpdataFTP.deviceTypeId = 0
        } else {
          this.deviceTypeShow = row.deviceType
          this.formUpdata.deviceTypeId = row.deviceTypeId
          this.formUpdata.firmwareVersion = row.firmwareVersion
          this.formUpdata.vendor = row.vendor
          this.formUpdata.remark = row.remark
          this.formUpdata.ftpupgrade = false
          this.formUpdata.txtId = row.id
        }
      } else {
        this.typeUpdata = true
        if (row.upgradeFtpInfo) {
          var jsonObj = JSON.parse(row.upgradeFtpInfo)
          console.log(jsonObj)
          this.formUpdataFTP.ftpUrl = jsonObj.url
          this.formUpdataFTP.ftpFilePath = jsonObj.filePath
          this.formUpdataFTP.ftpUser = jsonObj.user
          this.formUpdataFTP.ftpPwd = jsonObj.pass
          this.formUpdataFTP.deviceTypeId = row.deviceTypeId
          this.formUpdataFTP.txtId = row.id
          this.formUpdataFTP.ftpupgrade = true
        }
        this.deviceTypeShow = row.deviceType
        this.formUpdataFTP.firmwareVersion = row.firmwareVersion
        this.formUpdataFTP.remark = row.remark
      }
      console.log(row)
    },
    /**
     * 添加上传文件
     * @param {*} file
     * @param {*} fileList
     */
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    saveToDevice() {
      if (this.$refs.tableToDevice.selection.length > 0) {
        var obj = {
          deviceIds: [],
          vendor: null,
          deviceType: null,
          testPlanVersion: null,
          firmId: this.fimId.id
        }
        // var que = {
        //   vendor: null,
        //   deviceTypeId: null,
        //   testPlanVersion: null
        // }
        if (this.fimId.fileJson) {
          obj.testPlanVersion = 2
          obj.fileJson = this.fimId.fileJson
        } else {
          obj.testPlanVersion = 1
          obj.deviceType = this.fimId.deviceTypeId
        }
        obj.vendor = this.fimId.vendor
        this.$refs.tableToDevice.selection.map(item => {
          obj.deviceIds.push(item.id)
        })
        firmwareSetToRcu(obj).then(res => {
          this.$store.getters.language
          if (res.data.data.count === 0) {
            this.$notify({
              title: this.$t('common.fail'),
              message: this.$t('upgrade.failsToDevice'),
              type: 'warning'
            })
          } else {
            if (this.$store.getters.language === 'en') {
              this.$notify({
                title: this.$t('common.success'),
                message: `Successfully applied to ${res.data.data.count} devices`,
                type: 'success'
              })
            } else {
              this.$notify({
                title: this.$t('common.success'),
                message: `成功应用到 ${res.data.data.count} 个设备`,
                type: 'success'
              })
            }
          }
        })
      }
    },
    deleteTableData() {
      if (this.$refs.multipleTable.selection.length > 0) {
        this.$confirm(this.$t('common.deleteTip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          var list = []
          this.$refs.multipleTable.selection.map(item => {
            list.push(item.id)
          })
          deleteFirmwareVersions(list).then(res => {
            if (res.data.code === 1) {
              firmwareVersions(this.listQuery).then(res => {
                this.list = res.data.data.records
                this.total = res.data.data.total
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('common.actionSuccess'),
                  type: 'success'
                })
              })
            }
          })
        })
      }
    },
    handleTestPlanView(row) {
      this.dialogVisibleJSON = true
      console.log(row)
      if (row.fileJson) {
        this.jsonData = row.fileJson
      }
    },
    handleEditDeviceView(row) {
      this.dialogVisibletoDevice = true
      console.log(row)
      if (row.fileJson) {
        var objJson = {
          deviceTypes: null,
          fileJson: row.fileJson,
          searchKey: '',
          testPlanVersion: 2,
          vendor: row.vendor
        }
        this.searchId = objJson
      } else {
        var objNojson = {
          deviceTypes: [row.deviceTypeId],
          fileJson: '',
          searchKey: '',
          testPlanVersion: 1,
          vendor: row.vendor
        }
        this.searchId = objNojson
      }
      this.fimId = row
      this.getDeviceListToDevice()
      console.log(row)
    },
    getDeviceListToDevice() {
      devicesId(this.listQueryUp, this.searchId,).then(res => {
        console.log(res)
        this.tableDataToDevice = res.data.data.records
        this.totalUp = res.data.data.total
      })
    },
    getSizeTalbe(row) {
      if (row === undefined) {
        return
      } else {
        return fileSizeFormat(parseInt(row))
      }
    },
    toGetTimeFormat(row) {
      return timeFormat(row.applyTime)
    },
    TOGetdeviceTypeFormat(row) {
      return getdeviceType(row.deviceTypeId)
    },
    TOgetDeviceUpgradeState(row) {
      console.log(row)
      // console.log(row)
      return getDeviceUpgradeState(row.status)
    },
    /**
     * 查看升级情况
     * @param {*} row
     */
    dialogVisibleUpFunction() {
      // console.log(getCacheDict('deviceUpgradeState'))
      this.options = getCacheDict('deviceUpgradeState')
      this.dialogVisibleUp = true
      deviceUpgrades(this.listQueryNow).then(res => {
        console.log(res)
        this.tableData = res.data.data.records
        this.totalNow = res.data.data.total
      })
    },
    /**
     * 搜索功能
     * @param {Object} row
     */
    handleFilter(row) {
      console.log(row)
      // eslint-disable-next-line no-sequences
      this.listQuery.firmwareVersionKey = row.version,
      this.getDeviceList()
    },
    /**
     * 清楚搜索项
     * @param {Object} row
     */
    handleReset(row) {
      // eslint-disable-next-line no-sequences
      this.listQuery.firmwareVersionKey = row.version,
      this.getDeviceList()
    },
    /**
     * 添加设备 方法
     */
    saveUpdataUseFTP() {
      if (!this.value) {
        if (this.nextUpload === true) {
          this.form2.txtGuid = this.nextUploadObj.guid
          uploadFirmwareFileTow(this.form2).then(res => {
            this.dialogVisible = false
            if (res.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.createSuccess'),
                type: 'success'
              })
            } else {
              this.$notify({
                title: this.$t('common.fail'),
                message: this.$t('upgrade.firstAdd'),
                type: 'warning'
              })
            }
          })
        }
        if (this.fileList.length > 0) {
          this.$refs.upload.submit()
        } else {
          this.$notify({
            title: this.$t('common.fail'),
            message: this.$t('upgrade.firstAdd'),
            type: 'warning'
          })
        }
      } else {
        if (this.formFTP.firmwareVersion !== '' && this.formFTP.ftpUrl !== '' && this.formFTP.ftpFilePath !== '') {
          this.dialogVisible = false
          uploadFirmwareFtp(this.formFTP).then(res => {
            if (res.data.code === 1) {
              firmwareVersions(this.listQuery).then(res => {
                this.list = res.data.data.records
                this.total = res.data.data.total
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('common.createSuccess'),
                  type: 'success'
                })
              })
            }
          })
        } else {
          this.$notify({
            title: this.$t('common.fail'),
            message: this.$t('upgrade.condition'),
            type: 'warning'
          })
        }
      }
    },
    showJsonWindow() {
      this.dialogVisibleJSON = true
    },
    tabChange(val) {
      if (val.index === '0') {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    handleClick(type) {
      console.log(type)
    },
    saveUpdata() {
      console.log('没接口啊，小伙子')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    getDeviceList() {
      console.log(this.listQuery)
      firmwareVersions(this.listQuery).then(res => {
        this.list = res.data.data.records
        this.total = res.data.data.total
      })
    },
    handleSuccess(res, file, fileList) {
      if (res.data) {
        if (res.data.isOldProcess === true) {
          this.nextUpload = true
          this.nextUploadObj = res.data
        }
      } else {
        if (res.code === 1) {
          this.dialogVisible = false
          console.log(res, file, fileList)
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.createSuccess'),
            type: 'success'
          })
        } else {
          this.$notify({
            title: this.$t('common.fail'),
            message: this.$t('common.actionFailed'),
            type: 'error'
          })
        }
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
