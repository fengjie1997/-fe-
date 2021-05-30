<template>
  <div>
    <ElTree v-if="false" :data="data" :props="props" check-on-click-node :show-checkbox="true" check-strictly />
    <FleetTree :data="data" />
  </div>
</template>

<script>
// import splitPane from 'vue-splitpane'
import ElTree from '@/components/tree/src/tree.vue'
import FleetTree from './components/tree/index.vue'
import { SetLocalStorageDict } from '@/utils/dictCache.js'
// import { default as BaseConfigView } from '@/components/TestPlanTemplate/page/baseConfig.vue'
import openWindow from '@/utils/openWindow'
import { cacheDict } from '@/api/admin/dict'

export default {
  name: 'DashboardAdmin',
  components: { ElTree, FleetTree },
  data() {
    return {
      props: {
        label: 'name',
        children: 'children'
      },
      data: []
    }
  },
  computed: {
    lang: {
      get() {
        return this.$store.getters.language
      },
      set(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      }
    },
    apiUrl: {
      get() {
        return this.$store.getters.apiUrl
      },
      set(url) {
        this.$store.dispatch('setApiUrl', url)
      }
    }
  },
  created() {
    // console.log('dfdsfss')
  },
  methods: {
    resize() {
      console.log('resize')
    },
    handleOpenWindow() {
      openWindow('https://www.sina.com', '百度', 500, 500)
    },
    getCacheDict() {
      cacheDict().then(res => {
        SetLocalStorageDict(res.data.data)
      })
    },
    handleCacheDict() {
      this.getCacheDict()
    },
    openAirFleet() {
      const { href } = this.$router.resolve({
        name: 'airFleet'
      })
      window.open(href, '_blank')
    },
    handleOutputModel() {
      console.log(this.model)
    },
    handleSetApi() {
      this.$store.dispatch('setApiUrl', process.env.BASE_API)
    }
  }
}
</script>
<style  scoped>
  .components-container {
    position: relative;
    height: 100vh;
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 10px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
</style>
