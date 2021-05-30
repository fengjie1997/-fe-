import Vue from 'vue'
import { getDictByLanguage } from '@/utils/dictByLanguage.js'
import i18n from '@/lang'
import { commonOptions } from '../../common/common'
const rules = [
  {
    type: 'select',
    field: 'proxyType',
    title: i18n.t('device.type'),
    value: getDictByLanguage('ProxyType')[0].value,
    options: getDictByLanguage('ProxyType'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'proxyIP',
    title: i18n.t('taskPlan.mftpDown.address'),
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'username',
    title: i18n.t('device.user'),
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'password',
    title: i18n.t('device.password'),
    value: '',
    col: {
      span: 12,
      xs: 12
    },
    props: {
      type: 'password'
    }
  },
  {
    type: 'InputNumber',
    field: 'proxyPort',
    title: i18n.t('reportFile.port'),
    value: 0,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  }

]
const proxySetting = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'proxySetting',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      title: i18n.t('taskPlan.httpPage.proxySetting'),
      active: ['1'],
      modelForm: {},
      rule: rules,
      formData: {},
      option: commonOptions
    },
    watch: {
      formData(newData) {
        var data = JSON.parse(JSON.stringify(newData))
        this.modelForm.setValue(data)
      }
    }
  })
}
export { proxySetting }
