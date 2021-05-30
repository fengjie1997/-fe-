import Vue from 'vue'
import FixForm from './fix'
import i18n from '@/lang'
import { commonOption } from './commonOption.js'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
import { randomTimeSectionListRule } from '@/views/taskplan/components/portConf/taskRule/voice/randomTimeSection'
let fixedTimeSetting = [
  // 用于时间的选择,业务为moc时randomDuration可选
  {
    type: 'radio',
    title: i18n.t('taskPlan.title.timeSetting'),
    field: 'otherCustomTime',
    value: 0,
    col: {
      span: 24,
      xs: 24
    },
    options: [
      { value: 0, label: i18n.t('taskPlan.form.timeSetting'), disabled: false },
      { value: 1, label: i18n.t('taskPlan.form.timeWindowSetting'), disabled: false },
      { value: 2, label: i18n.t('taskPlan.title.randomDurationSetting'), disabled: true }
    ],
    emit: ['change']
  },
  {
    type: 'hidden',
    field: 'taskDuration',
    title: i18n.t('taskPlan.form.taskDuration'),
    value: 3,
    col: {
      span: 12,
      xs: 24
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    props: {
      min: 0
    }
  },
  // 固定时长设置-任务间隔
  {
    type: 'InputNumber',
    field: 'interval',
    title: i18n.t('taskPlan.form.interval'),
    value: 15,
    col: {
      span: 12,
      xs: 24
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    props: {
      min: 0
    }
  },
  // 时间窗设置-isCheck
  {
    type: 'hidden',
    title: i18n.t('taskPlan.form.isAvailable'),
    field: 'isCheck',
    value: false,
    col: {
      span: 24,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  // 时间窗设置-时间窗总时长
  {
    type: 'InputNumber',
    field: 'windowSize',
    title: i18n.t('taskPlan.form.windowSize'),
    value: 20,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0,
      disabled: false
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    validate: [{
      required: true,
      message: '',
      trigger: 'blur'
    }]
  },
  // 时间窗设置-任务时长(此处的值，与各业务做匹配)
  {
    type: 'InputNumber',
    field: 'duration',
    title: i18n.t('taskPlan.form.taskDuration'),
    value: 3,
    col: {
      span: 12,
      xs: 24
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    props: {
      disable: true,
      min: 0
    }
  },
  // 时间窗设置-保护时长
  {
    type: 'InputNumber',
    field: 'guardDuration',
    title: i18n.t('taskPlan.form.guardDuration'),
    value: 90,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      disabled: false,
      min: 0
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    }
    // validate: [{
    //   required: true,
    //   message: '通话时长',
    //   trigger: 'blur'
    // }]
  },
  // 时间窗设置-接入时长
  {
    type: 'InputNumber',
    field: 'accessTime',
    title: i18n.t('taskPlan.voice.connection'),
    value: 10,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  }
//
]
fixedTimeSetting = fixedTimeSetting.concat(randomTimeSectionListRule)
var fixedTimeSettingRule = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'fixedTimeSetting',
  col: { span: 24, xs: 24 },
  template: '<FixForm ref="refFix" :rule="rule" @update="update" />',
  // template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" @time-change="change" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    components: { FixForm },
    data: {
      data: {},
      title: i18n.t('taskPlan.form.timeSetting'),
      active: ['1'],
      modelForm: {},
      rule: fixedTimeSetting,
      option: commonOption,
      fixedTimeSetting: {},
      form: {}
    },
    computed: {
      formData() {
        return this.$refs.refFix.modelForm.formData()
      }
    },
    watch: {
      data(newData) {
        console.log(newData)
        console.log(this)
        const apiData = this.$parentFC.apiData
        // fixedTimeSetting初始化
        console.log(apiData)

        // 对导入的测试计划
        if (apiData.hasOwnProperty('fixedTimeSetting')) {
          if (!apiData.fixedTimeSetting.hasOwnProperty('otherCustomTime')) {
            if (apiData.timeWindowSetting) {
              if (apiData.timeWindowSetting.hasOwnProperty('windowSize')) {
                console.log('1123')
                this.$refs.refFix.modelForm.setValue('otherCustomTime', 1)
              } else {
                console.log('2')
                this.$refs.refFix.modelForm.rule[0].value = 0
              }
            }
            if (apiData.mocTestConfig) {
              console.log('3')
              if (apiData.mocTestConfig.hasOwnProperty('useRandomTimeDial')) {
                this.$refs.refFix.modelForm.rule[0].value = 2
              }
            }
          }
        }

        this.$refs.refFix.modelForm.setValue('interval', apiData.interval / 1000)
        // this.$refs.refFix.modelForm.setValue('otherCustomTime', apiData.fixedTimeSetting.otherCustomTime)
        this.$refs.refFix.modelForm.setValue('taskDuration', apiData.fixedTimeSetting.taskDuration / 1000)
        if (apiData.fixedTimeSetting.otherCustomTime === 1) {
          // timeWindowSetting初始化
          this.$refs.refFix.modelForm.setValue('accessTime', apiData.timeWindowSetting.accessTime / 1000)
          this.$refs.refFix.modelForm.setValue('duration', apiData.timeWindowSetting.duration / 1000)
          this.$refs.refFix.modelForm.setValue('guardDuration', apiData.timeWindowSetting.guardDuration / 1000)
          this.$refs.refFix.modelForm.setValue('windowSize', apiData.timeWindowSetting.windowSize / 1000)
        } else if (apiData.fixedTimeSetting.otherCustomTime === 2) {
          this.$refs.refFix.modelForm.updateRule('otherCustomTime', {
            options: [
              { value: 0, label: i18n.t('taskPlan.form.timeSetting'), disabled: false },
              { value: 1, label: i18n.t('taskPlan.form.timeWindowSetting'), disabled: false },
              { value: 2, label: i18n.t('taskPlan.title.randomDurationSetting'), disabled: false }
            ]
          })
          this.$refs.refFix.modelForm.rule[8].vm.list.useRandomTimeDial = apiData.mocTestConfig.useRandomTimeDial
        }
        //   this.$parentFC.modelForm.rule.forEach(item => {
        //     if (item.field === 'randomTimeSection') {
        //       item.vm.rule.forEach(model => {
        //         if (model.parse) {
        //           this.$refs.refFix.modelForm.setValue(model.field, model.value / 1000)
        //         } else {
        //           this.$refs.refFix.modelForm.setValue(model.field, model.value)
        //         }
        //       })
        //     }
        // })
        // this.rule.forEach(item => {
        //   if (item.reverseParse) {
        //     newData[item.field] = item.reverseParse(newData[item.field])
        //   }
        // })
        // this.$refs.refFix.modelForm.setValue(newData)
      }
    },
    created() {
      console.log(this)
    },
    methods: {
      update(data) {
        this.form = data
      },
      getForm() {
        return this.$refs.refMoc.modelForm.formData()
      },
      change() {
        const parentFC = this.$parentFC
        console.log(parentFC)
      }
    }
  })
}
export { fixedTimeSettingRule }
