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
    <el-form-item :label="$t('parameter.refreshTimes')" prop="refreshTimes">
      <el-input v-model.number="model.refreshTimes" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.clearCacheTimes')" prop="clearCacheTimes">
      <el-input v-model.number="model.clearCacheTimes" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { refreshTimesCheck, clearCacheTimesCheck, businessNameCheck, tencentNewsTimeoutCheck, testIntervalsCheck, testTimesCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'DouYin',
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
      rules: {
        name: [{
          validator: businessNameCheck,
          trigger: 'blur'
        }],
        timeout: [{
          validator: tencentNewsTimeoutCheck, // 自定义验证
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
        refreshTimes: [{
          validator: refreshTimesCheck, // 自定义验证
          trigger: 'blur'
        }],
        clearCacheTimes: [{
          validator: clearCacheTimesCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      business: '抖音',
      temp: {
        name: '',
        task: 'douyin',
        select: true,
        taskName: 'DouYin',
        timeout: 30,
        testTimes: 1,
        testIntervalS: 10,
        refreshTimes: 10,
        clearCacheTimes: 5
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
