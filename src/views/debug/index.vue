<template>
  <el-card class="box-card" style="margin-top:40px;">
    <div slot="header" class="clearfix">
      <svg-icon icon-class="international" />
      <span style="margin-left:10px;">{{ $t('debug.debug.switch') }}</span>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('debug.debug.nowAPI')">
          <el-select v-model="testApiUrl" :placeholder="$t('debug.debug.placeholder')" style="width:200px" @change="setTestApi">
            <el-option v-for="(item,idx) in apiList" :key="idx" :label="item.code" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('debug.debug.reset')">
          <el-button type="primary" @click="handleSetApi">{{ $t('debug.debug.recovery') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { SetLocalStorageDict } from '@/utils/dictCache.js'
import { cacheDict } from '@/api/admin/dict'
import { getCacheDict } from '@/utils/dictCache'
export default {
  name: 'DashboardAdmin',
  components: { },
  data() {
    return {
      form: {},
      testApiUrl: process.env.BASE_API
    }
  },
  computed: {
    apiUrl: {
      get() {
        return this.$store.getters.apiUrl
      },
      set(url) {
        this.$store.dispatch('setApiUrl', url)
      }
    },
    apiList() {
      return getCacheDict('testApiList')
    }
  },
  created() {
    var hw = this.hiGeneral()
    console.log(hw.next())
    console.log(hw.next())
    console.log(hw.next())
  },
  methods: {
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
    setTestApi() {
      this.$store.dispatch('setApiUrl', this.testApiUrl)
    },
    handleSetApi() {
      this.$store.dispatch('setApiUrl', process.env.BASE_API)
    },
    // test
    hiGeneral: function * () {
      yield 'hello'
      yield 'world'
      return 'ending'
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
