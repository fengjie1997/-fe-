<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <form-create v-model="modelForm" :rule="rule" :option="option" @is-save-file-change="isSave" />
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import { commonOptions } from '../../common/common'
import i18n from '@/lang'
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
  created() {
    this.$nextTick(() => {
      this.isSave()
      console.log(this)
    })
  },
  methods: {
    clickHost() {
      this.$emit('hostClick')
    },
    changeHost() {
      this.$emit('hostChange')
    },
    isSave() {
      this.modelForm.rule.forEach(item => {
        if (item.field === 'isSaveFile') {
          if (item.value) {
            this.modelForm.disabled(false, 'saveDirectory')
          } else {
            this.modelForm.disabled(true, 'saveDirectory')
          }
        }
      })
    },
    change() {
      console.log(this)
      console.log(this.rule[8].vm.$refs.host.$children[0].$children[0].$children[1])
    },
    // set value for form & ele form
    setForm(data) {
      this.data = data
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
<style lang="less" scoped>
  .form-create .form-create .el-form-item {
    margin-bottom: 22px!important;
  }
  .form-create .form-collapse /deep/ .el-form-item{
    margin-bottom: 22px!important;
  }
</style>
