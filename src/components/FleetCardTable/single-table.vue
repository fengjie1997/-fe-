<template>
  <div class="box-table">

    <div v-if="showFilter" class="box-header">

      <div style="float:left;position:relative;">

        <slot name="filter">

          <search-filter
            :data="filterDefaultData"
            :field-list="filterFieldList"
            :list-type-info="filterTypeOptionList"
            :count="filterShowCount"
            :control-name="controlName"
            class="full-hw"
            :btn-style="btn"
            @handle-filter="handleFilter"
            @handle-reset="handleReset"
            @handle-event="handleEvent"
            @handle-expend="handleExpend"
          />

        </slot>

      </div>
    </div>

    <div class="full-hw box-body">
      <div v-if="showToolBar" class="tool-bar">

        <!--工具栏插槽-->
        <slot name="tool-bar" />

      </div>

      <div class="main-table">
        <!--表格插槽-->
        <slot name="main-table" />
      </div>

      <div v-if="showPage" class="footer-page">
        <!-- Page插槽 -->
        <slot name="footer-page" />
      </div>

    </div>

  </div>
</template>

<script>
import SearchFilter from './search-filter'
export default {
  name: 'FleetSingleTable',
  components: {
    SearchFilter
  },
  props: {
    /** 字段默认数据 */
    filterDefaultData: {
      type: Object,
      default: () => ({})
    },
    /** 字段配置项 */
    filterFieldList: {
      type: Array,
      default: () => []
    },
    /** 相关的列表 */
    filterTypeOptionList: {
      type: Object,
      default: () => {}
    },
    filterShowCount: {
      type: Number,
      default: 3
    },
    showToolBar: {
      type: Boolean,
      default: true
    },
    showPage: {
      type: Boolean,
      default: true
    },
    showFilter: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      controlName: {
        display: this.$t('common.expand'),
        hide: this.$t('common.fold')
      },
      btn: [
        { icon: null, text: this.$t('common.search'), disabled: false, type: 'primary', plain: false, round: false },
        { icon: null, text: this.$t('common.reset'), disabled: false, type: null, plain: false, round: false }
      ]
    }
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      this.$emit('filter-handle', row)
    },
    /** 重置 */
    handleReset(row) {
      this.$emit('filter-reset-handle', row)
    },
    /** 焦点失去事件 */
    handleEvent(data) {
      this.$emit('filter-event-handle', data)
    },
    handleExpend(data) {
      this.$emit('filter-expend-handle', data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .full-hw {
    height: 100%;
    width: 100%;
  }

  .box-table {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .box-header {
      line-height: 1.15;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      font-size: 12px;
      color: #303133;
      -webkit-box-direction: normal;
      box-sizing: border-box;
      padding: 0 !important;
      padding-bottom: 10px !important;
      min-height: 40px;
      height: auto;
    }

    .box-body {
      line-height: 1.15;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      font-size: 12px;
      color: #303133;
      -webkit-box-direction: normal;
      box-sizing: inherit;
      overflow: auto;
      padding: 0 !important;
      -webkit-box-flex: 1;
      flex: auto;
      display: flex;
      -webkit-box-orient: vertical;
      -ms-flex-direction: column;
      flex-direction: column;

      .tool-bar {
        line-height: 40px;
        height: 40px;
        padding-top: 10px;
        margin-bottom: 10px;
        border-top: 1px solid #EBEEF5;

        /deep/ .el-button + .el-button {
          margin-left: 0;
        }

        /deep/ .el-button--mini, .el-button--mini.is-round {
          padding: 7px 10px;
        }
      }

      .main-table {
        height: 100%;
        overflow: auto;

        /deep/ .el-table thead {
          color: #606266;
        }

        /deep/ .el-button,
        /deep/ .el-button--mini {
          padding: 5px;
        }
      }

      .footer-page {
        margin-top: 10px;
        height: 40px;

        /*分页样式重写*/
        /deep/ .pagination-container{
          padding: 0!important;
        }
        /deep/ .el-pagination {
          font-size: 12px !important;
          padding: 5px 0!important;
        }

      }
    }

  }
</style>
