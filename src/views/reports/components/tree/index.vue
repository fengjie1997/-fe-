<template>
  <el-tree
    ref="reportTree"
    :data="reportData"
    :props="reportProps"
    :filter-node-method="filterNode"
    :expand-on-click-node="false"
    default-expand-all
    class="base5g-tree"
    @node-click="handleNode"
  >
    <span slot-scope="{ node, data }" class="custom-tree-node">
      <p class="mgl-10 product-report-name" :style="!data.children? '':'font-weight: bold;'">{{ data.name }}</p>
      <span v-if="!data.children">
        <el-button type="text" size="md" style="font-weight:800" icon="el-icon-plus" @click="handleAddReport(data)" />
      </span>
    </span>
  </el-tree>
</template>
<script>
import js from './index'
export default {
  ...js
}
</script>
<style scoped>
  .base5g-tree {
    margin-top: 10px;
    padding-bottom: 20px;
    height: 700px;
  }

  .base5g-tab {
    height: 800px;
    overflow-x: hidden;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .report-box-card {
    margin: 5px 0px 5px 5px;
    height: 800px;
  }

  .product-report-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
