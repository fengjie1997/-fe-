<template>
  <div>
    <el-row>
      <!--左侧业务列表-->
      <el-col :span="spanLeft">
        <div>
          <el-card class="box-card">
            <div>
              <div class="app-container">
                <div>
                  <div class="filter-container">
                    <el-form :inline="true" style="margin-bottom: auto">
                      <el-form-item label="任务名称">
                        <el-input v-model="listQuery.name" style="width: 100px;" class="filter-item" />                </el-form-item>
                      <el-form-item label="任务状态">
                        <el-select v-model="listQuery.status" style="width: 120px;" class="filter-item">
                          <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label" />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="下发者">
                        <el-input v-model="listQuery.creator" style="width: 120px;" class="filter-item" />
                      </el-form-item>
                      <el-form-item>
                        <el-button v-waves :loading="listLoading" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('common.search') }}</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-table
                    ref="multipleTable"
                    v-loading="listLoading"
                    :data="taskList"
                    border
                    height="360"
                  >
                    <template v-for="(item,index) in taskTableHead">
                      <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
                        <template slot-scope="scope">
                          <!-- 时间 -->
                          <span v-if="item.property === 'groupId'">{{ getGroupName(scope.row[item.property]) }}</span>
                          <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTime(scope.row[item.property]) }}</span>
                          <span v-else-if="item.property === 'status'">{{ getStatus(scope.row[item.property]) }}</span>
                          <span v-else>{{ scope.row[item.property] }}</span>
                        </template>
                      </el-table-column>
                    </template>
                    <el-table-column :label="$t('common.actions')" align="center" class-name="small-padding fixed-width">
                      <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="getBusinessList(scope.row)">{{ $t('weTest.searchBusiness') }}</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- Page -->
                  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 右侧任务配置 -->
      <el-col :span="spanRight">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clear-fix">
              <span>业务列表</span>
            </div>
            <div class="app-container">
              <div>
                <el-table
                  v-loading="listLoading"
                  :data="businessList"
                  border
                  height="408"
                >
                  <template v-for="(item,index) in businessTableHead">
                    <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
                      <template slot-scope="scope">
                        <!-- 时间 -->
                        <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>
                        <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTime(scope.row[item.property]) }}</span>
                        <span v-else>{{ scope.row[item.property] }}</span>
                      </template>
                    </el-table-column>
                  </template>
                  <el-table-column :label="$t('common.actions')" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="getParameter(scope.row)">{{ $t('weTest.searchParameter') }}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-dialog
        v-if="dialogVisible"
        :title="$t('route.weTestBusinessConfig')"
        :visible.sync="dialogVisible"
        append-to-body
        width="790px"
      >
        <PING v-if="businessName==='PING'" :model="business" />
        <FTP v-if="businessName==='Multi_FTP'" :model="business" />
        <TCP v-if="businessName==='TCP'" :model="business" />
        <UDP v-if="businessName==='UDP'" :model="business" />
        <PBM v-if="businessName==='PBM'" :model="business" />
        <Skype v-if="businessName==='Skype'" :model="business" />
        <WeChat v-if="businessName===$t('business.weChat')" :model="business" />
        <AliPay v-if="businessName===$t('business.alipay')" :model="business" />
        <WeChatPay v-if="businessName===$t('business.wechatPay')" :model="business" />
        <KingOfGlory v-if="businessName===$t('business.game')" :model="business" />
        <TouTiao v-if="businessName===$t('business.todayNews')" :model="business" />
        <JingDong v-if="businessName===$t('business.jd')" :model="business" />
        <TaoBao v-if="businessName===$t('business.taobao')" :model="business" />
        <DouYin v-if="businessName===$t('business.douyin')" :model="business" />
        <TenXunVideo v-if="businessName===$t('business.tenxun')" :model="business" />
        <YouKuVideo v-if="businessName===$t('business.youku')" :model="business" />
        <SouHuVideo v-if="businessName===$t('business.souhu')" :model="business" />
        <DouYinVideo v-if="businessName===$t('business.douyinvideo')" :model="business" />
        <XinLangVideo v-if="businessName===$t('business.xinlang')" :model="business" />
        <CustomVideo v-if="businessName===$t('business.customvideo')" :model="business" />
        <HttpWeb v-if="businessName===$t('business.httpWeb')||businessName==='HTTP网页'" :model="business" />
        <HuYa v-if="businessName==='虎牙直播'" :model="business" />
        <BaiduMap v-if="businessName==='百度地图'" :model="business" />
        <AppTreasure v-if="businessName==='应用宝'" :model="business" />
        <TencentNews v-if="businessName==='腾讯新闻'" :model="business" />
        <NormalVoiceAll v-if="businessName === '普通通话'" :model="business" />
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirm()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { getTestPlanStatus } from '../../../../utils/WeTestTable'
import { getBusinessName } from '../../../../utils/WeTestBusinessList'
import { getTime } from '../../../../utils/timeZone'
import { selectHistory } from '../../../../api/WeTest/device'
import { getThreeDeviceGroupIds } from '../../../../utils/MonitoredTable'
import PING from '../../business/speed_test/ping'
import FTP from '../../business/speed_test/multi_ftp'
import TCP from '../../business/speed_test/tcp'
import UDP from '../../business/speed_test/udp'
import PBM from '../../business/speed_test/pbm'
import WeChat from '../../business/ott_basic/wechat'
import Skype from '../../business/ott_basic/skype'
import AliPay from '../../business/payment/alipay'
import WeChatPay from '../../business/payment/wechatpay'
import KingOfGlory from '../../business/game/kingofglory'
import TouTiao from '../../business/appvisit/toutiao'
import JingDong from '../../business/appvisit/jingdong'
import TaoBao from '../../business/appvisit/taobao'
import DouYin from '../../business/douyin/douyin'
import YouKuVideo from '../../business/httpvideo/youku'
import DouYinVideo from '../../business/httpvideo/douyin'
import SouHuVideo from '../../business/httpvideo/souhu'
import XinLangVideo from '../../business/httpvideo/xinlang'
import CustomVideo from '../../business/httpvideo/custom'
import TenXunVideo from '../../business/httpvideo/tenxun'
import HttpWeb from '../../business/httpweb/httpweb'
import TencentNews from '../../business/appvisit/tencentNews'
import HuYa from '../../business/liveVideo/huya'
import BaiduMap from '../../business/map/BaiduMap'
import AppTreasure from '../../business/appDownload/appTreasure'
import NormalVoiceAll from '../../business/voiceAll/normalVoiceAll'
export default {
  name: 'History',
  directives: { waves },
  components: { TencentNews, HuYa, BaiduMap, AppTreasure, NormalVoiceAll, PING, FTP, TCP, UDP, PBM, Skype, WeChat, AliPay, WeChatPay, KingOfGlory, JingDong, TouTiao, TaoBao, DouYin, DouYinVideo, XinLangVideo, SouHuVideo, TenXunVideo, CustomVideo, YouKuVideo, HttpWeb, Pagination },
  props: {
    model: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      /**
         * 大小
         */
      total: 0,
      dialogVisible: false,
      spanLeft: 12,
      spanRight: 12,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        status: '',
        creator: ''
      },
      groupIds: [],
      /**
         * 左侧业务
         */
      listLoading: true,
      taskList: '',
      businessList: [],
      businessName: '',
      statusOptions: [{ label: '取消', value: 0 }, { label: '未接收', value: 1 }, { label: '传输中', value: 2 }, { label: '已接收', value: 3 }, { label: '测试中', value: 4 }, { label: '测试完成', value: 5 }],
      taskTableHead: [{
        property: 'name', label: this.$t('weTest.taskName')
      }, {
        property: 'creator', label: this.$t('WeTestTableHead.distributor')
      }, {
        property: 'uuid', label: this.$t('WeTestTableHead.uuid')
      }, {
        property: 'deviceModel', label: this.$t('WeTestTableHead.deviceModel')
      }, {
        property: 'groupId', label: this.$t('WeTestTableHead.groupId')
      }, {
        property: 'status', label: '任务状态'
      }, {
        property: 'createDt', label: this.$t('WeTestTableHead.distributeDt'), time: true
      }, {
        property: 'endDt', label: '截止时间', time: true
      }],
      businessTableHead: [{
        property: 'name', label: this.$t('weTest.businessName')
      }, {
        property: 'taskName', label: this.$t('weTest.businessType')
      }, {
        property: 'testTimes', label: this.$t('weTest.testNumber')
      }, {
        property: 'testIntervalS', label: this.$t('parameter.testIntervalS')
      }],
      business: {}
    }
  },
  created() {
    this.getList()
    this.getGroupIds()
  },
  methods: {
    /**
       * 左侧任务
       */
    getTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    getStatus(data) {
      return getTestPlanStatus(data)
    },
    getList() {
      selectHistory(this.model[0], 1, this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.taskList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    getGroupIds() {
      this.groupIds = getThreeDeviceGroupIds()
    },
    getGroupName(id) {
      for (const i in this.groupIds) {
        if (id === this.groupIds[i].id) {
          return this.groupIds[i].name
        }
      }
    },
    getTaskName(taskName) {
      return getBusinessName(taskName)
    },
    getBusinessList(data) {
      this.businessList = JSON.parse(data.config)
    },
    getParameter(data) {
      this.businessName = getBusinessName(data.taskName)
      if (this.businessName.substring(0, 11) === '(HttpVideo)') {
        this.businessName = '自定义视频'
      }
      if (this.businessName.substring(0, 9) === '(HttpWeb)' || data.task === 'http_web') {
        this.businessName = 'HTTP网页'
      }
      data.state = true
      this.business = data
      this.dialogVisible = true
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleConfirm() {
      this.dialogVisible = false
    }
  }
}

</script>
<style scoped>
  .clear-fix:before,
  .clear-fix:after {
    clear: both
  }

  .box-card {
    margin: 5px 0px 5px 5px;
    height: 600px;
  }
  .dialog-pagination {
    margin-top:5px;
    padding:10px 16px;
  }
  .app-container{
    padding: 5px;
  }
</style>
