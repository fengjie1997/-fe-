import { addTask } from '@/api/device/testPlanList.js' // addTask

export default {
  name: 'taskForm',
  components: { },
  props: {
    rules: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      refs: {},
      rule: [],
      taskForm: {},
      modelForm: {},
      options: {
        submitBtn: false,
        form: {
          inline: false,
          labelPosition: 'right',
          labelSuffix: undefined,
          hideRequiredAsterisk: false,
          labelWidth: '180px',
          showMessage: true,
          inlineMessage: true,
          statusIcon: false,
          validateOnRuleChange: true,
          disabled: false,
          size: 'small'
        },
        row: {
          gutter: 6
        }
      }
    }
  },
  methods: {
    onMounted() {
      this.$nextTick(() => {
        console.log(this.refs)
      }
      )
      console.log(this.refs)
      console.log(this.taskForm)
      // this.modelForm.setValue(data)
      // this.modelForm.rule.forEach(item => {
      //   if (item.hasChildren) {
      //     item.vm.data = data[item.field]
      //   }
      // })
    },
    // submit
    onSubmits(groupId, taskId, updateGroup) {
      // var form = this.modelForm
      var rules = this.modelForm.rule
      var modelData = Object.assign({}, this.modelForm.formData())
      rules.forEach(item => {
        // level 1
        if (item.hasChildren) {
          modelData[item.field] = item.vm.modelForm.formData()
          // level 2
          item.vm.rule.forEach(item2 => {
            if (item2.hasChildren) {
              modelData[item.field][item2.field] = item2.vm.modelForm.formData()
              // level 3
              item2.vm.rule.forEach(item3 => {
                // 兼容
                if (item3.hasChildren) {
                  var arr = []
                  var infoObj = {}
                  arr.push(item3.vm.modelForm.formData())
                  infoObj[item3.field] = arr
                  modelData[item.field][item2.field] = infoObj
                  // modelData[item.field][item2.field][item3.field] = item3.vm.modelForm.formData()
                }
                // list
                if (item3.formType === 'list') {
                  modelData[item3.field] = item3.vm.list
                }
              })
            }
            // list
            if (item2.formType === 'list') {
              modelData[item.field][item2.field] = item2.vm.list
            }
          })
        }
      })
      addTask(groupId, modelData, taskId).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.success'),
            type: 'success',
            duration: 2000
          })
          updateGroup()
        }
      })
    },
    // test
    testMe() {
      var fApi = []
      var rules = this.modelForm.rule

      rules.forEach(item => {
        // level 1
        if (item.hasChildren) {
          fApi[item.field] = item.vm.modelForm
          // level 2
          item.vm.rule.forEach(item2 => {
            if (item2.hasChildren) {
              fApi[item2.field] = item2.vm.modelForm
              // level 3
              item2.vm.rule.forEach(item3 => {
                if (item3.hasChildren) {
                  fApi[item3.field] = item3.vm.modelForm
                }
                if (item3.hasChildren && item3.formType === 'list') {
                  fApi[item3.field] = item3.vm.list
                }
              })
            }
            // list
            if (item2.formType === 'list') {
              fApi[item2.field] = item2.vm.modelForm
            }
          })
        }
      })
      console.log(fApi)
      return fApi
    },
    onSubmit(groupId, taskId, updateGroup) {
      // var fApi = []
      var rules = this.modelForm.rule
      var modelData = Object.assign({}, this.modelForm.formData())
      rules.forEach(item => {
        // level 1
        if (item.hasChildren) {
          if (item.vm.hasOwnProperty('formData')) {
            console.log(item)
            modelData[item.field] = item.vm.formData
          }
        }
      })
      addTask(groupId, modelData, taskId).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.success'),
            type: 'success',
            duration: 2000
          })
          updateGroup()
        }
      })
    },
    testSubmit(data) {
      console.log(data)
    },
    handleTaskForm(data) {
      this.taskForm = data
      this.modelForm.setValue(data)
      this.modelForm.rule.forEach(item => {
        if (item.hasChildren) {
          console.log(item)
          item.vm.data = data[item.field]
        }
      })
      // var fApi = this.testSubmit()
      // this.modelForm.setValue(data)
      // // setValue
      // Object.keys(data).forEach((key) => {
      //   if (typeof fApi[key] === 'object') {
      //     console.log(data[key])
      //     fApi[key].setValue(data[key])
      //     // level2
      //     Object.keys(data[key]).forEach((key2) => {
      //       if (typeof fApi[key2] === 'object') {
      //         console.log(key2)
      //         fApi[key].setValue(data[key][key2])
      //       }
      //     })
      //     // level3
      //   }
      // })
      // //
      // console.log(this.modelForm)
      // this.modelForm.rule.forEach(item => {
      //   if (item.hasChildren) {
      //     item.vm.rule.forEach(item2 => {
      //       if (item2.formType === 'list') {
      //         console.log('list')
      //         item2.vm.list = data[item.field][item2.field]
      //       }
      //     })
      //   }
      // })
    }

  }
}

