<template>
  <div class="analyze-page-app">
    <div class="filter-container">
      <el-button-group class="analyze-action">
        <el-button
          v-for="(item,index) in actList"
          :key="index"
          :type="item.type"
          size="mini"
          :icon="item.icon"
          @click="hanlderDrawerShow(item.code,item.name)"
        >{{ item.name }}</el-button>
      </el-button-group>
    </div>
    <div class="analyze-map">
      <div id="map" style="height: 100%; width: 100%;" />
    </div>
    <!-- drawer -->
    <el-drawer
      :size="'25%'"
      :title="dialogName"
      :visible.sync="searchDreawer"
      direction="ltr"
      custom-class="demo-drawer"
    >
      <div class="box">
        <GridFormViewer v-show="activeDrawer === 'gridDrawer'" ref="gridDrawer" @close="closeDialog" @Toloading="Toloading" />
        <EventFormViewer v-show="activeDrawer === 'eventDrawer'" ref="eventDrawer" @close="closeDialog" @setLoading="setLoading" />
        <center>
          <el-button icon="el-icon-search" size="md" type="primary" class="analyze-search-btn" :loading="loading" @click="handleReseach">查询</el-button>
        </center>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import js from './index'
export default {
  ...js
}
</script>
<style lang="less" scoped>
  .analyze-page-app{
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  .analyze-map {
    width: 100%;
    height: 100%;
  }
  .analyze-action{
    .el-button{
      margin-right: 5px;
    }
  }
  .analyze-search-btn{
    padding: 12px 35px;
    margin-top: 15px;

  }
  .el-drawer__body {
    padding: 25px;
  }
  .demo-drawer{
    height: 100%;
    overflow-y: auto;
  }
  .box{
    position: relative;
    height: 91vh;
    overflow: auto;
    padding-bottom: 20px;
  }
</style>
