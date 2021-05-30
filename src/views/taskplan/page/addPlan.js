import BaseConf from '../components/baseConf/baseConf.vue'
import PortConf from '../components/portConf/portConf.vue'
import { mapMutations } from 'vuex'
export default {
  components: { BaseConf, PortConf },
  data() {
    return {
      active: 0,
      disabled: false,
      update: true,
      planId: null
    }
  },
  created() {
    this.planId = this.updatePlanId
  },
  computed: {
    updatePlanId: {
      get: function() {
        if (Number(this.$route.params.planId) < 0) {
          return null
        } else {
          return Number(this.$route.params.planId)
        }
      },
      set: function(newVal) {
        this.planId = newVal
      }
    }
  },
  methods: {
    ...mapMutations({
      SET_TEST_PLAN_ID: 'deviceList/SET_TEST_PLAN_ID',
      SET_MODEM_PORT: 'SET_MODEM_PORT',
      SET_SELECTED_PORT: 'SET_SELECTED_PORT',
      SET_DEVICE_ID: 'SET_DEVICE_ID'
    }),
    resize() {
      console.log('resize')
    },
    last() {
      if (this.active - 1 === 0) this.active = 0
    },
    next() {
      if (this.planId === null) {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('common.nextBeforeSubmit'),
          type: 'warning',
          duration: 2000
        })
      } else {
        if (this.active++ > 2) this.active = 0
        console.log('refresh')
      }
    },
    replaceId(id) {
      console.log('收到最新的计划ID' + id)
      this.$refs.portConf.refreshPortList(id)
      this.updatePlanId = id

      // 创建测试计划后同步测试计划ID
      this.SET_TEST_PLAN_ID({ testPlanId: id })
    }
  },
  beforeRouteEnter(to, from, next) {
    const testPlanId = to.params.planId
    // 同步选中的测试计划ID
    next(vm => {
      vm.SET_TEST_PLAN_ID({ testPlanId: testPlanId })
      // 重置modem端口和选中端口
      vm.SET_MODEM_PORT(null)
      vm.SET_SELECTED_PORT(null)
      vm.SET_DEVICE_ID(null)
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 重置modem端口和选中端口
    this.SET_MODEM_PORT(null)
    this.SET_SELECTED_PORT(null)
    this.SET_DEVICE_ID(null)
    next()
  }
}
