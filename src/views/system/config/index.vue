<template>
  <div class="full-hw">
    <!--
    改造/使用 问题注意点：
    1、隐藏ID列，增加Index。
    2、组是否为条件，是的话增加左侧组树。
    3、改造请注意一下样式是否全局。
    4、toolbar是为图标形式。
    5、分页统一设置20行。
    6、请根据实际列，调整列宽，最后一列为固定不可resizable。
    7、统一更改操作栏名称为Actions。
    -->
    <fleet-card-table
      :show-left-panel="true"
      @left-refresh-handle="handleRefresh"
    >
      <span slot="left-title">{{ $t('sysConfig.sysConfig') }}</span>

      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          v-loading="leftTreeLoad"
          class="full-hw"
          :data="leftTreeData"
          :props="leftTreeProps"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        />

      </div>

      <div slot="right-card" class="full-hw">
        <!--        Right Card Slot.-->
        <component :is="loadComponent" class="full-hw" />

      </div>

    </fleet-card-table>
  </div>

</template>

<script>
import FleetCardTable from '@/components/FleetCardTable'
import DeviceAlarmConfig from './components/deviceAlarmConfig'
import { dataSegmentationList } from '@/api/system/sysconfig.js'
import DataStoreConfig from './components/dataStoreConfig'
export default {
  name: 'Index',
  components: {
    // Pagination,
    FleetCardTable,
    DataStoreConfig,
    DeviceAlarmConfig
  },
  data() {
    return {
      // 左侧树 Props
      leftTreeProps: {
        children: 'children',
        label: 'name',
        name: 'label',
        value: 'value'
      },
      // 左侧树load
      leftTreeLoad: false,

      loadComponent: '',
      // 左侧树 数据
      // TODO 有点疑问，为什么这里是写固定了呢?
      //
      // {
      //   label: this.$t('sysConfig.file'),
      //     name: this.$t('sysConfig.file'),
      //   children: [{
      //   label: this.$t('sysConfig.fileConfig'),
      //   name: this.$t('sysConfig.fileConfig')
      // }, {
      //   label: this.$t('sysConfig.fileAloConfig'),
      //   name: this.$t('sysConfig.fileAloConfig')
      // }]
      // }, {
      //   value: 'Parameterthreshold',
      //     label: 'Parameterthreshold',
      //     name: this.$t('sysConfig.paras'),
      //     children: []
      // },

      leftTreeData: [
        { label: this.$t('sysConfig.deviceAlarm'), component: 'DeviceAlarmConfig', name: this.$t('sysConfig.deviceAlarm') },
        { label: this.$t('sysConfig.dataConfig'), component: 'DataStoreConfig', name: this.$t('sysConfig.dataConfig') }],

      // 数据阈值的树列表
      dataSegmentList: []

    }
  },
  computed: {
    groupTree() {
      return this.$store.getters.groupTree
    }
  },
  created() {
    // this.getDataSegmentationList()
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      console.log(row)
    },
    /** 重置 */
    handleReset(row) {
      console.log(row)
    },
    /** 树选中 */
    handleNodeClick(data) {
      this.loadComponent = data.component
    },
    /** 刷新左侧菜单 */
    handleRefresh() {
      this.$store.dispatch('refreshGroupTree')
    },
    /** 过滤失去焦点时触发 */
    handleEvent(data) {
      console.log(data)
    },
    /** 获取数据阈值**/
    getDataSegmentationList() {
      this.leftTreeLoad = true
      dataSegmentationList().then(res => {
        this.dataSegmentList = res.data.data
        for (const leftTreeDatum of this.leftTreeData) {
          if (leftTreeDatum.value === 'Parameterthreshold') {
            leftTreeDatum.children = this.dataSegmentList
            break
          }
        }
      }).finally(() => {
        this.leftTreeLoad = false
      })
    }
  }
}
</script>

<style scoped>
  .el-table >>> .el-button, .el-table >>> .el-button--mini {
    padding: 5px;
  }
  >>>.right .el-card,  >>>.container .right .el-card__body {
    padding: 0 !important;
  }

</style>
