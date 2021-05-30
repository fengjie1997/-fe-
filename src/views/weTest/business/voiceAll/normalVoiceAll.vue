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
    <el-form-item label="语音拨打时长(s)" prop="dialSeconds">
      <el-input v-model.number="model.dialSeconds" :disabled="state" />
    </el-form-item>
    <el-form-item label="主叫/被叫">
      <el-select v-model="model.userType" :disabled="state" style="width:500px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="被叫用户" prop="calledName">
      <el-input v-model="model.calledName" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import {
  businessNameCheck,
  testIntervalsCheck,
  testTimesCheck,
  dialSecondsCheck,
  callNameCheck
} from '../../../../utils/WeTestForm'
export default {
  name: 'NormalVoiceAll',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    const timeoutCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入超时时间(s)'))
      }
      if (value < this.model.dialSeconds * 1.5) {
        callback(new Error('超时时间(s)大于语音拨打时长的1.5倍'))
      }
      value = Number(value)
      if (typeof value === 'number' && !isNaN(value)) {
        if (value < 60) {
          callback(new Error('超时时间(s)大于或等于60'))
        } else {
          callback()
        }
      } else {
        callback(new Error('超时时间(s)必须数字'))
      }
    }
    return {
      options: [{ label: '主叫', value: 0 }, { label: '被叫', value: 1 }],
      state: false,
      business: '普通通话',
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
        timeout: [{
          validator: timeoutCheck, // 自定义验证
          trigger: 'blur'
        }],
        dialSeconds: [{
          validator: dialSecondsCheck, // 自定义验证
          trigger: 'blur'
        }],
        calledName: [{
          validator: callNameCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      temp: {
        name: '',
        isAudio: false,
        task: 'normal_voice_call',
        select: true,
        taskName: 'Normal_Voice_Call',
        testTimes: 1,
        timeout: 60,
        dialSeconds: 30,
        userType: 0,
        calledName: 10086,
        testIntervalS: 10,
        doDial: 2
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
      this.model.calledName = this.model.calledName.toString()
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
