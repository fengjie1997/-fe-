import Vue from 'vue'
import store from '@/store/index.js'
import { addTask } from '@/api/device/testPlanList.js'
import { Notification } from 'element-ui'
import { networkLockSetting } from '../public/networkLockSetting'
import { tcpipCaptureSetting } from '../public/tcpipCaptureSetting'
import { networkConnectionSetting } from '../public/networkConnectionSetting'
import { commonOptions } from '../public/common'
var modemTransferForm = {
  rule: [
    {
      type: 'template',
      col: { span: 24, xs: 24 },
      template: '<el-divider>{{ title }}</el-divider>',
      vm: new Vue({
        data: {
          title: '基本设置'
        }})
    },
    {
      type: 'switch',
      title: 'Is Check',
      field: 'isCheck',
      value: true,
      col: {
        span: 12,
        xs: 24
      },
      props: {
        'trueValue': true,
        'falseValue': false,
        slot: {
          open: i18n.t('taskPlan.label.true'),
          close: i18n.t('taskPlan.label.false')
        }
      }
    },
    {
      type: 'InputNumber',
      field: 'taskSequence',
      title: '执行顺序',
      value: 12,
      col: {
        span: 12,
        xs: 24
      },
      props: {
        min: 0
      },
      validate: [{
        required: true,
        message: '请填写任务次数',
        trigger: 'blur'
      }]
    },
    {
      type: 'template',
      col: { span: 24, xs: 24 },
      template: '<el-divider>{{ title }}</el-divider>',
      vm: new Vue({
        data: {
          title: '拨号连接设置'
        }})
    },
    {
      type: 'template',
      name: 'children',
      field: 'networkConnectionSetting',
      col: { span: 24, xs: 24 },
      template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
      vm: new Vue({
        data: {
          modelForm: {},
          rule: networkConnectionSetting,
          option: commonOptions
        }})
    },
    {
      type: 'template',
      col: { span: 24, xs: 24 },
      template: '<el-divider>{{ title }}</el-divider>',
      vm: new Vue({
        data: {
          title: '锁网设置'
        }})
    },
    {
      type: 'template',
      name: 'children',
      field: 'networkLockSetting',
      col: { span: 24, xs: 24 },
      template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
      vm: new Vue({
        data: {
          modelForm: {},
          rule: networkLockSetting,
          option: { submitBtn: false }
        }})
    },
    {
      type: 'template',
      col: { span: 24, xs: 24 },
      template: '<el-divider>{{ title }}</el-divider>',
      vm: new Vue({
        data: {
          title: 'TCP/IP 抓包设置'
        }})
    },
    {
      type: 'template',
      name: 'children',
      field: 'tcpipCaptureSetting',
      col: { span: 24, xs: 24 },
      template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
      vm: new Vue({
        data: {
          modelForm: {},
          rule: tcpipCaptureSetting,
          option: commonOptions
        }})
    }
  ],
  model: {},
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
      // console.log(form)
      const modelData = Object.assign({}, formData)
      modelData.taskName = 'Modem Transfer'
      modelData.taskType = 'Data Transfer'
      form.rule.forEach(item => {
        if (item.name === 'children') {
          modelData[item.field] = item.vm.modelForm.formData()
          // 遍历子节点1
          item.vm.rule.forEach(eleItem => {
            if (eleItem.name === 'children') {
              modelData[item.field][eleItem.field] = eleItem.vm.modelForm.formData()
              // 遍历子节点2
              eleItem.vm.rule.forEach(eleItems => {
                if (eleItems.name === 'childrenArray') {
                  const arr = []
                  const infoObj = {}
                  arr.push(eleItems.vm.modelForm.formData())
                  infoObj[eleItems.field] = arr
                  modelData[item.field][eleItem.field] = infoObj
                }
              })
            }
          })
        }
      })
      console.log(modelData)
      addTask(store.state.testPlan.taskGroupId, modelData).then(res => {
        if (res.data.code === 1) {
          Notification.success({
            title: '成功',
            message: '创建任务成功'
          })
          console.log(res.data)
          store.dispatch('setTaskId', res.data.data.taskId)
          // destroy
          form.resetFields()
        }
      })
    },
    form: {
      inline: false,
      labelPosition: 'right',
      labelSuffix: undefined,
      hideRequiredAsterisk: false,
      labelWidth: '165px',
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

export { modemTransferForm }
