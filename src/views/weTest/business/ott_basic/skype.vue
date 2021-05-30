<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 650px; margin-left:50px;">
    <el-form-item :label="$t('weTest.businessType')" prop="taskName">
      <el-input v-model="model.taskName" disabled />
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
    <el-form-item :label="$t('parameter.friendName')" prop="calledName">
      <el-input v-model="model.calledName" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.sendTxt')" prop="sendText">
      <el-input v-model="model.sendText" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.imageSize')" prop="sendImgQuality">
      <el-select v-model="model.sendImgQuality" placeholder="请选择发送图片大小" style="width:500px" :disabled="state">
        <el-option
          v-for="item in sendImgQualityOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('parameter.voiceSize')" prop="sendVoiceSeconds">
      <el-input v-model.number="model.sendVoiceSeconds" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.videoSize')" prop="sendVideoSeconds">
      <el-input v-model.number="model.sendVideoSeconds" :disabled="state" />
    </el-form-item>
  </el-form>

</template>

<script>
import waves from '@/directive/waves'
import { videoSizeCheck, sendImgQualityCheck, calledNameCheck, businessNameCheck, testIntervalsCheck, testTimesCheck, sendSkypeVoiceSecondsCheck, tencentNewsTimeoutCheck, sendTextCheck } from '../../../../utils/WeTestForm'

export default {
  name: 'Skype',
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
      sendVideoFileSelectOptions: [
        { value: true, label: 'Yes' }, { value: false, label: 'No' }
      ],
      sendImgQualityOptions: [
        { value: 1, label: '1' }, { value: 3, label: '3' }
      ],
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
        calledName: [{
          validator: calledNameCheck,
          trigger: 'blur'
        }],
        sendText: [{
          validator: sendTextCheck,
          trigger: 'blur'
        }],
        videoSize: [{
          validator: videoSizeCheck,
          trigger: 'blur'
        }],
        sendImgQuality: [{
          validator: sendImgQualityCheck,
          trigger: 'change'
        }],
        sendVoiceSeconds: [{
          validator: sendSkypeVoiceSecondsCheck, // 自定义验证
          trigger: 'blur'
        }],
        sendVideoSeconds: [{
          validator: videoSizeCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      temp: {
        name: '',
        select: true,
        task: 'ott_basic',
        taskName: 'Skype',
        sendText: 'how are you!',
        sendImgQuality: 1,
        sendVideoSeconds: 8,
        sendVoiceSeconds: 8,
        testTimes: 1,
        timeout: 30,
        testIntervalS: 10,
        calledName: 'dingli',
        sendVideoFileSelect: false
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
    float: left;
    padding-left: 10px;
  }

  .span_element1 {
    float: left;
    padding-left: 0px;
  }

  .span_element2 {
    float: left;
    padding-left: 20px;
  }
</style>
