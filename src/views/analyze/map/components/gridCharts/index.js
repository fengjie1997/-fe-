import echarts from 'echarts'
export default {
  name: 'EventCharts',
  props: {
    datas: {
      type: Object,
      default: () => {
        return {}
      }
    },
    thr: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    num(newData) {
      this.option.xAxis.data = this.newArray[newData]
      this.option.series[0].data = this.datas[newData]
      this.option.series[1].data = this.datas[newData]
      this.target.setOption(this.option)
    }
  },
  components: { },
  data() {
    return {
      value: '',
      num: 0,
      newArray: [],
      option: null,
      target: null
    }
  },

  created() {
    var a = JSON.parse(JSON.stringify(this.datas))
    console.log(a)
    var newArray = []
    this.thr.map(item => {
      var arr = []
      //   return item.ThrStr
      item.map(item2 => {
        arr.push(item2.ThrStr)
      })
      newArray.push(arr)
    })
    this.newArray = newArray
    console.log(this.datas, '传到Ech里边的')
    console.log(this.num, 'this.num 和newARRAY')
    console.log(this.thr, '传到Ech里边的')
    console.log(this.tableData, '传到里边的')
    console.log(this.datas[0])
    console.log(this.datas[this.num])
    this.value = this.tableData[0].name
  },
  mounted() {
    this.target = echarts.init(this.$refs.myChart)
    console.log(this.option)
    const options = { title: {
      top: 10,
      text: this.$t('analyze.label.gridParameter'),
      // text: '栅格参数',
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
      axisLabel: {
        interval: 0,
        rotate: 35
        // formatter: function(value) {
        //   // debugger
        //   var ret = ''// 拼接加\n返回的类目项
        //   var maxLength = 6// 每项显示文字个数
        //   var valLength = value.length// X轴类目项的文字个数
        //   var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
        //   if (rowN > 1) {
        //     for (var i = 0; i < rowN; i++) {
        //       var temp = ''// 每次截取的字符串
        //       var start = i * maxLength// 开始截取的位置
        //       var end = start + maxLength// 结束截取的位置
        //       // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
        //       temp = value.substring(start, end) + '\n'
        //       ret += temp // 凭借最终的字符串
        //     }
        //     return ret
        //   } else {
        //     return value
        //   }
        // }
      },
      data: this.newArray[this.num]
    },
    yAxis: {},
    // 数据
    series: [{
      name: this.$t('analyze.label.times'),
      // name: 'time',
      type: 'bar',
      data: this.datas[this.num]
    },
    {
      name: 'num',
      type: 'line',
      data: this.datas[this.num]
    }
    ] }
    this.option = options
    this.target.setOption(options)
  },
  methods: {
    filterChange() {},
    change(type) {
      this.tableData.map((item, index) => {
        if (item.name === type) {
          this.num = index
        }
      })
      console.log(this.num, '执行到了')
    }
  }
}
