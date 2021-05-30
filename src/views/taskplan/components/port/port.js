import { getDictNameByValue } from '@/utils/dictCache.js'
import { fetchtSchemaPortList } from '@/api/device/testPlanList.js' // addTask
import { switchModemPort } from '@/api/testPlan/port'
import { setSchemaInfo } from '@/api/device/planPort'
import { mapMutations, mapState, mapActions } from 'vuex'
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
      portFormVisible: false,
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
  computed: {
    ...mapState({
      schemaInfoVo: state => state.deviceList.schemaInfoVo,
      testPlanId: state => state.deviceList.testPlanId,
      modemPort: state => state.testPlan.modemPort
    })
  },
  watch: {
    planId(newId) {
      if (newId !== null) {
        this.getPortList(newId)
      }
    },
    modemPort(newValue, oldValue) {
      // this.portList = [...this.portList]
      if (newValue !== null && oldValue !== null) {
        // 变更传输模块端口
        switchModemPort(this.$route.params.deviceId, this.planId, newValue).then(res => {
          if (res.data.code === 1) {
            // 更新端口列表
            this.getPortList(this.planId)
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    }
  },
  methods: {
    ...mapMutations({
      SET_SCHEMA_INFO_VO: 'deviceList/SET_SCHEMA_INFO_VO'
    }),
    ...mapActions({
      setSchemaInfoVo: 'deviceList/setSchemaInfoVo'
    }),
    getPortList(planId) {
      fetchtSchemaPortList(this.$route.params.deviceId, planId).then(res => {
        this.portList = res.data.data
        // 默认选中第一个端口
        if (res.data.data.length > 0) {
          this.$nextTick(() => {
            this.$refs.portListTable.setCurrentRow(this.$refs.portListTable.data[0])
          })
        }
      })
    },
    // 当前端口
    handleCurrentChange(val) {
      this.$emit('setSchemaId', val.schemaId)
      this.$store.commit('SET_SELECTED_PORT', val.portNumber)
    },
    // 网络类型名称
    handleNetType(row) {
      if ((this.modemPort && this.modemPort === row.portNumber) || (!this.modemPort && row.portNumber === 1)) {
        return getDictNameByValue('TNetworkType', row.netWorkType.toString()) + row.portNumber + '(Modem)'
      } else {
        return getDictNameByValue('TNetworkType', row.netWorkType.toString()) + row.portNumber
      }
    },
    // 编辑端口
    handlePortEdit(row) {
      this.SET_SCHEMA_INFO_VO({ schemaInfoVo: row })
      this.portFormVisible = true
    },
    // 切换端口状态
    handlePortStatus(row) {
      setSchemaInfo(this.planId, { schemaId: row.schemaId }, row).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: this.$t('common.tip'),
            message: this.$t('common.updateSuccess'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    savePortBasicConfig() {
      // 更新端口基本配置
      this.setSchemaInfoVo({
        testPlanId: this.testPlanId,
        schemaInfoVo: this.schemaInfoVo,
        success: () => {
          this.portFormVisible = false
          this.$notify({
            title: this.$t('common.tip'),
            message: this.$t('common.updateSuccess'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 网络类型名称
    formatNetworkType(code) {
      return getDictNameByValue('TNetworkType', String(code))
    },
    // 端口设备类型名称
    formatPortDeviceName(code) {
      return getDictNameByValue('devicePortType', String(code))
    }
  }
}
