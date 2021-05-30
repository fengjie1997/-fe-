// CreateForm
import store from '@/store/index.js'
import { rules } from './rules/basicRule.js'
import { getTime, getTimeStamp } from '@/utils/timeZone.js'
import { getDictNameByValue } from '@/utils/dictCache.js'
import { addTestPlanBaseConf, fetchtSchemaPortList, savingTestPlanPortInfo, fetchtTestPlanBaseConf } from '@/api/device/testPlanList.js' // fetchtTestPlanBaseConf
export default {
  name: 'baseConf',
  props: {
    planId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      value1: '',
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
      // collapse
      modelForm: {},
      rules: rules,
      options: {
        resetBtn: false,
        submitBtn: {
          type: 'primary',
          size: 'md',
          icon: '',
          shape: 'round',
          innerText: '确认提交',
          col: {
            span: 4,
            offset: 2
          }
        },
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
        onSubmit: (formData) => {
          this.modelData = Object.assign({}, formData)
          // testSetting
          this.modelForm.rule.forEach(item => {
            // recurrenctType
            if (item.field === 'recurrenctType') {
              this.modelData.recurrenctType = item.vm.recurrenctType
              console.log(item)
              switch (item.vm.recurrenctType) {
                case '1':
                  this.modelData.effectiveDays = item.vm.effectiveWeek
                  break
                case '2':
                  this.modelData.effectiveDays = item.vm.days
                  break
                default:
                  break
              }
            }
            if (item.field === 'testSetting') {
              this.modelData.testSetting = item.vm.modelForm.formData()
              item.vm.rule.forEach(item => {
                // switchType
                if (item.field === 'switchType') {
                  this.modelData.testSetting.size = item.vm.size
                  this.modelData.testSetting.duration = item.vm.duration
                  this.modelData.testSetting.switchType = item.vm.switchType
                }
                // ups acton
                if (item.field === 'upsAction') {
                  if (item.vm.upsAction === '2') {
                    this.modelData.testSetting.upsAction = item.vm.size
                  } else {
                    this.modelData.testSetting.upsAction = item.vm.upsAction
                  }
                }
              })
            }
          })

          // desc
          this.modelData.testTypeDesc = getDictNameByValue('testType', this.modelData.testType.toString())
          this.modelData.testLevelDesc = getDictNameByValue('testLevel', this.modelData.testLevel.toString())
          this.modelData.testScenarioDesc = getDictNameByValue('areaTag', this.modelData.testScenario.toString())
          // timestamp
          this.modelData.startTime = getTimeStamp(this.modelData.startTime)
          if (this.modelData.endTime !== null) {
            this.modelData.endTime = getTimeStamp(this.modelData.endTime)
          }
          console.log('测试计划ID：' + this.planId)
          addTestPlanBaseConf(this.$route.params.deviceId, this.modelData, this.planId).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.success'),
                type: 'success',
                duration: 2000
              })
              // 初始化该计划端口信息
              if (this.planId === null) {
                this.$emit('updatePlanId', res.data.data.testPlanId)
                this.savingDeviceTestplanPortList(res.data.data.testPlanId)
              }
            }
          })
        }
      },
      portList: [],
      modelData: {}
    }
  },
  watch: {
    planId(id) {
      this.planId = id
    }
  },
  created() {
    // console.log('planId', this.planId)
    // store.dispatch('setApiUrl', 'http://172.16.13.10:8001')
    //
    if (this.planId !== null) {
      fetchtTestPlanBaseConf(this.$route.params.deviceId, this.planId).then(res => {
        var data = Object.assign({}, res.data.data)
        data.startTime = getTime(Number(data.startTime), data.timeZone)
        data.endTime = getTime(Number(data.endTime), data.timeZone)
        // console.log(data)
        if (data.endTime !== null) {
          data.endTime = getTime(Number(data.endTime), data.timeZone)
        }
        this.modelForm.setValue(data)
        //
        this.rules.forEach(item => {
          if (item.field === 'testSetting') {
            item.vm.modelForm.setValue(data['testSetting'])
          }
        })
      })
    }
    // 端口列表
    fetchtSchemaPortList(this.$route.params.deviceId, null).then(res => {
      this.portList = res.data.data
    })
  },
  methods: {
    // 保存端口
    savingDeviceTestplanPortList(planId) {
      this.portList.forEach(item => {
        var para = {
          enable: 1,
          isCheck: 1,
          netWorkType: item.netWorkType,
          portNumber: item.portNumber,
          schemaName: Math.random().toString(36).substring(2) // 随机名称
        }
        savingTestPlanPortInfo(planId, para).then(res => {
          store.dispatch('setTestPlanId', planId)
        })
      })
    }
  }

}
