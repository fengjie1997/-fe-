import echarts from 'echarts'
import i18n from '@/lang'
export default {
  name: 'EventCharts',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: { },
  data() {
    return {
    }
  },
  created() { },
  mounted() {
    const target = echarts.init(this.$refs.myChart)
    target.setOption(
      {
        title: {
          top: 10,
          text: i18n.t('analyze.label.errEvent'),
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        // 图例
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: [{
            name: '<=110',
            icon: 'circle',
            textStyle: {
              color: 'blue', // 单独设置某一个图列的颜色
              backgroundColor: '#fff' // 单独设置某一个图列的字体背景色
            }
          }],
          right: '4%',
          textStyle: {
            fontSize: 12
          }
        },
        // x轴
        xAxis: {
          data: ['<=110', '(110,105]', '(105,100]', '(100,95]', '(95,85]']
        },
        yAxis: {},
        // 数据
        series: [{
          name: i18n.t('analyze.label.times'),
          type: 'bar',
          data: [3, 2, 4, 3, 5],
          markLine: {
            data: [
              { type: 'average', name: i18n.t('analyze.label.average') }
            ]
          }
        }
        ]
      }
    )
  },
  methods: {
    filterChange() {}
  }
}
