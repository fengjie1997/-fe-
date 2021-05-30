<template>
  <ElCollapse class="fleet-tree">
    <div v-for="(item, idx) in data" :key="item.id">
      <ElCollapseItem v-if="item.children" :index="item.id" class="tree-row">
        <template slot="title">
          <el-checkbox>{{ item.name }}</el-checkbox>
        </template>
        <menutree :data="item.children" />
      </ElCollapseItem>
      <ElCollapseItem v-else :index="item.id + idx" class="tree-row">
        <template slot="title">
          <el-checkbox>{{ item.name }}</el-checkbox>
        </template>
      </ElCollapseItem>
    </div>
  </ElCollapse>
</template>

<script>
import index from './index.js'
export default {
  ...index
}

</script>

<style lang="less">
.fleet-tree{
  width: 180px;
  // padding-left: 20px;
  .tree-row{
    padding-left: 35px;
    cursor: pointer;
    .tree-node{
      padding-left: 10px;
    }
  }
}
</style>
