<template>
  <div>
    <el-row>
      <!--侧边-->
      <el-col :span="spanLeft">
        <div>
          <el-card class="testplan-box-card">

            <div slot="header" class="clearfix">
              <span v-if="spanLeft >= 5">端口配置</span>
              <!--              <el-button style="float: right; padding: 3px 0" type="text" @click="handleSwitchSpan">缩/放</el-button>-->
            </div>
            <!--
            <div>
              <el-scrollbar style="height:100%;">
                <el-tree ref="testplanTree" :data="testplanData" :props="testplanProps" :filter-node-method="filterNode" :expand-on-click-node="false" default-expand-all class="base5g-tree">
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>
                      <p class="mgl-10 product-testplan-name" :style="!data.children? '':'font-weight: bold;'">{{ data.name }}</p>
                    </span>
                    <span v-if="!data.children" style="padding-right:10px">
                      <el-button class="update-btn" type="text" size="mini" icon="el-icon-edit" />
                      <el-button type="text" size="mini" icon="el-icon-plus" @click="handleAddtestplan()" />
                    </span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </div>
             -->
          </el-card>
        </div>
      </el-col>

      <!-- 右侧 -->
      <el-col :span="spanRight">
        <div>
          <el-card class="testplan-box-card">
            <div slot="header" class="clearfix">
              <span><b>基本配置</b></span>
            </div>
            <el-scrollbar class="scrollbar">
              <TemplateForm />
            </el-scrollbar>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { TemplateForm } from './page/index'
export default {
  components: {
    TemplateForm
  },
  data() {
    return {
      /**
       * 大小
       */
      spanLeft: 5,
      spanRight: 19
    }
  }
}
</script>
<style scoped>
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

  .testplan-box-card {
    margin: 5px 0px 5px 5px;
    height: 800px;
  }

  .scrollbar{
    height: 740px;width: 100%; overflow-x:hidden;
  }

  .product-testplan-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
