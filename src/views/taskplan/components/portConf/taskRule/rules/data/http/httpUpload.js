// MOC基础任务配置
import Vue from 'vue'
import i18n from '@/lang'
// import { urlListRule } from './taskRules/urlList'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import { baiduyunAccount } from './baiduyunAccount'
import { youtubeAccount } from './youtubeAccount'
const taskRule = [
  {
    type: 'select',
    field: 'psCallMode',
    title: '测试模式',
    value: getDictByTagName('PSCallMode')['1'].value,
    options: getDictByTagName('PSCallMode'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'websiteType',
    title: '网站类型',
    value: getDictByTagName('httpupWebsiteType')[0].value,
    options: getDictByTagName('httpupWebsiteType'),
    col: {
      span: 11,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'fileSource',
    title: '文件来源',
    value: getDictByTagName('FileSource')[0].value,
    options: getDictByTagName('FileSource'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'businessType',
    title: '业务类型',
    value: getDictByTagName('httpupBusinessType')[0].value,
    options: getDictByTagName('httpupBusinessType'),
    col: {
      span: 11,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'uploadTimeout',
    title: '上传超时(s)',
    value: 1200,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'uploadDuration',
    title: '上传时长(s)',
    value: 300,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: '无流量超时(s)',
    value: 60,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },

  {
    type: 'switch',
    title: '保存文件',
    field: 'isSaveFile',
    value: false,
    col: {
      span: 11,
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
    field: 'port',
    title: '端口',
    value: 80,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'fileSize',
    title: '文件大小',
    value: 2048,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'input',
    field: 'httpUpUrl',
    title: '上传地址',
    value: '',
    col: {
      span: 20,
      xs: 24
    },
    validate: [{
      required: true,
      message: '上传地址不能为空',
      trigger: 'blur'
    }]
  }
]
var rules = taskRule.concat(baiduyunAccount, youtubeAccount)
var taskHttpUpload = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'httpUpTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: 'HTTP Upload 测试设置',
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    },
    computed: {
      formData() {
        var formData = this.modelForm.formData()
        this.rule.forEach(item => {
          if (item.field === 'youtubeAccount') {
            formData['youtubeAccount'] = item.vm.modelForm.formData()
          }
          if (item.field === 'baiduyunAccount') {
            formData['baiduyunAccount'] = item.vm.modelForm.formData()
          }
        })
        return formData
      }
    },
    watch: {
      data(newData) {
        this.rule.forEach(item => {
          if (item.field === 'youtubeAccount') {
            item.vm.modelForm.setValue(newData['youtubeAccount'])
          }
          if (item.field === 'baiduyunAccount') {
            item.vm.modelForm.setValue(newData['baiduyunAccount'])
          }
        })
      }
    }
  })
}
export { taskHttpUpload }
