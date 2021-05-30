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
          @click="hanlderDrawerShow(item.code)"
        >{{ item.name }}</el-button>
      </el-button-group>
    </div>
    <div class="analyze-map">
      <div id="map" style="height: calc(100vh - 145px); width: 100%" />
    </div>
    <!-- drawer -->
    <el-drawer
      :size="'25%'"
      title="栅格参数"
      :visible.sync="gridDrawer"
      direction="ltr"
      class="analyze-drawer"
    >
      <el-row>
        <el-row :span="24" style="padding:10px 20px 10px 10px;height:800px;overflow-y:scroll">
          <GridFormViewer />
        </el-row>
        <el-col :span="24">
          <center style="margin-top:15px">
            <el-button icon="el-icon-search" size="md" type="primary" class="analyze-search-btn">查询</el-button>
          </center>
        </el-col>
      </el-row>
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
    padding: 10px 10px 0px 10px;
  }
  .analyze-action{
    .el-button{
      margin-right: 5px;
    }
  }
  .analyze-search-btn{
    padding: 12px 35px;
  }
</style>

