<template>
  <el-form ref="dataForm" :model="model" :rules="rules" label-position="left" label-width="150px" style="width: 700px; margin-left:50px;">
    <el-form-item :label="$t('weTest.businessType')" prop="taskName">
      <el-input v-model="model.task" disabled />
    </el-form-item>
    <el-form-item label="任务名称" prop="name">
      <el-select
        v-model="model.name"
        filterable
        allow-create
        default-first-option
        placeholder="请选择测试网页或自定义输入"
        style="width: 550px"
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
    <el-form-item :label="$t('parameter.testTimes')" prop="testTimes">
      <el-input v-model.number="model.testTimes" />
    </el-form-item>
    <el-form-item :label="$t('parameter.testIntervalS')" prop="testIntervalS">
      <el-input v-model.number="model.testIntervalS" />
    </el-form-item>
    <el-form-item :label="$t('parameter.timeOut')" prop="timeout">
      <el-input v-model.number="model.timeout" />
    </el-form-item>

    <el-form-item :label="$t('parameter.videoUrl')" prop="httpWebUrl">
      <el-input v-model="model.httpWebUrl" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { getUrlSelect } from '../../../../utils/WeTestBusinessList'
import { httpWebCheck, timeoutCheck, testIntervalsCheck, testTimesCheck, videoUrlCheck } from '../../../../utils/WeTestForm'
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
      state: false,
      options: [{
        value: 'Baidu',
        label: '百度官网'
      }, {
        value: 'NetEase',
        label: '网易官网'
      }, {
        value: 'SOHU',
        label: '搜狐官网'
      }, {
        value: 'People_Network',
        label: '人民网'
      }, {
        value: 'CTRIP',
        label: '携程网'
      }, {
        value: 'JD',
        label: '京东商城'
      }, {
        value: 'Taobao',
        label: '淘宝官网'
      }, {
        value: 'Sina_Weibo',
        label: '新浪微博'
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
        task: [{
          validator: httpWebCheck,
          trigger: 'change'
        }],
        name: [{
          required: true,
          message: '请输入任务名称',
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
      }
    },
    getUrlAndTaskName() {
      this.model.httpWebUrl = getUrlSelect(this.model.name)
      if (this.model.httpWebUrl !== null) {
        this.state = true
      }
      this.model.name = ''
      // let bean = true
      // for (let i = 0; i < this.options.length; i++) {
      //   if (this.model.name === this.options[i].value) {
      //     bean = false
      //   }
      // }
      // if (bean) {
      //   this.model.taskName = '(HttpWeb)' + this.model.name
      // } else {
      //   this.model.taskName = 'Http_' + this.model.name
      // }
      // console.log(this.model)
    },
    getTaskName() {
      if (this.model.taskName === 'HttpWeb') {
        this.model.taskName = '(HttpWeb)' + this.model.name
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
