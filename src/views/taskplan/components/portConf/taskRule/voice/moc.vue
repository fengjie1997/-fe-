<template>
  <el-collapse v-model="active" class="form-collapse">
    <el-collapse-item name="1">
      <template slot="title"><el-divider>{{ title }}</el-divider></template>
      <form-create v-model="modelForm" :rule="rule" :option="option" @duration-change="change" @gi-change="testChange" @mos-algorithm-change="change" @test-type-change="change" @mos-test-change="change" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import i18n from '@/lang'
import { mapState } from 'vuex'
import { commonOptions } from '../common/common'
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
    },
    ...mapState({
      modemPort: state => state.testPlan.modemPort,
      portNumberList: state => state.testPlan.portNumberList
    })
  },
  watch: {
  },
  created() {
    this.$nextTick(() => {
      console.log(this)
      for (const i in this.portNumberList) {
        if (this.portNumberList[i].value === this.modemPort) {
          this.portNumberList[i].disabled = true
        }
      }
      this.modelForm.updateRule('mtcDevicePort', {
        options: this.portNumberList
      })
    })
  },
  methods: {
    testChange() {
      console.log('change')
    },
    change() {
      this.$emit('getDuration', this.modelForm.getValue('duration'))
      if (this.rule[0].value === 'Mobile to Mobile Sync') {
        this.modelForm.disabled(false, 'mtcDevicePort')
      } else {
        this.modelForm.disabled(true, 'mtcDevicePort')
      }
      if (this.rule[5].value === true) {
        this.modelForm.disabled(false, 'mosAlgorithm')
        this.modelForm.disabled(false, 'lowMosThreshold')
      } else {
        this.modelForm.disabled(true, 'mosAlgorithm')
        this.modelForm.disabled(true, 'lowMosThreshold')
      }
      if (this.rule[6].value === 'POLQA') {
        this.modelForm.disabled(false, 'sampleType')
        this.modelForm.disabled(false, 'calcMode')
      } else {
        this.modelForm.disabled(true, 'sampleType')
        this.modelForm.disabled(true, 'calcMode')
      }
    }
  }
}
</script>
