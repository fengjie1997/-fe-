// import store from '@/store/index.js'
// import { addTask } from '@/api/device/testPlanList.js'
// import { Notification } from 'element-ui'
const commonOptions = {
  submitBtn: false,
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
const SubmitOption = {
  // submitBtn: {
  //   type: 'primary',
  //   size: 'md',
  //   icon: 'el-icon-check',
  //   shape: 'round',
  //   innerText: '确认提交',
  //   col: {
  //     span: 4,
  //     offset: 2
  //   }
  // },
  submitBtn: false,
  form: {
    inline: false,
    labelPosition: 'right',
    labelSuffix: undefined,
    hideRequiredAsterisk: false,
    labelWidth: '180px',
    showMessage: true,
    inlineMessage: true,
    statusIcon: false,
    validateOnRuleChange: true,
    disabled: false,
    size: 'small'
  },
  row: {
    gutter: 6
  }
  // onSubmit: (formData, form) => {
  //   const modelData = Object.assign({}, formData)
  //   form.rule.forEach(item => {
  //     if (item.name === 'children') {
  //       modelData[item.field] = item.vm.modelForm.formData()
  //       // 遍历子节点1
  //       item.vm.rule.forEach(eleItem => {
  //         if (eleItem.name === 'children') {
  //           modelData[item.field][eleItem.field] = eleItem.vm.modelForm.formData()
  //           // 遍历子节点2
  //           eleItem.vm.rule.forEach(eleItems => {
  //             if (eleItems.name === 'childrenArray') {
  //               var arr = []
  //               var infoObj = {}
  //               arr.push(eleItems.vm.modelForm.formData())
  //               infoObj[eleItems.field] = arr
  //               modelData[item.field][eleItem.field] = infoObj
  //             }
  //           })
  //         }
  //         // array
  //         if (eleItem.name === 'childrenField') {
  //           modelData[item.field][eleItem.field] = eleItem.vm[eleItem.field]
  //         }
  //       })
  //     }
  //   })
  //   console.log(modelData)
  //   addTask(store.state.testPlan.taskGroupId, modelData, store.state.testPlan.taskId).then(res => {
  //     if (res.data.code === 1) {
  //       Notification.success({
  //         title: '成功',
  //         message: '创建任务成功'
  //       })
  //       store.dispatch('setTaskId', res.data.data.taskId)
  //     }
  //   })
  // }

}
export { commonOptions, SubmitOption }
