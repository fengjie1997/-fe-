import { getDictByTagName } from '@/utils/dictCache.js'
const rules = [
  {
    type: 'select',
    field: 'psCallMode',
    title: '测试模式',
    value: getDictByTagName('PSCallMode')[0].value,
    options: getDictByTagName('PSCallMode'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'endCondition',
    title: '结束条件',
    value: getDictByTagName('FileSource')[0].value,
    options: getDictByTagName('FileSource'),
    col: {
      span: 12,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'uploadTimeout',
    title: '下载超时(ms)',
    value: 1200,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'uploadDuration',
    title: '下载时长(ms)',
    value: 300,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: '无流量超时(S)',
    value: 60,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  },

  {
    type: 'InputNumber',
    field: 'waitTime',
    title: '开始等待时间(ms)',
    value: 300,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }
]

export { rules }
