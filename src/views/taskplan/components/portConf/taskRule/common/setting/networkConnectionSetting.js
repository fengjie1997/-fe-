import Vue from 'vue'
import store from '@/store/index.js'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import { commonOption } from './commonOption.js'
import { wifiConnectionList } from './connection/wifiConnectionList'
import { createdConnectionList } from './connection/createdConnectionList'
import { selectedConnectionList } from './connection/selectedConnectionList'
import i18n from '@/lang'
import { getMillionSecond, getSecond } from '@/utils/timeZone'
// import { fetchTemplateList } from '@/api/testPlan/template'

// function getTemplateOptions() {
//   const templateOptions = []
//   fetchTemplateList().then(res => {
//     const data = res.data
//     if (data.code === 1) {
//       for (const i in data.data.records) {
//         templateOptions[i] = {}
//         templateOptions[i]['label'] = data.data.records[i].name
//         templateOptions[i]['value'] = data.data.records[i].name
//       }
//       // data.data.records.forEach(item => {
//       //   templateOptions.push({
//       //     label: item.name,
//       //     value: item.name
//       //   })
//       // })
//     }
//   })
//   console.log(templateOptions)
//   return templateOptions
// }
const networkConnectionSetting = [
  // 网络设置的模板select
  {
    type: 'select',
    field: 'templateSelect',
    title: i18n.t('route.template'),
    value: '',
    options: '',
    col: {
      span: 8,
      xs: 24
    },
    emit: ['change']
  },
  // 网络设置的模板button
  {
    type: 'el-button',
    field: 'templateButton',
    children: [i18n.t('route.template')],
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    emit: ['click']
  },
  // 拨号创建方式(老平台: 连接类型)
  {
    type: 'select',
    field: 'connectionType',
    title: i18n.t('taskPlan.form.connectionType'),
    value: getDictByLanguage('ConnectionProtocol')[0].value,
    options: getDictByLanguage('ConnectionProtocol'),
    col: {
      span: 24,
      xs: 24
    },
    emit: ['change']
  },
  // 实际是createConnectionList下节点 RAS号码
  {
    type: 'input',
    field: 'rasNumber',
    title: i18n.t('taskPlan.label.rasNumber'),
    value: '*99#',
    col: {
      span: 12,
      xs: 24
    },
    validate: [{
      required: true,
      message: i18n.t('taskPlan.message.notNull'),
      trigger: 'blur'
    }]
  },
  // 实际是createConnectionList下节点 APN
  {
    type: 'input',
    field: 'apn',
    title: 'APN',
    value: 'cmnet',
    col: {
      span: 12,
      xs: 24
    }
  },
  // 实际是createConnectionList下节点 用户名
  {
    type: 'input',
    field: 'username',
    title: 'username',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  // 实际是createConnectionList下节点 密码
  {
    type: 'input',
    field: 'password',
    title: 'password',
    value: '',
    col: {
      span: 12,
      xs: 24
    },
    props: {
      type: 'password'
    }
  },
  // 单次拨号超时
  {
    type: 'InputNumber',
    field: 'singleTimeout',
    title: i18n.t('taskPlan.form.singleTimeout'),
    value: 60,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    },
    parse: (value) => {
      return getMillionSecond(value)
    },
    reverseParse: (value) => {
      return getSecond(value)
    }
  },
  // 重拨次数
  {
    type: 'InputNumber',
    field: 'reconnectCount',
    title: i18n.t('taskPlan.form.reconnectCount'),
    value: 3,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  // 拨号断开策略
  {
    type: 'select',
    field: 'connectionDisconnectStrategy',
    title: i18n.t('taskPlan.form.connectionDisconnectStrategy'),
    value: getDictByLanguage('ConnectionDisconnectStrategy')[0].value,
    options: getDictByLanguage('ConnectionDisconnectStrategy'),
    col: {
      span: 12,
      xs: 12
    }
  },
  // 上行请求速率
  {
    type: 'select',
    field: 'ulueRate',
    title: i18n.t('taskPlan.label.uplinkRequestRate'),
    value: getDictByLanguage('requestRate')[0].value,
    options: getDictByLanguage('requestRate'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // 下行请求速率
  {
    type: 'select',
    field: 'dlueRate',
    title: i18n.t('taskPlan.label.dwonlinkRequestRate'),
    value: getDictByLanguage('requestRate')[0].value,
    options: getDictByLanguage('requestRate'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // IP类型
  {
    type: 'select',
    field: 'ipType',
    title: i18n.t('taskPlan.label.IPType'),
    value: getDictByLanguage('IpType')[0].value,
    options: getDictByLanguage('IpType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  /**
   *  WLAN时显示字段
   */
  // 登录方式
  {
    type: 'select',
    field: 'loginType',
    title: i18n.t('taskPlan.label.loginType'),
    value: getDictByLanguage('LoginType')[0].value,
    options: getDictByLanguage('LoginType'),
    col: {
      span: 12,
      xs: 12
    },
    emit: ['change']
  },
  // 运营商
  {
    type: 'select',
    field: 'operator',
    title: i18n.t('analyze.label.operator'),
    value: getDictByLanguage('Operator')[0].value,
    options: getDictByLanguage('Operator'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // AP
  {
    type: 'input',
    field: 'apnName',
    title: 'AP',
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  // 加密方式
  {
    type: 'select',
    field: 'encryptType',
    title: i18n.t('taskPlan.label.encryptType'),
    value: 'AutoScan',
    options: [{ label: 'AutoScan', value: 'AutoScan' }, { label: 'Open', value: 'Open' }, { label: 'WEP', value: 'WEP' }, { label: 'WPA', value: 'WPA' }, { label: 'WPA2', value: 'WPA2' }, { label: 'WPA&WPA2', value: 'WPA&WPA2' }],
    col: {
      span: 12,
      xs: 24
    }
  },
  // 频段
  {
    type: 'select',
    field: 'band',
    title: i18n.t('baseData.bands'),
    value: getDictByLanguage('Band')[0].value,
    options: getDictByLanguage('Band'),
    col: {
      span: 12,
      xs: 24
    }
  },
  // 本节点value始终为true
  {
    type: 'hidden',
    title: i18n.t('taskPlan.label.enable'),
    field: 'isAvailable',
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
  // connectionType为WLAN时, 本节点为true
  {
    type: 'hidden',
    title: i18n.t('taskPlan.label.enableWIFI'),
    field: 'connectionUseWifi',
    value: false,
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
    type: 'hidden',
    title: i18n.t('taskPlan.form.detachStrategy'),
    field: 'detachStrategy',
    value: false,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      activeValue: 'true',
      inactiveValue: 'false',
      slot: {
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  // { ConnectionType
  //   type: 'select',
  //   field: 'connectionProtocol',
  //   title: '拨号连接的协议类型',
  //   value: getDictByTagName('ConnectionProtocol')[0].value,
  //   options: getDictByTagName('ConnectionProtocol'),
  //   col: {
  //     span: 12,
  //     xs: 12
  //   }
  // },
  // {
  //   type: 'switch',
  //   title: 'Detach策略',
  //   field: 'detachStrategy',
  //   value: false,
  //   col: {
  //     span: 12,
  //     xs: 24
  //   },
  //   props: {
  //     'trueValue': true,
  //     'falseValue': false,
  //     slot: {
  //       open: i18n.t('taskPlan.label.true'),
  //       close: i18n.t('taskPlan.label.false')
  //     }
  //   }
  // },
  // {
  //   type: 'select',
  //   field: 'detachStrategy',
  //   title: 'Detach策略',
  //   value: getDictByTagName('DetachStrategy')[0].value,
  //   options: getDictByTagName('DetachStrategy'),
  //   col: {
  //     span: 8,
  //     xs: 12
  //   }
  // },
  {
    type: 'hidden',
    field: 'totalTimeout',
    title: i18n.t('taskPlan.form.totalTimeout'),
    value: 10,
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
  },
  {
    type: 'hidden',
    field: 'port',
    title: i18n.t('taskPlan.form.port'),
    value: 1,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'hidden',
    title: i18n.t('taskPlan.form.discontEveryTime'),
    field: 'discontEveryTime',
    value: false,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      activeValue: 'true',
      inactiveValue: 'false',
      slot: {
        open: i18n.t('taskPlan.label.true'),
        close: i18n.t('taskPlan.label.false')
      }
    }
  },
  {
    type: 'hidden',
    field: 'modemFriendName',
    title: i18n.t('taskPlan.form.modemFriendName'),
    value: '',
    col: {
      span: 12,
      xs: 24
    }
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'wifiConnectionList',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" style="display: none" @ /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: wifiConnectionList,
        option: commonOption
      }})
  },
  // selectedConnectionList
  {
    type: 'hidden',
    title: i18n.t('taskPlan.label.useSet'),
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
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'selectedConnectionList',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" style="display: none" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: selectedConnectionList,
        option: commonOption
      }})
  },
  {
    type: 'template',
    name: 'children',
    hasChildren: true,
    field: 'createdConnectionList',
    col: { span: 24, xs: 24 },
    template: '<form-create v-model="modelForm" :rule="rule" :option="option" style="display: none" />',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: createdConnectionList,
        option: commonOption
      }})
  }
]
// as rule
const networkConnectionSettingRule = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'networkConnectionSetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" @template-select-change="templateChange" @connection-type-change="change" @template-button-click="click" @login-type-change="change"/></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: i18n.t('taskPlan.label.networkConnectionSettings'),
      active: ['1'],
      modelForm: {},
      rule: networkConnectionSetting,
      option: commonOption
    },
    computed: {
      taskForm() {
        return store.state.testPlan.taskForm
      },
      formData() {
        var formData = this.modelForm.formData()
        this.rule.forEach(item => {
          if (item.field === 'createdConnectionList') {
            item.vm.rule.forEach(item2 => {
              if (item2.field === 'createdConnectionInfos') {
                var val = item2.vm.modelForm.formData()
                formData['createdConnectionList'] = { createdConnectionInfos: [val] }
              }
            })
          }
          if (item.field === 'selectedConnectionList') {
            item.vm.rule.forEach(item2 => {
              if (item2.field === 'currentConnectionInfos') {
                var val = item2.vm.modelForm.formData()
                formData['selectedConnectionList'] = { currentConnectionInfos: [val] }
              }
            })
          }
          if (item.field === 'wifiConnectionList') {
            item.vm.rule.forEach(item2 => {
              if (item2.field === 'wifiConnectionInfos') {
                var val = item2.vm.modelForm.formData()
                formData['wifiConnectionList'] = { wifiConnectionInfos: [val] }
              }
            })
          }
        })
        return formData
      }

    },
    watch: {
      taskForm(taskForm) {
        if (taskForm !== null) {
          // console.log(typeof this.modelForm.setValue())
        }
      },
      data(newData) {
        this.modelForm.rule.forEach(item => {
          if (newData[item.field]) {
            if (item.parse) {
              this.modelForm.setValue(item.field, newData[item.field] / 1000)
            } else {
              this.modelForm.setValue(item.field, newData[item.field])
            }
          }
          if (newData.connectionType === 'WLAN') {
            if (newData.wifiConnectionList.wifiConnectionInfos[0][item.field]) {
              this.modelForm.setValue(item.field, newData.wifiConnectionList.wifiConnectionInfos[0][item.field])
            }
          } else {
            if (newData.createdConnectionList.createdConnectionInfos[0][item.field]) {
              this.modelForm.setValue(item.field, newData.createdConnectionList.createdConnectionInfos[0][item.field])
            }
          }
        })
        // this.rule.forEach(item => {
        //   if (item.reverseParse) {
        //     newData[item.field] = item.reverseParse(newData[item.field])
        //   }
        // })
        // this.modelForm.setValue(newData)
        // this.rule.forEach(item => {
        //   if (item.field === 'createdConnectionList') {
        //     item.vm.rule.forEach(item2 => {
        //       if (item2.field === 'createdConnectionInfos') {
        //         item2.vm.modelForm.setValue(newData.createdConnectionList.createdConnectionInfos[0])
        //       }
        //     })
        //   }
        //   if (item.field === 'selectedConnectionList') {
        //     item.vm.rule.forEach(item2 => {
        //       if (item2.field === 'currentConnectionInfos') {
        //         item2.vm.modelForm.setValue(newData.selectedConnectionList.currentConnectionInfos[0])
        //       }
        //     })
        //   }
        //   if (item.field === 'wifiConnectionList') {
        //     item.vm.rule.forEach(item2 => {
        //       if (item2.field === 'wifiConnectionInfos') {
        //         item2.vm.modelForm.setValue(newData.wifiConnectionList.wifiConnectionInfos[0])
        //       }
        //     })
        //   }
        // })
        console.log(this)
      }
    },
    created() {
    },
    methods: {
      click() {
        // 测试模板按钮，触发测试计划配置的模板对话框
        this.$parentFC.click()
      },
      change() {
        if (this.modelForm.form.connectionType === 'WLAN') {
          this.modelForm.hidden(true, 'rasNumber')
          this.modelForm.hidden(true, 'apn')
          this.modelForm.hidden(true, 'singleTimeout')
          this.modelForm.hidden(true, 'reconnectCount')
          this.modelForm.hidden(true, 'ulueRate')
          this.modelForm.hidden(true, 'dlueRate')
          this.modelForm.hidden(true, 'ipType')
          this.modelForm.hidden(false, 'loginType')
          this.modelForm.hidden(false, 'operator')
          this.modelForm.hidden(false, 'encryptType')
          this.modelForm.hidden(false, 'band')
          this.modelForm.hidden(false, 'apnName')
          this.modelForm.setValue({ connectionUseWifi: true })
        } else {
          this.modelForm.hidden(false, 'rasNumber')
          this.modelForm.hidden(false, 'apn')
          this.modelForm.hidden(false, 'singleTimeout')
          this.modelForm.hidden(false, 'reconnectCount')
          this.modelForm.hidden(false, 'ulueRate')
          this.modelForm.hidden(false, 'dlueRate')
          this.modelForm.hidden(false, 'ipType')
          this.modelForm.hidden(true, 'loginType')
          this.modelForm.hidden(true, 'operator')
          this.modelForm.hidden(true, 'encryptType')
          this.modelForm.hidden(true, 'band')
          this.modelForm.hidden(true, 'apnName')
          this.modelForm.setValue({ connectionUseWifi: false })
        }
        if (this.modelForm.form.loginType === 'WebPage') {
          this.modelForm.disabled(false, 'operator')
        } else {
          this.modelForm.disabled(true, 'operator')
        }
        this.$parentFC.getNetworkTemplateOptions()
      },
      templateChange() {
        // 测试模板选择select，更新网络模板
        this.$parentFC.networkTemplateChange()
      }
    }
  })
}
export { networkConnectionSettingRule }
