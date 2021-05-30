<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 650px; margin-left:50px;">
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
    <el-form-item :label="$t('parameter.payAmount')" prop="payNumber">
      <el-input v-model="model.payNumber" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.payPassword')" prop="payPassword">
      <el-input v-model="model.payPassword" show-password :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { businessNameCheck, testIntervalsCheck, testTimesCheck, tencentNewsTimeoutCheck, payNumberCheck, payPasswordCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'AliPay',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      state: false,
      business: '支付宝',
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
          validator: tencentNewsTimeoutCheck, // 自定义验证
          trigger: 'blur'
        }],
        payPassword: [
          { validator: payPasswordCheck, trigger: 'blur' }
        ],
        payNumber: [{
          validator: payNumberCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      temp: {
        name: '',
        task: 'scan_pay',
        select: true,
        taskName: 'Alipay',
        timeout: 30,
        testTimes: 1,
        testIntervalS: 10,
        payNumber: 0.01,
        payPassword: ''
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
      this.model.payNumber = Number(this.model.payNumber)
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
