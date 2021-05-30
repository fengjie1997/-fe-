<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <form-create v-model="modelForm" :rule="rule" :option="option" @other-custom-time-change="change" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import i18n from '@/lang'
import { commonOptions } from '@/views/taskplan/components/portConf/taskRule/common/common'
export default {
  name: 'FixForm',
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
      title: i18n.t('taskPlan.title.timeSetting'),
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
  created() {
    console.log(this)
  },
  methods: {
    change() {
      if (this.formData['otherCustomTime'] === 2) {
        // 固定时长: 任务持续时长 间隔时长
        this.modelForm.hidden(true, 'taskDuration')
        this.modelForm.hidden(true, 'interval')
        // 时间窗时长: 任务持续时长 时间窗大小 保护时长
        this.modelForm.hidden(true, 'duration')
        this.modelForm.hidden(true, 'guardDuration')
        this.modelForm.hidden(true, 'windowSize')
        this.modelForm.hidden(true, 'accessTime')
        // 随机时长设置
        this.modelForm.hidden(false, 'randomTimeSection')
      } else if (this.formData['otherCustomTime'] === 1) {
        this.modelForm.hidden(true, 'taskDuration')
        this.modelForm.hidden(true, 'interval')
        this.modelForm.hidden(false, 'duration')
        this.modelForm.hidden(false, 'guardDuration')
        this.modelForm.hidden(false, 'windowSize')
        this.modelForm.hidden(false, 'accessTime')
        this.modelForm.hidden(true, 'randomTimeSection')
      } else {
        this.modelForm.hidden(true, 'taskDuration')
        this.modelForm.hidden(false, 'interval')
        this.modelForm.hidden(true, 'duration')
        this.modelForm.hidden(true, 'guardDuration')
        this.modelForm.hidden(true, 'windowSize')
        this.modelForm.hidden(true, 'accessTime')
        this.modelForm.hidden(true, 'randomTimeSection')
      }
    }
    // testChange() {
    //   console.log('change')
    // },
    // change() {
    //   console.log(this.rule)
    //   if (this.rule[0].value === 'Mobile to Mobile Sync') {
    //     this.modelForm.disabled(false, 'mtcDevicePort')
    //   } else {
    //     this.modelForm.disabled(true, 'mtcDevicePort')
    //   }
    //   if (this.rule[5].value === true) {
    //     this.modelForm.disabled(false, 'mosAlgorithm')
    //     this.modelForm.disabled(false, 'lowMosThreshold')
    //   } else {
    //     this.modelForm.disabled(true, 'mosAlgorithm')
    //     this.modelForm.disabled(true, 'lowMosThreshold')
    //   }
    //   if (this.rule[6].value === 'POLQA') {
    //     this.modelForm.disabled(false, 'sampleType')
    //     this.modelForm.disabled(false, 'calcMode')
    //   } else {
    //     this.modelForm.disabled(true, 'sampleType')
    //     this.modelForm.disabled(true, 'calcMode')
    //   }
    // }
  }
}
</script>
