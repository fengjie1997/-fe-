<template>
  <div class="app-container">
    <el-row>
      <!--侧边-->
      <el-col :span="spanLeft">
        <div>
          <el-card class="tree-box-card">
            <div slot="header" class="clearfix">
              <span v-if="spanLeft > 1">{{ $t('route.weTestBusinessConfig') }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="handleSwitchSpan">{{ $t('common.ShrinkOrRelease') }}</el-button>
            </div>
            <div>
              <el-scrollbar style="height:100%;">
                <el-tree ref="deviceTree" :data="businessData" :expand-on-click-node="false" default-expand-all class="business-tree">
                  <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>
                      <p class="mgl-10 product-device-name" :style="!data.children? '':'font-weight: bold;'">{{ data.name }}</p>
                    </span>
                    <span style="padding-right:10px">
                      <el-button
                        v-if="data.code!=null"
                        v-perm="'/weTestBusiness/setBusiness'"
                        type="text"
                        size="mini"
                        @click="addBusiness(data)"
                      >{{ $t('common.set') }}</el-button>
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
        <div class="el-card box-card">
          <div class="filter-container">
            <el-form :inline="true">
              <el-form-item label="业务名称">
                <el-input v-model="listQuery.name" class="filter-item" style="width: 90px" />
              </el-form-item>
              <el-form-item label="创建者">
                <el-input v-model="listQuery.creator" class="filter-item" style="width: 90px" />
              </el-form-item>

              <el-form-item label="业务类型">
                <el-cascader
                  v-model="taskType"
                  :options="typeOptions"
                  :props="{ checkStrictly: true }"
                  clearable
                  style="width: 180px"
                  class="filter-item"
                  @change="getTaskAndTaskName"
                />
                <!--                  <el-select v-model="listQuery.type" placeholder="选择需要搜索的业务类型" style="width: 120px" class="filter-item">-->
                <!--                    <el-option v-for="item in typeOptions" :key="item.key" :label="item.label" :value="item.key" />-->
                <!--                  </el-select>-->
              </el-form-item>
              <el-form-item>
                <el-button v-perm="'/weTestBusiness/searchBusiness'" v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
              </el-form-item>
              <el-form-item label="选择排序">
                <el-select v-model="listQuery.field" style="width: 90px" class="filter-item" @change="handleFilter">
                  <el-option v-for="item in fieldOptions" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>
              </el-form-item>
              <el-form-item label="排序方式">
                <el-select v-model="listQuery.isAsc" style="width: 80px" class="filter-item" @change="handleFilter">
                  <el-option v-for="item in isAscOptions" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-table
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            height="100%"
          >
            <el-table-column type="expand" fixed="right">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="测试次数">
                    <span>{{ JSON.parse(props.row.config).testTimes }}</span>
                  </el-form-item>
                  <el-form-item label="间隔时长(s)">
                    <span>{{ JSON.parse(props.row.config).testIntervalS }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              min-width="50"
              fixed="right"
            >
              <template slot-scope="scope">
                <span>{{ (listQuery.page - 1) * listQuery.limit + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <template v-for="(item,index) in tableHead">
              <el-table-column v-if="item.property !== 'id'" :key="index" align="center" :prop="item.property" :label="item.label" fixed="right">
                <template slot-scope="scope">
                  <!-- 时间 -->
                  <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>
                  <span v-else-if="scope.row[item.property] === undefined">{{ '无更新记录' }}</span>
                  <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTime(scope.row[item.property]) }}</span>
                  <!-- 按钮 -->
                  <span v-else>{{ scope.row[item.property] }}</span>
                </template>
              </el-table-column>
            </template>
            <!-- 操作 -->
            <el-table-column :label="$t('common.actions')" align="center" width="200" class-name="small-padding fixed-width" fixed="right">
              <template slot-scope="scope">
                <el-button v-perm="'/weTestBusiness/editBusiness'" size="mini" @click="handleUpdate(scope.row)">{{ $t('common.edit') }}</el-button>
                <el-button v-perm="'/weTestBusiness/deleteBusiness'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- Page -->
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />
        </div>
      </el-col>
    </el-row>

    <!-- dialog -->
    <div>
      <!-- ping -->
      <el-dialog
        v-if="dialogVisible"
        :title="$t('route.weTestBusinessConfig')"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        :width="business==='Multi_FTP'?'840px': '790px'"
      >
        <PING v-if="business==='PING'" ref="order" :model="model" />
        <FTP v-if="business==='Multi_FTP'" ref="order" :model="model" />
        <TCP v-if="business==='TCP'" ref="order" :model="model" />
        <UDP v-if="business==='UDP'" ref="order" :model="model" />
        <PBM v-if="business==='PBM'" ref="order" :model="model" />
        <Skype v-if="business==='Skype'" ref="order" :model="model" />
        <WeChat v-if="business===$t('business.weChat')" ref="order" :model="model" />
        <AliPay v-if="business===$t('business.alipay')" ref="order" :model="model" />
        <WeChatPay v-if="business===$t('business.wechatPay')" ref="order" :model="model" />
        <KingOfGlory v-if="business===$t('business.game')" ref="order" :model="model" />
        <TouTiao v-if="business===$t('business.todayNews')" ref="order" :model="model" />
        <JingDong v-if="business===$t('business.jd')" ref="order" :model="model" />
        <TaoBao v-if="business===$t('business.taobao')" ref="order" :model="model" />
        <DouYin v-if="business===$t('business.douyin')" ref="order" :model="model" />
        <TenXunVideo v-if="business===$t('business.tenxun')" ref="order" :model="model" />
        <YouKuVideo v-if="business===$t('business.youku')" ref="order" :model="model" />
        <SouHuVideo v-if="business===$t('business.souhu')" ref="order" :model="model" />
        <DouYinVideo v-if="business===$t('business.douyinvideo')" ref="order" :model="model" />
        <XinLangVideo v-if="business===$t('business.xinlang')" ref="order" :model="model" />
        <CustomVideo v-if="business===$t('business.customvideo')" ref="order" :model="model" />
        <HttpWeb v-if="business===$t('business.httpWeb')||business=='HTTP网页'" ref="order" :model="model" />
        <HuYa v-if="business==='虎牙直播'" ref="order" :model="model" />
        <BaiduMap v-if="business==='百度地图'" ref="order" :model="model" />
        <AppTreasure v-if="business==='应用宝'" ref="order" :model="model" />
        <TencentNews v-if="business==='腾讯新闻'" ref="order" :model="model" />
        <NormalVoiceAll v-if="business === '普通通话'" ref="order" :model="model" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button :disabled="isdisable" type="primary" @click="dialogStatus==='add'?addData():updateData()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import js from './index.js'

export default {
  ...js }

</script>
<style scoped>
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .clearfix:before,
  .clearfix:after {
    clear: both;
    display: table;
    content: "";
  }
  .box-card {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 84px - 28px);
    padding: 20px;
  }
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
  .business-tree {
    height: calc(100vh - 84px - 87px);
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .product-device-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
</style>
