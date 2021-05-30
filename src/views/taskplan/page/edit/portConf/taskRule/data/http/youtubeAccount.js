import Vue from 'vue'
import { commonOptions } from '../../common/common'
const rules = [
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
  }

]
const youtubeAccount = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'youtubeAccount',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: 'YouTube账号信息',
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    },
    watch: {
      data(newData) {
        console.log(newData)
        this.modelForm.setValue(newData)
      }
    }
  })
}
export { youtubeAccount }
