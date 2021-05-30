import Vue from 'vue'
import i18n from '@/lang'
import { commonOptions } from '../common'
import { wifiConnectionList } from './listWifi'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
const networkConnectionSetting = [
  {
    type: 'switch',
    title: i18n.t('weTest.isDisable'),
    field: 'isAvailable',
    value: true,
    col: {
      span: 8,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: 'yes',
        close: 'no'
      }
    }
  }, {
    type: 'select',
    field: 'connectionDisconnectStrategy',
    title: i18n.t('taskPlan.label.connectionDisconnectStrategy'),
    value: getDictByLanguage('ConnectionDisconnectStrategy')[0].value,
    options: getDictByLanguage('ConnectionDisconnectStrategy'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'template',
    name: 'children',
    field: 'wifiConnectionList',
    col: { span: 24, xs: 24 },
    template: '<div><form-create v-model="modelForm" :rule="rule" :option="option" /></div>',
    vm: new Vue({
      data: {
        modelForm: {},
        rule: wifiConnectionList,
        option: commonOptions
      }})
  }

]
// as rule
var channelInfoList = {
  type: 'template',
  name: 'children',
  field: 'channelInfoList',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: i18n.t('taskPlan.label.networkConnectionSettings'),
      active: ['1'],
      modelForm: {},
      rule: networkConnectionSetting,
      option: commonOptions
    }
  })
}
export { channelInfoList }
