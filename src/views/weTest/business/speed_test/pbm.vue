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
    <el-form-item :label="$t('parameter.testDuration')" prop="testDuration">
      <el-input v-model.number="model.testDuration" :disabled="state" />
    </el-form-item>
    <el-form-item label="ip地址" prop="hostipStr">
      <el-input v-model="model.hostipStr" :disabled="state" />
    </el-form-item>
    <el-form-item :label="$t('parameter.port')" prop="portStr">
      <el-input v-model="model.portStr" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { portStrCheck, businessNameCheck, testIntervalsCheck, testTimesCheck, testDurationCheck, UrlCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'PBM',
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
          validator: businessNameCheck, // 自定义验证
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
        testDuration: [{
          validator: testDurationCheck, // 自定义验证
          trigger: 'blur'
        }],
        hostipStr: [{
          validator: UrlCheck, // 自定义验证
          trigger: 'blur'
        }],
        portStr: [{
          validator: portStrCheck, // 自定义验证
          trigger: 'blur'
        }]
      },
      temp: {
        name: '',
        task: 'pbm',
        select: true,
        taskName: 'PBM',
        testTimes: 1,
        timeout: 60,
        testIntervalS: 10,
        testDuration: 20,
        hostipStr: '116.6.50.82',
        portStr: '15502'
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
