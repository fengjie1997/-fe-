<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <form-create v-model="modelForm" :rule="rule" :option="option" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { commonOptions } from '../../common/common'
export default {
  name: 'FtpDownForm',
  props: {
    rule: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      data: {},
      active: ['1'],
      title: i18n.t('taskPlan.ftpDownload.ftpDownload'),
      modelForm: {},
      option: commonOptions
    }
  },
  computed: {
    // ftp upload form data
    formData() {
      var data = this.modelForm.formData()
      this.rule.forEach(item => {
        if (item.field === 'ftpHostSetting') {
          data.ftpHostSetting = item.vm.modelForm.formData()
        }
      })
      return data
    }
  },
  methods: {
    // set value for form & ele form
    setForm(data) {
      this.data = data
      console.log(data)
      this.modelForm.setValue(data)
      this.rule.forEach(item => {
        if (item.field === 'ftpHostSetting') {
          item.vm.formData = data.ftpHostSetting
          item.vm.modelForm.setValue(data.ftpHostSetting)
        }
      })
    }
  }
}
</script>
