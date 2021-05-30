<template>

  <div class="full-hw">

    <fleet-card-table
      :show-left-panel="true"
    >

      <span slot="left-title">Default Title</span>

      <div slot="left-tree" class="full-hw scroll-auto">
        <el-tree
          ref="reportTree"
          :data="reportData"
          :props="reportProps"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          default-expand-all
          highlight-current
          class="full-hw"
          @node-click="handleNode"
        >
          <div slot-scope="{ node, data }" class="custom-tree-node">
            <p class="mgl-10 product-report-name margin-padding-0" :style="!data.children? '':'font-weight: bold;'">{{ getTreeMenuName(data) }}</p>
            <span v-if="!data.children" class="margin-padding-0 tree-btn" style="padding-right: 5px">
              <el-button type="text" size="md" icon="el-icon-plus" class="margin-padding-0 tree-btn-color" @click="handleAddReport(data)" />
            </span>
          </div>
        </el-tree>
      </div>

      <div slot="right" class="right-card">
        <el-tabs v-model="activeName" type="card" @tab-remove="removeTab">
          <el-tab-pane :label="$t('report.reportList')" name="reportList">
            <report-list-view ref="listView" :type-tree="reportData" />
          </el-tab-pane>
          <!-- <el-tab-pane label="报表计划列表" name="planList" /> -->
          <el-tab-pane v-for="(item, index) in base5gTabs" :key="item.name" :label="item.title + ' [' + (Number(index) + 1) + ']'" :name="item.name" closable>
            <report-form :tasks="tasks" @submit-success="submitReportSuccess(item.name)" />
          </el-tab-pane>
        </el-tabs>

      </div>

    </fleet-card-table>
  </div>

</template>
<script>
import js from './index'
export default {
  ...js
}
</script>

<style scoped>

  .margin-padding-0 {
   margin: 0;
    padding:0;
  }

  .right-card {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    height: 100%;
    width: 100%;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

  }

  >>>.el-tabs__header {
    margin: 0 !important;
  }

  >>>.container .right .box-card, >>> .container .right .box-card .el-card__body {
    padding: 0!important;
  }

  >>>.el-tree-node.is-current > .el-tree-node__content > .custom-tree-node >.tree-btn{
    display: block;
    background: #409EFF !important;
  }

  >>>.el-tree-node.is-current > .el-tree-node__content > .custom-tree-node > .tree-btn >.tree-btn-color{
    color: white !important;
  }

  .custom-tree-node {
    width: 100%;
    height: 22px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding-right: 8px;
  }

  .tree-btn {
    display: none;
    position: absolute;
    right: 0;
    background: #F7F7F8;
  }

  .product-report-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>

<style lang="less">

  .custom-tree-node:hover {
    .tree-btn {
      display: block !important;
    }

  }

</style>

