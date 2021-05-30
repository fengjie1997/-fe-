import { commonOptions } from '../../common/common'
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
      dialogVisible: false,
      data: {},
      active: ['1'],
      title: 'Multi FTP Download 测试配置',
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
          taskId: null,
          transferMode: 'Binary',
          username: ''
        }

      },
      rules: {
        downloadFile: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 100, message: '请输入正确名称', trigger: 'blur' }
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
      this.modelForm.setValue(data)
      if (data.mftpDownList.hasOwnProperty('mftpDownConfigs')) {
        this.tableData = data.mftpDownList.mftpDownConfigs
      }
    },
    handleAdd() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var param = Object.assign({}, this.confForm)
          this.tableData.push(param)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    handleDel(index) {
      this.tableData.splice(index, 1)
    }
  }
}
