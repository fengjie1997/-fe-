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
      <el-input v-model.number="model.testIntervalS" :disabled="state" @change="x" />
    </el-form-item>
    <el-form-item :label="$t('parameter.timeOut')" prop="timeout">
      <el-input v-model.number="model.timeout" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.friendName')" prop="calledName">
      <el-input v-model="model.calledName" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.selectAction')" prop="selectActionList">
      <el-checkbox v-model="checked0">发文本</el-checkbox>
      <el-checkbox v-model="checked1">发图片</el-checkbox>
      <el-checkbox v-model="checked2">发语音</el-checkbox>
      <el-checkbox v-model="checked3">发视频</el-checkbox>
      <el-checkbox v-model="checked4">发文件</el-checkbox>
      <el-checkbox v-model="checked5">发朋友圈</el-checkbox>
    </el-form-item>
    <el-form-item label="动作执行次数" prop="refreshTimes">
      <el-input v-model.number="model.refreshTimes" :disabled="state" />
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
    <el-form-item :label="$t('parameter.sendVideoFileSelect')" prop="sendVideoFileSelect">
      <el-select v-model="model.sendVideoFileSelect" placeholder="请选择是否发送视频文件" style="width:500px" :disabled="state">
        <el-option
          v-for="item in sendVideoFileSelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('parameter.sendFileTimeout')" prop="sendFileTimeout">
      <el-input v-model.number="model.sendFileTimeout" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { sendFileTimeoutCheck, refreshTimesCheck, selectActionCheck, sendImgQualityCheck, calledNameCheck, businessNameCheck, testIntervalsCheck, testTimesCheck, sendWeChatVoiceSecondsCheck, sendWeChatVideoSecondsCheck, tencentNewsTimeoutCheck, sendTextCheck } from '../../../../utils/WeTestForm'

export default {
  name: 'WeChat',
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
        refreshTimes: [{
          validator: refreshTimesCheck, // 自定义验证
          trigger: 'blur'
        }],
        sendFileTimeout: [{
          validator: sendFileTimeoutCheck, // 自定义验证
          trigger: 'blur'
        }],
        selectActionList: [{
          validator: selectActionCheck, // 自定义验证
          trigger: 'change'
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
        sendImgQuality: [{
          validator: sendImgQualityCheck,
          trigger: 'change'
        }],
        sendVoiceSeconds: [{
          validator: sendWeChatVoiceSecondsCheck, // 自定义验证
          trigger: 'blur'
        }],
        sendVideoSeconds: [{
          validator: sendWeChatVideoSecondsCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      business: '微信',
      checked0: false,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      temp: {
        name: '',
        select: true,
        task: 'ott_basic',
        taskName: 'WeChat',
        sendText: 'how are you!',
        sendImgQuality: 1,
        sendVideoSeconds: 8,
        sendVoiceSeconds: 8,
        testTimes: 1,
        sendFileTimeout: 70,
        selectActionList: [],
        selectAction: '000000',
        refreshTimes: 10,
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
        this.getSelectAction()
      }
    },
    // str:原始字符串，index,开始位置,changeStr，改变后的字
    changeStr(str, index, changeStr) {
      return str.substr(0, index) + changeStr + str.substr(index + changeStr.length)
    },
    getSelectAction() {
      this.model.selectActionList = []
      if (this.model.selectAction.charAt(0) === '1') {
        this.checked0 = true
      }
      if (this.model.selectAction.charAt(1) === '1') {
        this.checked1 = true
      }
      if (this.model.selectAction.charAt(2) === '1') {
        this.checked2 = true
      }
      if (this.model.selectAction.charAt(3) === '1') {
        this.checked3 = true
      }
      if (this.model.selectAction.charAt(4) === '1') {
        this.checked4 = true
      }
      if (this.model.selectAction.charAt(5) === '1') {
        this.checked5 = true
      }
      console.log(this.model.selectActionList)
    },
    x() {
      this.model.selectActionList = JSON.parse(JSON.stringify(this.model.selectActionList))
      console.log(this.model.selectActionList)
    },
    submitForm() {
      this.model.selectAction = '000000'
      const data = [0, 0, 0, 0, 0, 0]
      if (this.checked0 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 0, '1')
        data[0] = 1
      }
      if (this.checked1 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 1, '1')
        data[1] = 1
      }
      if (this.checked2 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 2, '1')
        data[2] = 1
      }
      if (this.checked3 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 3, '1')
        data[3] = 1
      }
      if (this.checked4 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 4, '1')
        data[4] = 1
      }
      if (this.checked5 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 5, '1')
        data[5] = 1
      }
      let num = 0
      for (const i in data) {
        num = num + data[i]
      }
      if (num === 6 || num === 1) {
        return this.$refs.dataForm.validate()
      } else {
        this.$alert('选择动作仅支持单选或全选', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$emit('update:isdisable', false)
          }
        })
        return false
      }
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
