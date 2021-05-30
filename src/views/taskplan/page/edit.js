import { BaseConfView, PortConfView } from './edit/index'

// import BaseConf from '../components/baseConf/baseConf.vue'
// import PortConf from '../components/portConf/portConf.vue'
export default {
  components: { BaseConfView, PortConfView },
  data() {
    return {
      activeNames: ['1'],
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
    }
  }
}
