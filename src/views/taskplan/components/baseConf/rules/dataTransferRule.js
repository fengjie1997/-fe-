/**
 * Form-Create 高级设置
 */
import { commonOption } from './commmo.js'
import { getDictByLanguage } from '@/utils/dictByLanguage'
import i18n from '@/lang'
const dataTransferRule = {
  name: 'dataTransfer',
  title: i18n.t('taskPlan.title.DataTransferConfig'),
  rule: [
    {
      type: 'select',
      field: 'dataTransmit',
      title: i18n.t('template.dataTransOption'),
      value: getDictByLanguage('dataTransferType')[0].value,
      options: getDictByLanguage('dataTransferType'),
      col: {
        span: 12,
        xs: 24
      }
    },
    {
      type: 'select',
      field: 'modemPort',
      title: i18n.t('template.portNumber'),
      value: getDictByLanguage('transferPort')[0].value,
      options: getDictByLanguage('transferPort'),
      col: {
        span: 12,
        xs: 24
      },
      validate: [{
        required: true,
        message: i18n.t('common.pleaseSelect'),
        trigger: 'change'
      }]
    }
  ],
  eleForm: null,
  option: commonOption
}
export { dataTransferRule }
