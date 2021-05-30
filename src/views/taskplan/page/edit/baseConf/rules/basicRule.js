import Vue from 'vue'
import store from '@/store/index.js'
import { getTimeZone } from '@/utils/timeZone.js'
import { getDictByTagName, getDictByTagNameStringToNumber } from '@/utils/dictCache.js'
import { highSettingRuleForm } from './highSettingRule'
const rules = [
  {
    type: 'template',
    col: { span: 24, xs: 24 },
    template: '<el-divider>{{ title }}</el-divider>',
    vm: new Vue({
      data: {
        title: '基本配置'
      }})
  },
  {
    type: 'input',
    field: 'name',
    title: '计划名称',
    value: '测试计划名称',
    props: { placeholder: '请输入计划名称' },
    validate: [{
      required: true,
      message: '请输入计划名称',
      trigger: 'blur'
    }],
    col: { span: 8, xs: 24, classname: 'form-test' }
  },
  {
    type: 'template',
    field: 'recurrenctType',
    title: '执行周期',
    value: 0,
    validate: [{
      required: true,
      message: '请选择执行周期',
      trigger: 'blur'
    }],
    col: { span: 24, xs: 24 },
    template: '<el-row><el-col :span="3"><el-select v-model="recurrenctType" @change="((val)=>{handleRecurrenctType(val)})" :placeholder="$t('common.pleaseSelect')"><el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="6" v-show="show === 1"> 选择星期  <el-select v-model="effectiveWeek" multiple :placeholder="$t('common.pleaseSelect')"><el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select></el-col><el-col :span="4" v-show="show === 2"><el-input-number v-model="days" :min="1"></el-input-number> 天数</el-col><el-col :span="3" v-show="show === 3" class="baseconf-pickerdate"><el-date-picker v-model="pickDay" type="date" @change="((date)=>{handlePickerDate(date)})" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" /></el-col><el-col :span="12" class="date-tags"><el-tag v-for="(tag, idx) in tags" :key="idx" closable @close="handleClose(tag)"> {{ tag }}</el-tag></el-col></el-row>',
    vm: new Vue({
      data: {
        show: 0,
        options: getDictByTagName('repeatType'),
        recurrenctType: getDictByTagName('repeatType')[0].value,
        // week
        weekOptions: getDictByTagName('dateWeek'),
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
    title: '开始时间',
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
      message: '请选择开始时间',
      trigger: 'blur'
    }]
  },
  {
    type: 'datePicker',
    field: 'endTime',
    title: '结束时间',
    col: {
      span: 12,
      xs: 24
    },
    props: {
      'type': 'datetime',
      'format': 'yyyy-MM-dd HH:mm:ss',
      'placeholder': '请选择结束时间'
    }
  },
  {
    type: 'select',
    field: 'testType',
    title: '测试类型',
    value: getDictByTagNameStringToNumber('testType')[0].value,
    options: getDictByTagNameStringToNumber('testType'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试类型',
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
    title: '测试级别',
    value: getDictByTagNameStringToNumber('testLevel')[0].value,
    options: getDictByTagNameStringToNumber('testLevel'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试级别',
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
    title: '测试场景',
    value: getDictByTagNameStringToNumber('areaTag')[0].value,
    options: getDictByTagNameStringToNumber('areaTag'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试场景',
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
    title: '测试时区',
    value: getDictByTagName('timeZone')[0].value,
    options: getDictByTagName('timeZone'),
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: '请选择测试时区',
      trigger: 'change'
    }]
  },
  {
    type: 'template',
    name: 'testSetting',
    field: 'testSetting',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
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
      }})
  }

]

export { rules }
