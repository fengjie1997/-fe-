// CreateForm
import { rules } from './rules/basicRule.js'
import { getTime, getTimeStamp } from '@/utils/timeZone.js'
import { getDictNameByValue } from '@/utils/dictCache.js'
import { addTestPlanBaseConf, fetchtSchemaPortList, fetchtTestPlanBaseConf } from '@/api/device/testPlanList.js' // fetchtTestPlanBaseConf
import { mapState } from 'vuex'

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
          innerText: this.$t('common.save'),
          col: {
            span: 4,
            offset: 20
          }
        },
        form: {
          inline: false,
          labelPosition: 'left',
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
          // 基本配置中switchType逻辑（By Time -> Duration, By File - > Size）
          if (this.modelData.testSetting.switchType === 'By Time') {
            delete this.modelData.testSetting.size
          } else {
            delete this.modelData.testSetting.duration
          }
          addTestPlanBaseConf(this.$route.params.deviceId, this.modelData, this.planId).then(res => {
            if (res.data.code === 1) {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.success'),
                type: 'success',
                duration: 2000
              })
              // 新建测试计划时
              if (this.planId === null) {
                // 刷新测试计划端口列表
                this.$emit('updatePlanId', res.data.data.testPlanId)
              }
              console.log(this)
            }
          })
        }
      },
      portList: [],
      modelData: {}
    }
  },
  computed: {
    ...mapState({
      portNumberList: state => state.testPlan.portNumberList
    })
  },
  watch: {
    planId(id) {
      this.planId = id
    },
    portNumberList(newValue, oldValue) {
      this._updateModemPortOpts(newValue || [])
    }
  },
  created() {
    // store.dispatch('setApiUrl', 'http://172.16.13.10:8001')
    //
    if (this.planId !== null) {
      console.log('1')
      fetchtTestPlanBaseConf(this.$route.params.deviceId, this.planId).then(res => {
        var data = Object.assign({}, res.data.data)
        data.startTime = getTime(Number(data.startTime), data.timeZone)
        if (data.endTime) {
          data.endTime = getTime(Number(data.endTime), data.timeZone)
        } else {
          data.endTime = ''
        }
        this.modelForm.setValue(data)
        //
        console.log(this.modelForm)
        this.rules.forEach(item => {
          if (item.field === 'testSetting') {
            item.vm.modelForm.setValue(data['testSetting'])
          }
        })
        // testSetting编辑时写值
        this.modelForm.rule.forEach(item => {
          if (item.field === 'testSetting') {
            item.vm.modelForm.rule.forEach(px => {
              if (px.field === 'switchType') {
                px.vm.size = item.value.size
                px.vm.duration = item.value.duration
              }
              if (px.field) {
                if (item.value[px.field]) {
                  item.vm.modelForm.setValue(px.field, item.value[px.field])
                }
              }
            })
          }
        })
        // 设置modemPort到store
        this.$store.commit('SET_MODEM_PORT', data.testSetting.modemPort)
        this.$store.commit('SET_DEVICE_ID', this.$route.params.deviceId)
      })
    }
    // 端口列表
    fetchtSchemaPortList(this.$route.params.deviceId, null).then(res => {
      this.portList = res.data.data
      this.$store.commit('SET_PORT_NUMBER_LIST', this.portList.map(port => { return { value: port.portNumber, label: port.portNumber } }))
    })
  },
  methods: {
    /**
     * 更新传输端口选项列表
     * @param options 端口选项列表
     * @private
     */
    _updateModemPortOpts(options) {
      const rules = this.modelForm.rule
      if (!rules) return
      const testSetting = rules.find(rule => rule.field === 'testSetting')
      if (!(testSetting && testSetting.vm && testSetting.vm.rule)) return
      const modemPort = testSetting.vm.rule.find(rule => rule.field === 'modemPort')
      modemPort.options = options
    }
  }

}
