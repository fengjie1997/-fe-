<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">
        <h4 class="form-title">基本信息</h4>
      </template>
      <!-- top form section -->
      <form-create ref="fcTop" v-model="topForm" :rule="topRule" :option="topOption" @sct-change="handleRecurrenctType" @picker-change="handlePickerDate" />
      <!-- time form section -->
      <form-create ref="fcTest" v-model="testForm" :rule="testRule" :option="testOption" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <h4 class="form-title">数据传输设置</h4>
      </template>
      <form-create ref="fcTransfer" v-model="transferForm" :rule="transferRule" :option="transferOption" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <h4 class="form-title">MODEM端口SIM卡信息设置</h4>
      </template>
      <form-create ref="fcModem" v-model="modemForm" :rule="modemRule" :option="modemOption" />
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <h4 class="form-title">高级设置</h4>
      </template>
      <el-collapse v-model="activeName">
        <el-collapse-item name="1">
          <template slot="title">
            <h4 class="ele-form-title">文件分割</h4>
          </template>
          <form-create ref="fcDocSparate" v-model="docSparateForm" :rule="docSparateRule" :option="docSparateOption" @sst-change="handleSwitchDocSparate" />
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h4 class="ele-form-title">文件保存</h4>
          </template>
          <form-create ref="fcDocSave" v-model="docSaveForm" :rule="docSaveRule" :option="docSaveOption" />
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h4 class="ele-form-title">文件上传</h4>
          </template>
          <form-create ref="fcDocUpload" v-model="docUploadForm" :rule="docUploadRule" :option="docUploadOption" />
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h4 class="ele-form-title">区域控制</h4>
          </template>
          <form-create ref="fcAreaControl" v-model="areaControlForm" :rule="areaControlRule" :option="areaControlOption" />
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h4 class="ele-form-title">车速控制</h4>
          </template>
          <form-create ref="fcSpeedControl" v-model="speedControlForm" :rule="speedControlRule" :option="speedControlOption" />
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h4 class="ele-form-title">其他设置</h4>
          </template>
          <form-create ref="fcOther" v-model="otherForm" :rule="otherRule" :option="otherOption" @on-submit="onSubmit" />
        </el-collapse-item>
      </el-collapse>
    </el-collapse-item>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="2">
        <el-button type="primary" size="medium" icon="el-icon-check">保存</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-link">应用到</el-button>
      </el-col>
    </el-row>
  </el-collapse>
</template>

<script>
import { getTimeZone } from '@/utils/timeZone.js'
import { topFormRule, testFormRule, weekRule, multipleRule, customizeRule, customizePickerRule, transferFormRule, modemFormRule, highSettingFormRule } from './form.js'
export default {
  name: 'TemplateForm',
  data() {
    return {
      // collapse
      activeName: ['1', '2', '3', '4', '5', '6'],
      activeNames: ['1', '2', '3', '4'],
      // topForm
      topForm: {},
      topRule: topFormRule,
      topOption: {
        submitBtn: false
      },
      // testForm
      testForm: {},
      testRule: testFormRule,
      testOption: {
        submitBtn: false
      },
      // transferForm
      transferForm: {},
      transferRule: transferFormRule,
      transferOption: {
        submitBtn: false
      },
      // transferForm
      modemForm: {},
      modemRule: modemFormRule,
      modemOption: {
        submitBtn: false
      },
      // docSparateForm
      docSparateForm: {},
      docSparateRule: highSettingFormRule[0],
      docSparateOption: {
        submitBtn: false
      },
      // doeSaveForm
      docSaveForm: {},
      docSaveRule: highSettingFormRule[1],
      docSaveOption: {
        submitBtn: false
      },
      // doeSaveForm
      docUploadForm: {},
      docUploadRule: highSettingFormRule[2],
      docUploadOption: {
        submitBtn: false
      },
      // areaControl
      areaControlForm: {},
      areaControlRule: highSettingFormRule[3],
      areaControlOption: {
        submitBtn: false
      },
      // areaControl
      speedControlForm: {},
      speedControlRule: highSettingFormRule[4],
      speedControlOption: {
        submitBtn: false
      },
      // other
      otherForm: {},
      otherRule: highSettingFormRule[5],
      otherOption: {
        submitBtn: false
      }
    }
  },
  mounted() {
    // 初始化开始时间
    this.testRule[0].value = getTimeZone(this.$store.state.user.timezone)
  },
  methods: {
    // 执行周期
    handleRecurrenctType(type) {
      switch (type) {
        case '0': // always
          this.clearForm()
          break
        case '1': // every week
          this.clearForm()

          this.topRule.push(weekRule)
          break
        case '2': // multiple baseMultipleForm
          this.clearForm()
          this.topRule.push(multipleRule)
          break
        case '3': // customize datepicker
          this.clearForm()
          this.testForm.hidden(true, ['startTime', 'endTime'])
          this.topRule.push(customizePickerRule)
          this.topRule.push(customizeRule)
          break
        default: // everyday
      }
    },
    // 选择日期
    handlePickerDate(date) {
      // 清除
      this.topForm.setValue({ PickDate: '' })
      // 拷贝已选日期
      const customizeDays = this.topForm.getValue('customize').splice(0)
      // 日期是否已选
      const temp = new Set(customizeDays)
      const hasDateStr = temp.has(JSON.stringify(date).replace(/\"/g, ''))
      if (!hasDateStr) {
        customizeDays.push(JSON.stringify(date).replace(/\"/g, ''))
        this.topForm.setValue({ customize: customizeDays })
      }
    },
    handleSwitchDocSparate(type) {
      console.log(typeof type)
      if (type === '1') {
        this.docSparateForm.setValue('intDocSparate', 10)
      } else {
        this.docSparateForm.setValue('intDocSparate', 60)
      }
    },
    // 初始化表单
    clearForm() {
      this.topForm.removeField('weektype')
      this.topForm.removeField('inputNumber')
      this.topForm.removeField('customize')
      this.topForm.removeField('PickDate')
      this.testForm.hidden(false, ['startTime', 'endTime'])
    },
    onSubmit(formData) {
      console.log(formData)
    }
  }

}
</script>
<style scoped>
.el-collapse-item{
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0px 7px 7px -7px #5E5E5E;
}
.form-title{
  color: #5E5E5E;
  margin-left: 15px;
}
.ele-form-title{
  color: #888888;
  font-size: 0.6em;
  margin-left: 15px;
}
</style>
<style scoped>
.el-form-item__label{
  font-size: 0.8em;
  color: #5e5e5e;
  font-weight: 550;
  padding-left: 12px;
}
.toolbar-collapse{
  width:100%;
  height:30px;
  position: relative;
  position:fixed;
}
.row-bg{
  padding: 15px 0;
}
</style>
