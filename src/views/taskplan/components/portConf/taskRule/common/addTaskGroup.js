import Vue from 'vue'
import store from '@/store/index.js'
import { Notification } from 'element-ui'
import { addTaskGroup } from '@/api/device/testPlanList.js'
var taskGroupForm = {
  name: 'taskGroup',
  title: '创建任务组',
  model: {},
  rule: [
    {
      type: 'input',
      field: 'groupName',
      title: '任务组名称',
      value: '00:00-23:59',
      props: { placeholder: '请输入任务组名称' },
      col: { span: 13, xs: 24 }
    },
    {
      type: 'switch',
      title: '同时段时间窗同步',
      field: 'allModuleSync',
      value: 1,
      props: {
        activeValue: 1,
        inactiveValue: 0
      },
      col: { span: 12, xs: 24 }
    },
    {
      type: 'switch',
      title: 'buildOnlyOnePpp',
      field: 'buildOnlyOnePpp',
      value: 0,
      props: {
        activeValue: 1,
        inactiveValue: 0
      },
      col: { span: 12, xs: 24 }
    },
    {
      type: 'InputNumber',
      field: 'interval',
      title: '时间间隔(ms)',
      value: 1500,
      props: { min: 0 },
      col: { span: 12, xs: 24 }
    },
    {
      type: 'InputNumber',
      field: 'groupRepeatCount',
      title: '循环次数',
      value: 9999,
      props: { min: 0 },
      col: { span: 12, xs: 24 }
    },
    {
      type: 'template',
      field: 'taskExecuteDurations',
      title: '时间段',
      col: { span: 24, xs: 24 },
      template: '<el-row><el-col :span="5"><el-time-select v-model="startTime" placeholder="开始时间" :picker-options="{ start: \'00:00\', step: \'00:01\', end: \'23:59\' }" /></el-col><el-col :span="5"><el-time-select v-model="endTime" placeholder="结束时间" :picker-options="{ start: \'00:00\', step: \'00:01\', end: \'23:59\', minTime: startTime }" /></el-col><el-col :span="5"> <el-button type="primary" @click="addTime()" >添加时段</el-button> </el-col> <el-col :span="24"><el-tag v-for="(item, idx) in taskExecuteDurations" :key="idx" closable @close="handleClose(idx)" style="margin-right:5px">{{item.startTime}} - {{item.duration}}</el-tag></el-col> </el-row>',
      vm: new Vue({
        data: {
          time: '',
          startTime: '00:00',
          endTime: '23:59',
          taskExecuteDurations: []
        },
        methods: {
          addTime() {
            if (this.endTime === null || this.startTime === null) {
              Notification.error({
                title: '错误',
                message: '时间不能为空'
              })
              return false
            }
            if (this.taskExecuteDurations.length > 0) {
              // 时间段冲突验证
              this.taskExecuteDurations.forEach(item => {
                console.log(parseFloat(this.startTime.replace(':', '.')))
                console.log(parseFloat(item.duration.replace(':', '.')))
                console.log(parseFloat(this.startTime.replace(':', '.')) < parseFloat(item.duration.replace(':', '.')))
                if (parseFloat(this.startTime.replace(':', '.')) < parseFloat(item.duration.replace(':', '.'))) {
                  Notification.error({
                    title: '错误',
                    message: '时间段不能冲突'
                  })
                  return false
                } else {
                  this.handleAddTime()
                }
              })
            } else {
              this.handleAddTime()
            }
          },
          handleAddTime() {
            this.taskExecuteDurations.push({
              duration: this.endTime,
              startTime: this.startTime
            })
            this.startTime = this.endTime
            this.endTime = null
          },
          handleClose(tag) {
            this.taskExecuteDurations.splice(this.taskExecuteDurations.indexOf(tag), 1)
          }
        }
      })
    },
    {
      type: 'hidden',
      field: 'groupSequence',
      value: 1
    },
    {
      type: 'hidden',
      field: 'isCheck',
      value: true
    }

  ],
  option: {
    submitBtn: {
      type: 'primary',
      size: 'md',
      icon: '',
      shape: 'round',
      innerText: '确认提交',
      col: {
        span: 4,
        offset: 2
      }
    },
    onSubmit: (formData, form) => {
      // 添加时间段
      const modelData = Object.assign({}, formData)
      form.rule.forEach(item => {
        if (item.field === 'taskExecuteDurations') {
          modelData.taskExecuteDurations = item.vm.taskExecuteDurations // Object.assign([], item.vm.taskExecuteDurations)
        }
      })
      console.log(modelData)
      addTaskGroup(store.state.testPlan.schemaId, Object.assign({}, modelData)).then(res => {
        store.dispatch('setTaskGroupId', res.data.data.taskGroupId)
      })
    },
    form: {
      inline: false,
      labelPosition: 'right',
      labelSuffix: undefined,
      hideRequiredAsterisk: false,
      labelWidth: '180px',
      showMessage: true,
      inlineMessage: false,
      statusIcon: false,
      validateOnRuleChange: true,
      disabled: false,
      size: 'small'
    },
    row: {
      gutter: 5
    }
  }
}
export { taskGroupForm }
