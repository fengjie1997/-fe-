import { commonOptions } from '../../../common/common'
import { deepClone } from '@/utils/MonitoredTable'
import i18n from '@/lang'
export default {
  name: 'NodeForm',
  props: {
    rule: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      update: true,
      tempData: [],
      dialogVisible: false,
      data: {},
      active: ['1'],
      title: i18n.t('taskPlan.mftpDown.mftpUpConfig'),
      modelForm: {},
      option: commonOptions,
      tableData: [],
      confForm: {
        isCheck: true,
        doSave: false,
        downloadFile: '',
        isSaveFile: true,
        reconnectCount: 3,
        reconnectInterval: 5,
        // 采样间隔
        samplesInterval: 1000,
        threadCount: 5,
        ftpHostSetting: {
          address: '',
          connectionMode: 'Passive',
          isAnonymous: false,
          isCheck: true,
          password: '',
          port: 21,
          siteName: '',
          taskId: undefined,
          transferMode: 'Binary',
          username: ''
        }
      },
      rules: {
        downloadFile: [
          { required: true, message: this.$t('taskPlan.mftpDown.message1'), trigger: 'blur' },
          { min: 1, max: 100, message: this.$t('taskPlan.mftpDown.message2'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // ftp upload form data
    formData() {
      var formData = this.modelForm.formData()
      var list = Object.assign([], JSON.parse(JSON.stringify(this.tableData)))
      var param = { mftpDownConfigs: list }
      formData.mftpDownList = param
      console.log(formData)
      return formData
    }
  },
  watch: {
    tableData(newData) {
      var formData = this.modelForm.formData()
      var list = Object.assign([], JSON.parse(JSON.stringify(newData)))
      var param = { mftpDownConfigs: list }
      formData.mftpDownList = param
      this.$emit('update', formData)
    },
    modelForm(fApi) {
      console.log(fApi)
    }
  },
  methods: {
    // set value for form & ele form
    setForm(data) {
      this.data = data
      // this.modelForm.setValue(data)
      if (data.mftpDownList.hasOwnProperty('mftpDownConfigs')) {
        this.tableData = data.mftpDownList.mftpDownConfigs
      }
    },
    handleAdd() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // var param = copy(this.confForm)
          const temp = deepClone({}, this.confForm)
          if (!this.update) {
            this.tableData.push(temp)
            // this.tempData = deepClone({}, this.tableData)
          }
          this.dialogVisible = false
          // this.$refs['form'].resetFields()
          this.resetModel()
        } else {
          return false
        }
      })
    },
    handleUpdate(data) {
      this.update = true
      this.confForm = data
      this.dialogVisible = true
    },
    handleDel(index) {
      this.tableData.splice(index, 1)
    },
    resetModel() {
      this.confForm = {
        isCheck: true,
        doSave: false,
        downloadFile: '',
        isSaveFile: true,
        reconnectCount: 3,
        reconnectInterval: 5,
        samplesInterval: 1000,
        threadCount: 5,
        ftpHostSetting: {
          address: '',
          connectionMode: 'Passive',
          isAnonymous: false,
          isCheck: true,
          password: '',
          port: 21,
          siteName: '',
          taskId: undefined,
          transferMode: 'Binary',
          username: ''
        }
      }
    }
  }
}
