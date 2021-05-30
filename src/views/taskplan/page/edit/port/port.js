import { getDictNameByValue } from '@/utils/dictCache.js'
import { fetchtSchemaPortList } from '@/api/device/testPlanList.js' // addTask
import { setSchemaInfo } from '@/api/device/planPort'
export default {
  name: 'PortList',
  components: { },
  props: {
    planId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      portList: []
    }
  },
  // created() {
  //   if (this.planId !== null) {
  //     this.getPortList(this.planId)
  //   }
  // },
  mounted() {
    if (this.planId !== null) {
      this.getPortList(this.planId)
    }
  },
  computed: {},
  watch: {
    planId(newId) {
      if (newId !== null) {
        this.getPortList(newId)
      }
    }
  },
  methods: {
    getPortList(planId) {
      fetchtSchemaPortList(this.$route.params.deviceId, planId).then(res => {
        this.portList = res.data.data
        console.log('this is the portList', res.data.data)
        if (res.data.data.length > 0) {
          this.$emit('setSchemaId', res.data.data[0].schemaId)
        }
      })
    },
    // 当前端口
    handleCurrentChange(val) {
      this.$emit('setSchemaId', val.schemaId)
    },
    // 网络类型名称
    handleNetType(row) {
      return row.portNumber === 1 ? (getDictNameByValue('TNetworkType', row.netWorkType.toString()) + row.portNumber + '(Modem)') : (getDictNameByValue('TNetworkType', row.netWorkType.toString()) + row.portNumber)
    },
    // 编辑端口
    handlePortEdit(id) {
      console.log(id)
      this.$notify({
        title: this.$t('common.error'),
        message: '接口维护中…',
        type: 'error',
        duration: 2000
      })
    },
    // 切换端口状态
    handlePortStatus(row) {
      console.log(row)
      // this.$notify({
      //   title: this.$t('common.error'),
      //   message: '接口维护中…',
      //   type: 'error',
      //   duration: 2000
      // })
      setSchemaInfo(this.planId, row).then(res => {
        console.log(res.data)
      })
    }
  }
}
