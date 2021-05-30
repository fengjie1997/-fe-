<template>
  <div class="full-hw">
    <div class="container">

      <!-- 左侧 -->
      <div v-show="showLeftPanel" ref="leftCard" class="left">
        <el-card class="box-card">
          <!--左侧插槽-->
          <slot name="left-card">
            <div slot="header" class="clearfix">
              <span class="title">
                <!--左侧标题插槽-->
                <slot name="left-title">
                  Default Title
                </slot>

              </span>
              <div class="refresh">
                <!--左侧刷新插槽-->
                <slot name="left-panel-refresh">
                  <svg-icon icon-class="refresh" class="refresh-icon" @click="$emit('left-refresh-handle', true)" />
                <!--                <svg-icon icon-class="refresh" class="refresh-icon" @click="showLeftPanel = false" />-->
                </slot>
              </div>
            </div>

            <!--左侧树插槽-->
            <slot name="left-tree" class="full-hw">
              如果您不想使用左侧菜单,请设置showLeftPanel属性
            </slot>
          </slot>
        </el-card>
      </div>

      <!-- 拖拽 -->
      <div v-show="showLeftPanel" ref="colResize" class="col-resize" @mousedown="onMouseDown">
        <div ref="colResizeDisplay" class="col-resize-display" />
      </div>
      <!-- 右侧 -->
      <div class="right">

        <slot name="right">
          <el-card class="box-card">

            <!--右侧插槽-->
            <slot name="right-card">

              <div slot="header">

                <div style="float:left;position:relative;">

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

                </div>
              </div>

              <div class="right-body-flex full-hw">
                <div v-show="showRightToolBar" class="tool-bar">

                  <!--工具栏插槽-->
                  <slot name="tool-bar">
                    <!--                <el-button type="primary" size="mini" icon="el-icon-edit" />-->
                    <!--                <el-button type="primary" size="mini" icon="el-icon-share" />-->
                    <!--                <el-button type="primary" size="mini" icon="el-icon-delete" />-->
                  </slot>

                </div>

                <div class="main-table">
                  <!--表格插槽-->
                  <slot name="main-table" />
                </div>

                <div v-show="showRightPage" class="footer-page">
                  <!-- Page插槽 -->
                  <slot name="footer-page" />
                </div>

              </div>
            </slot>
          </el-card>
        </slot>
      </div>

    </div>
  </div>
</template>

<script>
import SearchFilter from './search-filter'
export default {
  name: 'FleetCardTable',
  components: {
    SearchFilter
  },

  props: {
    /** 是否显示左侧卡片**/
    showLeftPanel: {
      type: Boolean,
      default: true
    },
    /** 是否显示toolbar **/
    showRightToolBar: {
      type: Boolean,
      default: true
    },
    /** 是否显示分页 **/
    showRightPage: {
      type: Boolean,
      default: true
    },

    /** 字段默认数据 */
    filterDefaultData: {
      type: Object,
      default: () => {}
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
      ],

      // reszie
      active: false,
      hasMoved: false
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
    },
    onMouseDown(e) {
      if (!this.active) {
        this.active = true
        this.hasMoved = false
        this.$_reszieBeforeX = e.clientX
        this.$refs.colResizeDisplay.style.background = '#409EFF'
        document.body.classList.add('card-table-disabled-select')
        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('mouseup', this.onMouseUp)
        this.$emit('resize-down', e)
      }
    },

    onMouseUp(e) {
      document.removeEventListener('mouseup', this.onMouseUp)
      document.removeEventListener('mousemove', this.onMouseMove)
      this.active = false
      this.hasMoved = false
      this.$refs.colResizeDisplay.style.background = ''
      this.$refs.colResize.style.left = 0
      this.$refs.leftCard.style.width = this.$refs.leftCard.offsetWidth + this.$refs.colResize.moveLeft + 'px'
      this.$refs.colResize.moveLeft = 0
      this.$emit('resize-up', e)
      document.body.classList.remove('card-table-disabled-select')
    },
    onMouseMove(e) {
      if (e.buttons === 0 || e.which === 0) {
        this.active = false
      }

      if (this.active) {
        const left = e.clientX - this.$_reszieBeforeX
        this.$refs.colResize.style.left = left + 'px'
        this.$refs.colResize.moveLeft = left
        this.$emit('resize-move', e)
        this.hasMoved = true
      }
    }

  }
}
</script>

<style lang="scss" scoped>
  .full-hw {
    height: 100%;
    width: 100%;
  }

  .container{
    font-size: 12px;
    display:flex;/*设为伸缩容器*/
    height: 100%;
    width: 100%;

    .left{
      /*float: left;*/
      padding: 5px 0 5px 5px;
      min-width:200px;
      max-width: 80%;
      width:280px;
      height: 100%;

      .title{
        font-size: 14px;
        line-height:40px;
        color: #606266;
      }

      .refresh {
        color: #409EFF;
        float: right;
        padding: 0;
        line-height: 40px;
        margin-right: 3px;

        .refresh-icon {
          cursor: pointer;
        }

      }

      /deep/ .el-card__body {
        height: calc(100% - 50px);

        /deep/ .el-scrollbar .el-scrollbar__wrap {
          overflow-x: hidden;
        }

        /deep/ .el-tree>.el-tree-node{
          min-width: 100%;
          display:inline-block;
        }

        /deep/.el-tree-node.is-current > .el-tree-node__content {
          background-color: #409EFF !important;
          color: white;
        }

        /deep/ .el-tree-node__content {
          height: 20px!important;
        }

        /deep/ .el-tree-node__label {
          font-size: 12px;
        }

      }
    }

    .col-resize {
      width: 5px;
      height: 100%;
      margin-left: -1px;
      padding-top:5px;
      padding-bottom: 5px;
      cursor: col-resize;
      position: relative;
      z-index: 1000;

      .col-resize-display {
        height: 100%;
        margin-left:2px;
        width: 3px
      }
    }

    .right{
      /*float: right;*/
      padding: 5px 5px 5px 0;
      flex:1;/*这里设置为占比1，填充满剩余空间*/
      height: 100%;
      /*width: calc(100% - 280px);*/
      width: 0;
      .box-card {
        padding: 10px;
        height: 100%;
        flex: auto;
        display: flex;
        -webkit-box-orient: vertical;
        -ms-flex-direction: column;
        flex-direction: column;

        .right-body-flex{
          font-size: 12px;
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
        }
        .tool-bar {
          line-height: 40px;
          height: 40px;

          /deep/ .el-button+.el-button {
            margin-left: 0;
          }

          /deep/ .el-button--mini, .el-button--mini.is-round {
            padding: 7px 10px;
          }
        }

        .main-table {
          height: 100%;
          overflow: auto;

          /deep/ .el-table thead{
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
        }
      }

      /deep/ .el-card__header {
        height: auto;
      }
      /deep/ .el-card__body {
        flex: auto;
      }

    }

    .box-card {
      padding: 10px;
      height: 100%;
    }
  }

  /deep/ .el-card__header {
    padding: 0!important;
    padding-bottom: 10px!important;
    min-height: 50px;
  }

  /deep/ .el-card__body {
    overflow: auto;
    padding: 0!important;
    padding-top: 10px!important;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  /*分页样式重写*/
  /deep/ .pagination-container{
    padding: 0!important;
  }
  /deep/ .el-pagination {
    font-size: 12px !important;
    padding: 5px 0!important;
  }

</style>
