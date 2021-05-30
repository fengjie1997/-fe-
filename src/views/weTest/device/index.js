import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import History from './history_task/task'
import { bindLicense } from '../../../api/WeTest/license'
import { fetchWeTestDeviceList, fetchGroupList, deviceBind, deleteDevice, importLicense, importDevice } from '../../../api/WeTest/device'
import { getRemainTimeDay, getTime, getTimeStamp, getTimeZone } from '../../../utils/timeZone'
export default {
  name: 'DeviceTable',
  components: { Pagination, History },
  directives: { waves },
  data() {
    return {
      defaultTime: getTimeZone(this.$store.getters.timezone),
      time: [],
      table: window.innerHeight - 200,
      buttonLoading: false,
      dialogVisibleImport: false,
      rules: { uuid: [{ required: true, message: '输入设备ID', trigger: 'blur' }], appType: [{ required: true, message: '选择APP类型', trigger: 'change' }], groupId: [{ required: true, message: '选择设备分组', trigger: 'change' }], license: [{ required: true, message: '输入license码', trigger: 'blur' }], selectBind: [{ required: true, message: '选择操作', trigger: 'change' }], selectRegister: [{ required: true, message: '选择操作', trigger: 'change' }] },
      groupOptions: [],
      appTypeOptions: [{ label: 'WeTest', value: 1 }, { label: 'WeTest ST', value: 2 }],
      fieldOptions: [{ label: '设备ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      selectBindOptions: [{ label: '批量设备绑定分组', value: 'bindes' }, { label: '单一设备绑定分组', value: 'bind' }],
      selectRegisterOptions: [{ label: '批量设备注册', value: 'licenses' }, { label: '单一设备注册', value: 'license' }],
      /**
       * 设备列表默认参数groupIds
       */
      groupIds: [],
      /**
       * 搜索条件绑定groupIds
       */
      selectGroupIds: [],
      type: 'createDevice',
      tableKey: 0,
      dialogVisible: false,
      taskData: [],
      list: null,
      total: 0,
      title: '',
      width: '',
      deviceQuery: {
        license: '',
        selectBind: 'bind',
        selectRegister: 'license',
        uuid: '',
        groupId: ''
      },
      /**
       * 设备列表参数
       */
      listQuery: {
        uuid: '',
        manufacturer: '',
        limit: 10,
        page: 1,
        field: 'id',
        isAsc: 0
      },
      listLoading: false,
      deviceProps: {
        children: 'children',
        label: 'id'
      },
      deviceData: [],
      dialogStatus: 'bind',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.create')
      },
      downloadLoading: false,
      fileList: [],
      groupOption: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      fetchGroupList().then(res => {
        const data = res.data
        let num = 0
        if (data.code === 1) {
          this.groupOption = []
          for (let i = 0; i < data.data.length; i++) {
            this.groupOption[i] = {}
            this.groupOption[i].label = data.data[i].name
            this.groupOption[i].value = data.data[i].id
            this.groupOption[i].children = []
            if (data.data[i].children !== undefined) {
              for (let j = 0; j < data.data[i].children.length; j++) {
                this.groupOptions[num] = {}
                this.groupOptions[num].label = data.data[i].children[j].name
                this.groupOptions[num].value = data.data[i].children[j].id
                this.groupIds[num] = data.data[i].children[j].id
                num++
                this.groupOption[i].children[j] = {}
                this.groupOption[i].children[j].label = data.data[i].children[j].name
                this.groupOption[i].children[j].value = data.data[i].children[j].id
              }
            }
          }
          this.listLoading = true
          if (this.selectGroupIds.length !== 0) {
            this.groupIds = []
            this.groupIds[0] = this.selectGroupIds[1]
          }
          fetchWeTestDeviceList(this.listQuery, this.groupIds).then(response => {
            const data = response.data
            if (data.code === 1) {
              //  判断设备perm
              for (const i in data.data.records) {
                if (data.data.records[i].perm) {
                  const version = JSON.parse(data.data.records[i].perm).validity.version
                  if (version === 1 || version === 3) {
                    data.data.records[i].wetest = true
                  }
                  if (version === 2 || version === 3) {
                    data.data.records[i].st = true
                  }
                }
              }
              this.list = data.data.records
              this.total = data.data.total
            }
          })
          this.listLoading = false
        }
      })
    },
    handleGroupChange(data) {
    },
    /**
     * 切换左侧分组
     * @param {*} data
     */
    handleSwitchLeftGroup(data) {
      const groupIds = []
      this.getGroupIdAll(data, groupIds)
      this.selectGroupIds = Object.assign([], groupIds)
      this.listQuery.page = 1
      this.getList()
    },
    /**
     * 获取组下包括自己的所有子节点
     * @param {*} data
     * @param {*} res
     */
    getGroupIdAll(data, res) {
      if (data.id !== -1) {
        res.push(data.id)
      }
      if (data.children !== undefined) {
        data.children.forEach(element => {
          this.getGroupIdAll(element, res)
        })
      }
    },
    /**
     * 过滤
     */
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectBind() {
      if (this.deviceQuery.selectBind === 'bindes') {
        this.$refs['dataForm'].clearValidate()
      }
      this.dialogStatus = this.deviceQuery.selectBind
      console.log(this.deviceQuery.selectBind)
    },
    handleSelectRegister() {
      if (this.deviceQuery.selectRegister === 'licenses') {
        this.$refs['dataForm'].clearValidate()
      }
      this.dialogStatus = this.deviceQuery.selectRegister
      console.log(this.deviceQuery.selectBind)
    },
    deviceBind() {
      this.clearQuery()
      this.dialogStatus = 'bind'
      this.width = '40%'
      this.title = '设备分组'
      this.dialogVisible = true
    },
    handleRegister() {
      this.buttonLoading = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          bindLicense(this.deviceQuery).then(response => {
            if (response.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: '设备注册成功',
                type: 'success',
                duration: 2000
              })
              this.clearQuery()
            }
            this.dialogVisible = false
            this.buttonLoading = false
          })
        } else {
          this.$alert('提交参数有误，请检查', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.buttonLoading = false
            }
          })
        }
      })
      this.getList()
    },
    handleBind(dataForm) {
      this.buttonLoading = true
      console.log(this.deviceQuery.selectBind)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          deviceBind(this.deviceQuery).then(response => {
            if (response.data.code === 1) {
              this.getList()
              this.$notify({
                title: this.$t('common.success'),
                message: '设备绑定成功',
                type: 'success',
                duration: 2000
              })
              this.clearQuery()
            }
          })
          this.buttonLoading = false
          this.dialogVisible = false
        } else {
          this.$alert('提交参数有误，请检查', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.buttonLoading = false
            }
          })
        }
      })
      this.getList()
    },
    licenseImport() {
      this.clearQuery()
      this.buttonLoading = false
      this.dialogStatus = 'license'
      this.width = '40%'
      this.title = 'license注册'
      this.dialogVisible = true
    },
    submitUpload(dataForm) {
      const list = document.getElementsByClassName('el-upload-list__item is-ready')
      if (list.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要导入的模板！'
        })
        return
      }
      this.$refs.upload.submit()
    },
    handleDelete(row) {
      this.buttonLoading = true
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (row.uuid !== '') {
          deleteDevice(row.uuid, 1).then(response => {
            if (response.data.code === 1) {
              this.buttonLoading = false
              this.getList()
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleSelectHistory(row) {
      this.dialogStatus = 'historyTask'
      this.width = '90%'
      this.title = '查看历史下发'
      this.taskData[0] = row.uuid
      console.log(this.taskData)
      this.dialogVisible = true
    },
    /**
     * 上传设备Excel
     */
    uploadSectionFile(param) {
      // this.$refs['formName'].clearValidate()
      this.buttonLoading = true
      const fileObj = param.file
      // FormData 对象
      const form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      if (this.dialogStatus === 'bindes') {
        importDevice(this.deviceQuery, form).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.createSuccess'),
              type: 'success',
              duration: 2000
            })
            this.buttonLoading = false
            this.getList()
            this.dialogVisible = false
          }
          this.fileList = []
        })
      } else if (this.dialogStatus === 'licenses') {
        importLicense(this.deviceQuery, form).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.createSuccess'),
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.buttonLoading = false
            this.dialogVisible = false
          }
          this.fileList = []
        })
      }
      this.buttonLoading = false
      this.clearQuery()
      this.deviceQuery.selectBind = ''
      this.deviceQuery.selectRegister = ''
    },
    getTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    getTableRemainTime(time) {
      return getRemainTimeDay(getTimeStamp(getTimeZone(this.$store.getters.timezone)), time)
    },
    getTimes() {
      if (this.time !== null) {
        this.listQuery.licenseStartDt = this.time[0]
        this.listQuery.licenseEndDt = this.time[1]
      } else {
        this.listQuery.licenseStartDt = ''
        this.listQuery.licenseEndDt = ''
      }
    },
    clearQuery() {
      this.deviceQuery.selectBind = ''
      this.deviceQuery.selectRegister = ''
      this.deviceQuery.groupId = ''
      this.deviceQuery.uuid = ''
      this.deviceQuery.license = ''
    },
    cancelForm() {
      this.clearQuery()
      this.dialogVisible = false
      this.deviceQuery.selectBind = ''
      this.deviceQuery.selectRegister = ''
    }

  }

}
