<template>
  <div>
    <el-row>
      <!--侧边-->
      <el-col :span="spanLeft">
        <div>
          <el-card class="report-box-card">
            <div slot="header" class="clearfix">
              <span v-if="spanLeft >= 5">{{ $t('common.template') }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="handleSwitchSpan">{{ $t('common.zoom') }}</el-button>
            </div>
            <div>
              <el-scrollbar style="height:100%;">
                <el-tree ref="Tree" :data="treeData" :props="props" :filter-node-method="filterNode" :expand-on-click-node="false" default-expand-all class="tree">
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>
                      <p class="mgl-10 product-report-name" :style="!data.children? '':'font-weight: bold;'">{{ data.name }}</p>
                    </span>
                    <span v-if="!data.children" style="padding-right:10px">
                      <!--
                      <el-button class="update-btn" type="text" size="mini" icon="el-icon-edit" />
                      <el-button type="text" size="mini" icon="el-icon-plus" @click="handleAddReport()" />
                      -->
                    </span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </div>
          </el-card>
        </div>
      </el-col>

      <!-- 右侧 -->
      <el-col :span="spanRight">
        <TestPlanEditView />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import template from './template.js'
export default {
  ...template
}

</script>
<style scoped>
  .tree {
    margin-top: 10px;
    padding-bottom: 20px;
    height: 700px;
  }

  .tab {
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
