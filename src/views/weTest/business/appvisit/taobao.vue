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
    <el-form-item :label="$t('parameter.selectAction')" prop="selectAction">
      <el-checkbox v-model="checked0">刷新一级目录</el-checkbox>
      <el-checkbox v-model="checked1">打开二级目录</el-checkbox>
    </el-form-item>
    <el-form-item :label="$t('parameter.refreshTimes')" prop="refreshTimes">
      <el-input v-model.number="model.refreshTimes" :disabled="state" />
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves'
import { businessNameCheck, refreshTimesCheck, selectActionCheck, testIntervalsCheck, testTimesCheck, tencentNewsTimeoutCheck } from '../../../../utils/WeTestForm'
export default {
  name: 'TaoBao',
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      business: '淘宝',
      state: false,
      checked0: false,
      checked1: false,
      temp: {
        business: '淘宝',
        name: '',
        task: 'app_visit',
        select: true,
        taskName: 'Taobao',
        refreshTimes: 10,
        selectActionList: [],
        selectAction: '00',
        timeout: 30,
        testTimes: 1,
        testIntervalS: 10
      },
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
        selectActionList: [{
          validator: selectActionCheck, // 自定义验证
          trigger: 'change'
        }],
        timeout: [{
          validator: tencentNewsTimeoutCheck, // 自定义验证
          trigger: 'blur'
        }],
        testIntervalS: [{
          validator: testIntervalsCheck, // 自定义验证
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
      if (this.model.selectAction.charAt(0) === '1') {
        this.checked0 = true
      }
      if (this.model.selectAction.charAt(1) === '1') {
        this.checked1 = true
      }
    },
    submitForm() {
      this.model.selectAction = '00'
      const data = [0, 0]
      if (this.checked0 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 0, '1')
        data[0] = 1
      }
      if (this.checked1 === true) {
        this.model.selectAction = this.changeStr(this.model.selectAction, 1, '1')
        data[1] = 1
      }
      const num = data[0] + data[1]
      if (num === 2 || num === 1) {
        return this.$refs.dataForm.validate()
      } else {
        this.$alert('选择动作仅支持单选或全选', '提示', {
          confirmButtonText: '确定',
          callback: action => {
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
    float:left;padding-left:10px;
  }
</style>
