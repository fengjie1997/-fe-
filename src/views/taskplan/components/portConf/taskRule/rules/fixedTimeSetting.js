export const fixedTimeSetting = [
  {
    type: 'InputNumber',
    field: 'taskDuration',
    title: '任务持续时长(ms)',
    value: 0,
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
    field: 'interval',
    title: '任务间隔(ms)',
    value: 0,
    col: {
      span: 12,
      xs: 24
    },
    props: {
      min: 0
    }
  }
]
