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
    <el-form-item :label="$t('parameter.playSecondS')" prop="playSecondS">
      <el-input v-model.number="model.playSecondS" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import {
  playSecondSCheck,
  businessNameCheck,
  testIntervalsCheck,
  testTimesCheck,
  testDurationCheck, tencentNewsTimeoutCheck
} from '../../../../utils/WeTestForm'
export default {
  name: 'HuYa',
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
      business: '虎牙直播',
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
          validator: testIntervalsCheck,
          trigger: 'blur'
        }],
        testDuration: [{
          validator: testDurationCheck, // 自定义验证
          trigger: 'blur'
        }],
        playSecondS: [{
          validator: playSecondSCheck,
          trigger: 'blur'
        }],
        timeout: [{
          validator: tencentNewsTimeoutCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      temp: {
        name: '',
        task: 'live_video',
        select: true,
        taskName: 'HuYa',
        testTimes: 1,
        timeout: 60,
        testIntervalS: 10,
        playSecondS: 10
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
    setTaskName() {
      this.model.taskName = '(HttpVideo)' + this.model.name
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
