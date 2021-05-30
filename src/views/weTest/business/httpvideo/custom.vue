<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 650px; margin-left:50px;">
    <el-form-item :label="$t('weTest.businessType')" prop="taskName">
      <el-input v-model="business" disabled />
    </el-form-item>
    <el-form-item :label="$t('weTest.businessName')" prop="name">
      <el-input v-model="model.name" :disabled="state" @change="setTaskName" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testTimes')" prop="testTimes">
      <el-input v-model.number="model.testTimes" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testIntervalS')" prop="testIntervalS">
      <el-input v-model.number="model.testIntervalS" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.playSecondS')" prop="playSecondS">
      <el-input v-model.number="model.playSecondS" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.noFlowTimeoutS')" prop="noFlowTimeoutS">
      <el-input v-model.number="model.noFlowTimeoutS" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.bufferMaxTimes')" prop="bufferMaxTimes">
      <el-input v-model.number="model.bufferMaxTimes" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.bufferMaxTimeX')" prop="bufferMaxTimeX">
      <el-input v-model.number="model.bufferMaxTimeX" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.videoQuality')" prop="videoQuality">
      <el-select v-model="model.videoQuality" placeholder="请选择视频质量" style="width:500px" :disabled="state">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('parameter.videoUrl')" prop="videoUrl">
      <el-input v-model="model.videoUrl" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import {
  noFlowTimeoutSCheck,
  playSecondSCheck,
  businessNameCheck,
  testIntervalsCheck,
  testTimesCheck,
  testDurationCheck,
  bufferMaxTimesCheck, bufferMaxTimeXCheck, videoQualityCheck, videoUrlCheck
} from '../../../../utils/WeTestForm'
export default {
  name: 'CustomVideo',
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
      business: '自定义视频',
      options: [{ label: '高清', value: 1 }, { label: '超清', value: 2 }, { label: '720p', value: 3 }, { label: '1080p', value: 4 }],
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
        noFlowTimeoutS: [{
          validator: noFlowTimeoutSCheck,
          trigger: 'blur'
        }],
        bufferMaxTimes: [{
          validator: bufferMaxTimesCheck,
          trigger: 'blur'
        }],
        bufferMaxTimeX: [{
          validator: bufferMaxTimeXCheck,
          trigger: 'blur'
        }],
        videoQuality: [{
          validator: videoQualityCheck,
          trigger: 'change'
        }],
        videoUrl: [{
          validator: videoUrlCheck,
          trigger: 'blur'
        }]
      },
      temp: {
        name: '',
        task: 'http_video',
        select: true,
        taskName: '',
        testTimes: 1,
        testIntervalS: 10,
        playMode: 0,
        playSecondS: 10,
        videoQuality: '',
        videoUrl: '',
        noFlowTimeoutS: 10,
        bufferMaxTimes: 10,
        bufferMaxTimeX: 10
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
