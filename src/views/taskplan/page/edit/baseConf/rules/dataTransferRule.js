/**
 * Form-Create 高级设置
 */
import { getDictByTagName } from '@/utils/dictCache.js'
import { commonOption } from './commmo.js'

const dataTransferRule = {
  name: 'dataTransfer',
  title: '数据传输设置',
  rule: [
    {
      type: 'select',
      field: 'dataTransmit',
      title: '数据传输方式',
      value: getDictByTagName('dataTransferType')[0].value,
      options: getDictByTagName('dataTransferType'),
      col: {
        span: 12,
        xs: 24
      }
    },
    {
      type: 'select',
      field: 'modemPort',
      title: '回传模块端口',
      value: getDictByTagName('transferPort')[0].value,
      options: getDictByTagName('transferPort'),
      col: {
        span: 12,
        xs: 24
      },
      validate: [{
        required: true,
        message: '请选择端口',
        trigger: 'change'
      }]
    }
  ],
  eleForm: null,
  option: commonOption
}
export { dataTransferRule }
