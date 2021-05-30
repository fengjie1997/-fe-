// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../common/common'
import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
const taskRule = [
  {
    type: 'InputNumber',
    field: 'duration',
    title: i18n.t('taskPlan.dataTransfer.duration'),
    value: 100,
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    },
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }
]
var taskDataTransfer =
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'dataTransferConfig',
    col: { span: 24, xs: 24 },
    template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
    vm: new Vue({
      data: {
        data: {},
        title: i18n.t('taskPlan.dataTransfer.title'),
        active: ['1'],
        modelForm: {},
        rule: taskRule,
        option: commonOptions
      },
      computed: {
        formData() {
          return this.modelForm.formData()
        }
      },
      watch: {
        data(newData) {
          this.modelForm.rule.forEach(item => {
            if (newData[item.field]) {
              if (item.parse) {
                this.modelForm.setValue(item.field, newData[item.field] / 1000)
              } else {
                this.modelForm.setValue(item.field, newData[item.field])
              }
            }
          })
        }
      }
    })
  }

export { taskDataTransfer }
