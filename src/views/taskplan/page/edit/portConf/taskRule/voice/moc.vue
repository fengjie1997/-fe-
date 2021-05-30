<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <form-create v-model="modelForm" :rule="rule" :option="option" @gi-change="testChange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { commonOptions } from '../../common/common'
export default {
  name: 'MocForm',
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
      active: ['1'],
      title: i18n.t('taskPlan.voice.mosTest'),
      modelForm: {},
      option: commonOptions
    }
  },
  computed: {
    formData() {
      return this.modelForm.formData()
    }
  },
  watch: {

  },
  methods: {
    testChange() {
      console.log('changee')
    }
  }
}
</script>
