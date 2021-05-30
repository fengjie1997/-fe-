/**
 * Form-Create 高级设置
 */
import { commonOption } from './commmo.js'

const modemPortRule = {
  name: 'modemPort',
  title: 'MODEM端口SIM卡信息设置',
  rule: [
    {
      type: 'input',
      field: 'mobilephone',
      title: '电话号码',
      value: '',
      col: {
        span: 8,
        xs: 24
      }
    },
    {
      type: 'input',
      field: 'smsmobisle',
      title: '短信中心号码',
      value: '',
      col: {
        span: 8,
        xs: 24,
        push: 4
      }
    }
  ],
  eleForm: null,
  option: commonOption
}
export { modemPortRule }
