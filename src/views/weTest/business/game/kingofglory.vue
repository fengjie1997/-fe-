<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 700px; margin-left:50px;">
    <el-form-item :label="$t('weTest.businessType')" prop="taskName">
      <el-input v-model="business" disabled />
    </el-form-item>
    <el-form-item :label="$t('weTest.businessName')" prop="name">
      <el-input v-model="model.name" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testTimes')" prop="testTimes">
      <el-input v-model.number="model.testTimes" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testIntervalS')" prop="testIntervalS">
      <el-input v-model.number="model.testIntervalS" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.timeOut')" prop="timeout">
      <el-input v-model.number="model.timeout" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testDuration')" prop="testDuration">
      <el-input v-model.number="model.testDuration" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { businessNameCheck, testIntervalsCheck, testTimesCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'KingOfGlory',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    const gameTimeoutCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入超时时间(s)'))
      }
      value = Number(value)
      if (typeof value === 'number' && !isNaN(value)) {
        if (value < 120) {
          callback(new Error('超时时间(s)大于或等于120'))
        } else if (value <= this.model.testDuration * 1.5) {
          callback(new Error('超时时间(s)大于测试时长(s)的1.5倍'))
        } else {
          callback()
        }
      } else {
        callback(new Error('超时时间(s)必须为数字'))
      }
    }
    const gameTestDurationCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入测试时长(s)'))
      }
      value = Number(value)
      if (typeof value === 'number' && !isNaN(value)) {
        if (value < 60) {
          callback(new Error('测试时长(s)大于或等于60'))
        } else if (value * 1.5 > this.model.timeout) {
          callback(new Error('超时时间(s)大于测试时长(s)的1.5倍'))
        } else {
          callback()
        }
      } else {
        callback(new Error('测试时长(s)必须为数字'))
      }
    }
    return {
      state: false,
      business: '王者荣耀',
      temp: {
        name: '',
        task: 'game',
        select: true,
        taskName: 'King_of_Glory',
        timeout: 120,
        testTimes: 1,
        testIntervalS: 10,
        testDuration: 60
      },
      rules: {
        name: [{
          validator: businessNameCheck,
          trigger: 'blur'
        }],
        testTimes: [{
          validator: testTimesCheck, // 自定义验证
          trigger: 'blur'
        }],
        testIntervalS: [{
          validator: testIntervalsCheck, // 自定义验证
          trigger: 'blur'
        }],
        timeout: [{
          validator: gameTimeoutCheck, // 自定义验证
          trigger: 'blur'
        }],
        testDuration: [{
          validator: gameTestDurationCheck, // 自定义验证
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.model.name === undefined) {
        // 如果是新建，执行一下操作
        for (const j in this.temp) {
          this.$set(this.model, j, this.temp[j])
        }
      } else {
        this.state = this.model.state
      }
    },
    submitForm() {
      return this.$refs.dataForm.validate()
    }
  }
}
</script>

<style scoped>
  .span_element {
    float:left;padding-left:10px;
  }
</style>
