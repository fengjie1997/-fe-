import { deepClone } from '@/utils/MonitoredTable'

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
      title: this.$t('taskPlan.mftpUp.title'),
      modelForm: {},
      option: {
        submitBtn: false,
        form: {
          inline: false,
          labelPosition: 'right',
          labelSuffix: undefined,
          hideRequiredAsterisk: false,
          labelWidth: '180px',
          showMessage: true,
          inlineMessage: false,
          statusIcon: false,
          validateOnRuleChange: true,
          disabled: false,
          size: 'small'
        },
        row: {
          gutter: 5
        }
      },
      tableData: [],
      confForm: {
        isCheck: true,
        reconnectCount: 3,
        reconnectInterval: 5,
        samplesInterval: 1000,
        threadCount: 5,
        fileSize: 0,
        fileSource: 'Create File',
        localFile: '',
        remoteDirectory: '',
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
          { required: true, message: this.$t('taskPlan.mftpUp.message1'), trigger: 'blur' },
          { min: 1, max: 100, message: this.$t('taskPlan.mftpUp.message2'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // ftp upload form data
    formData() {
      var formData = this.modelForm.formData()
      var list = Object.assign([], JSON.parse(JSON.stringify(this.tableData)))
      var param = { mftpUpConfigs: list }
      formData.mftpUpList = param
      console.log(formData)
      return formData
    }
  },
  watch: {
    tableData(newData) {
      var formData = this.modelForm.formData()
      var list = Object.assign([], JSON.parse(JSON.stringify(newData)))
      var param = { mftpUpConfigs: list }
      formData.mftpUpList = param
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
      if (data.mftpUpList.hasOwnProperty('mftpUpConfigs')) {
        this.tableData = data.mftpUpList.mftpUpConfigs
      }
    },
    handleAdd() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const temp = deepClone({}, this.confForm)
          if (!this.update) {
            this.tableData.push(temp)
          }
          this.dialogVisible = false
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
        reconnectCount: 3,
        reconnectInterval: 5,
        samplesInterval: 1000,
        threadCount: 5,
        fileSize: 0,
        fileSource: 'Create File',
        localFile: '',
        remoteDirectory: '',
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
