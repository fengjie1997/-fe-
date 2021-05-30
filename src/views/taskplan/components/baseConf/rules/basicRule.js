import Vue from 'vue'
import { getDictByLanguage, getDictToNumberByLanguage } from '@/utils/dictByLanguage'
import store from '@/store/index.js'
import il8n from '@/lang' // Internationalization
import { getTimeZone } from '@/utils/timeZone.js'
import { highSettingRuleForm } from './highSettingRule'
import { getTimezoneDict } from '@/utils/DictTimezoneUtil'
const rules = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: il8n.t('taskPlan.title.basicConfig')
      }})
  },
  {
    type: 'input',
    field: 'name',
    title: il8n.t('taskPlan.label.name'),
    value: '',
    props: { placeholder: il8n.t('taskPlan.message.name') },
    validate: [{
      required: true,
      message: il8n.t('taskPlan.message.name'),
      trigger: 'blur'
    }],
    col: { span: 8, xs: 24, classname: 'form-test' }
  },
  {
    type: 'template',
    field: 'recurrenctType',
    title: il8n.t('taskPlan.label.recurrenctType'),
    value: 0,
    validate: [{
      required: true,
      message: il8n.t('taskPlan.label.recurrenctType'),
      trigger: 'blur'
    }],
    col: { span: 24, xs: 24 },
    template: '<el-row><el-col :span="3"><el-select v-model="recurrenctType" @change="((val)=>{handleRecurrenctType(val)})"><el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="6" v-show="show === 1"> 选择星期  <el-select v-model="effectiveWeek" multiple ><el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="4" v-show="show === 2"><el-input-number v-model="days" :min="1"></el-input-number> 天数</el-col><el-col :span="3" v-show="show === 3" class="baseconf-pickerdate"><el-date-picker v-model="pickDay" type="date" @change="((date)=>{handlePickerDate(date)})" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" /></el-col><el-col :span="12" class="date-tags"><el-tag v-for="(tag, idx) in tags" :key="idx" closable @close="handleClose(tag)"> {{ tag }}</el-tag></el-col></el-row>',
    vm: new Vue({
      il8n: il8n,
      data: {
        show: 0,
        // options: getDictByLanguage('repeatType'),
        options: [{ label: 'always', value: '0' }], // 2020-02-21 临时解决方案，只留 Always 选项   getDictByLanguage('repeatType')[0]
        recurrenctType: getDictByLanguage('repeatType')[0].value,
        // week
        weekOptions: getDictByLanguage('dateWeek'),
        effectiveWeek: [],
        // days
        days: '',
        tags: [],
        // customize
        pickDay: '',
        customizeDays: []
      },
      methods: {
        handleRecurrenctType(v) {
          this.show = Number(v)
        },
        handlePickerDate(date) {
          // 清除
          this.pickDay = ''
          // 拷贝已选日期
          const arrDays = this.tags.splice(0)
          // 日期是否已选
          const temp = new Set(arrDays)
          const hasDateStr = temp.has(date)
          // 未选择处理
          if (!hasDateStr) {
            arrDays.push(date)
          }
          this.tags = arrDays
        },
        handleClose(tag) {
          this.tags.splice(this.tags.indexOf(tag), 1)
        }
      }
    })
  },
  {
    type: 'hidden',
    field: 'effectiveDays',
    value: ''
  },
  {
    type: 'datePicker',
    field: 'startTime',
    title: il8n.t('taskPlan.label.startTime'),
    value: getTimeZone(store.getters.timezone),
    // options: getDictByTagName('repeatType'),
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'type': 'datetime',
      'format': 'yyyy-MM-dd HH:mm:ss'
    },
    validate: [{
      required: true,
      message: il8n.t('taskPlan.message.startTime'),
      trigger: 'blur'
    }]
  },
  {
    type: 'datePicker',
    field: 'endTime',
    title: il8n.t('taskPlan.label.endTime'),
    value: '',
    // options: getDictByTagName('repeatType'),
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'type': 'datetime',
      'format': 'yyyy-MM-dd HH:mm:ss'
    }
  },
  // {
  //   type: 'datePicker',
  //   field: 'endTime',
  //   title: il8n.t('taskPlan.label.endTime'),
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     'type': 'datetime',
  //     'format': 'yyyy-MM-dd HH:mm:ss'
  //   }
  // },
  {
    type: 'select',
    field: 'testType',
    title: il8n.t('taskPlan.label.testType'),
    value: getDictToNumberByLanguage('testType')[0].value,
    options: getDictToNumberByLanguage('testType'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: il8n.t('taskPlan.message.testType'),
      trigger: 'change'
    }]
  },
  {
    type: 'hidden',
    field: 'testTypeDesc',
    value: ''
  },
  {
    type: 'select',
    field: 'testLevel',
    title: il8n.t('taskPlan.label.testLevel'),
    value: getDictToNumberByLanguage('testLevel')[0].value,
    options: getDictToNumberByLanguage('testLevel'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: il8n.t('taskPlan.message.testLevel'),
      trigger: 'change'
    }]
  },
  {
    type: 'hidden',
    field: 'testLevelDesc',
    value: ''
  },
  {
    type: 'select',
    field: 'testScenario',
    title: il8n.t('taskPlan.label.testScenario'),
    value: getDictToNumberByLanguage('areaTag')[0].value,
    options: getDictToNumberByLanguage('areaTag'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: il8n.t('taskPlan.message.testScenario'),
      trigger: 'change'
    }]
  },
  {
    type: 'hidden',
    field: 'testScenarioDesc',
    value: ''
  },
  {
    type: 'select',
    field: 'timeZone',
    title: il8n.t('taskPlan.label.timeZone'),
    value: getDictByLanguage('timeZone')[0].value,
    options: getTimezoneDict(),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: il8n.t('taskPlan.message.timeZoneSelect'),
      trigger: 'change'
    }]
  },
  {
    type: 'template',
    name: 'testSetting',
    field: 'testSetting',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" @modemPort-change="handleChange" /></div>',
    vm: new Vue({
      il8n: il8n,
      data: {
        modelForm: {},
        rule: highSettingRuleForm,
        option: {
          submitBtn: false,
          form: {
            inline: false,
            labelPosition: 'right',
            labelSuffix: undefined,
            hideRequiredAsterisk: false,
            labelWidth: '185px',
            showMessage: true,
            inlineMessage: false,
            statusIcon: false,
            validateOnRuleChange: true,
            disabled: false,
            size: 'small'
          }
        }
      },
      methods: {
        handleChange(inject) {
          const self = inject.self
          // 切换传输端口
          if (self.field === 'modemPort') {
            this.$confirm(il8n.t('taskPlan.message.switchModemPort'), il8n.t('common.tip'), {
              confirmButtonText: il8n.t('common.confirm'),
              cancelButtonText: il8n.t('common.cancel'),
              type: 'warning'
            }).then(() => {
              store.commit('SET_MODEM_PORT', self.value)
            }).catch(() => {
              self.value = store.state.testPlan.modemPort
            })
          }
        }
      }
    })
  }
]

export { rules }
