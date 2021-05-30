import Vue from 'vue'
import i18n from '@/lang'
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOptions } from '../../common/common'
const rules = [
  {
    type: 'select',
    field: 'proxyType',
    title: '类型',
    value: getDictByTagName('ProxyType')[0].value,
    options: getDictByTagName('ProxyType'),
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
    title: '用户名',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'input',
    field: 'password',
    title: '密码',
    value: '',
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'proxyPort',
    title: '端口',
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
      title: '代理设置',
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
