<template>
  <div class="app-container container">
    <el-row>
      <el-col :span="24">
        <div>
          <el-tabs type="border-card" class="box-card" @tab-click="handleTabClick">
            <el-tab-pane label="业务数据" class="tab-pane">
              <Business v-if="select==='business'" ref="business" class="tab-pane" />
            </el-tab-pane>
            <el-tab-pane label="任务数据">
              <Task v-if="select==='task'" ref="task" class="tab-pane" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import Business from './business/index'
import Task from './task/index'
export default {
  components: { Business, Task },
  data() {
    return {
      select: 'business'
    }
  },
  methods: {

    handleTabClick(tab) {
      switch (tab.label) {
        case '业务数据': this.select = 'business'; break
        case '任务数据': this.select = 'task'; break
      }
    }
  }
}

</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .box-card {
    height: calc(100vh - 84px - 30px);
  }

  .box-card .tab-pane {
    height: calc(100vh - 84px - 60px - 39px);
    display: flex;
    flex-direction: column;
  }
</style>
