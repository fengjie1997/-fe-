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
      title: 'Http Page 测试配置',
      modelForm: {},
      option: commonOptions
    }
  },
  computed: {
    formData() {
      var data = this.modelForm.formData()
      this.rule.forEach(item => {
        if (item.field === 'proxySetting') {
          data.proxySetting = item.vm.modelForm.formData()
        }
        if (item.field === 'urlList') {
          data.urlList = item.vm.list
        }
      })
      return data
    }
  },
  methods: {
    setForm(data) {
      this.data = data
      this.modelForm.setValue(data)
      this.rule.forEach(item => {
        if (item.field === 'proxySetting') {
          item.vm.formData = data.proxySetting
          item.vm.modelForm.setValue(data.proxySetting)
        }
        if (item.field === 'urlList') {
          item.vm.list = data.urlList
        }
      })
    }
  }
}
</script>
