<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 650px; margin-left:50px;">
    <!--    <el-form-item :label="$t('weTest.businessType')">-->
    <!--      <el-input v-model="business" disabled />-->
    <!--    </el-form-item>-->
    <el-form-item label="测试网页" prop="taskName">
      <el-select
        v-model="model.taskName"
        placeholder="请选择测试网页"
        style="width: 500px"
        :disabled="state"
        @change="getUrlAndTaskName()"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('weTest.businessName')" prop="name">
      <el-input v-model="model.name" placeholder="请输入业务名称" :disabled="state" @change="getTaskName" />
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
    <el-form-item :label="$t('parameter.videoUrl')" prop="httpWebUrl">
      <el-input v-model="model.httpWebUrl" :disabled="urlState" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { getUrlSelect } from '../../../../utils/WeTestBusinessList'
import { httpWebCheck, timeoutCheck, testIntervalsCheck, testTimesCheck, videoUrlCheck, businessNameCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'HttpWeb',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      urlState: true,
      business: 'HTTP网页',
      state: false,
      taskName: '',
      options: [{
        value: 'Http_Baidu',
        label: '百度官网'
      }, {
        value: 'Http_NetEase',
        label: '网易官网'
      }, {
        value: 'Http_SOHU',
        label: '搜狐官网'
      }, {
        value: 'Http_People_Network',
        label: '人民网'
      }, {
        value: 'Http_CTRIP',
        label: '携程网'
      }, {
        value: 'Http_JD',
        label: '京东商城'
      }, {
        value: 'Http_Taobao',
        label: '淘宝官网'
      }, {
        value: 'Http_Sina_Weibo',
        label: '新浪微博'
      }, {
        value: 'HttpWeb',
        label: '自定义网页'
      }],
      temp: {
        name: '',
        task: 'http_web',
        select: true,
        taskName: '',
        timeout: 60,
        testTimes: 1,
        testIntervalS: 10,
        httpWebUrl: getUrlSelect(this.model.name)
      },
      rules: {
        taskName: [{
          validator: httpWebCheck,
          trigger: 'change'
        }],
        name: [{
          validator: businessNameCheck,
          trigger: 'blur'
        }],
        timeout: [{
          validator: timeoutCheck, // 自定义验证
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
        httpWebUrl: [{
          validator: videoUrlCheck, // 自定义验证
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
        for (const j in this.temp) {
          this.$set(this.model, j, this.temp[j])
        }
      } else {
        this.taskName = this.model.taskName
        this.state = this.model.state
      }
      if (this.model.taskName.slice(0, 7) === 'HttpWeb' || this.model.taskName.slice(1, 8) === 'HttpWeb') {
        this.urlState = false
      }
    },
    getUrlAndTaskName() {
      this.model.httpWebUrl = getUrlSelect(this.model.taskName)
      // this.urlState = this.model.httpWebUrl !== null
      // this.model.name = ''
      if (this.model.taskName === 'HttpWeb') {
        this.urlState = false
      } else {
        this.urlState = true
      }
      console.log(this.model)
      this.model.name = ''
    },
    getTaskName() {
      console.log(this.model.taskName.slice(0, 6))
      if (this.model.taskName.slice(0, 7) === 'HttpWeb' || this.model.taskName.slice(1, 8) === 'HttpWeb') {
        this.model.taskName = '(HttpWeb)' + this.model.name
      }
      console.log(this.model)
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
