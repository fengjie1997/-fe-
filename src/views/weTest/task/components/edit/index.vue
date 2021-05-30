<template>
  <div>
    <div class="app-container">
      <div class="filter-container1">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item :label="$t('WeTestTableHead.jobName')">
            <el-input v-model="model.name" />
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
              v-model="time"
              value-format="timestamp"
              type="datetimerange"
              range-separator="至"
              :picker-options="pickerOptions0"
            />
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          style="width: auto"
          height="350"
        >
          <el-table-column type="expand">
            <template slot-scope="props" style="">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="测试次数">
                  <span>{{ JSON.parse(props.row.config).testTimes }}</span>
                </el-form-item>
                <el-form-item label="间隔时长1(s)">
                  <span>{{ JSON.parse(props.row.config).testIntervalS }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <template v-for="(item,index) in tableHead">
            <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
              <template slot-scope="scope">
                <!-- 时间 -->
                <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>
                <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTime(scope.row[item.property]) }}</span>
                <!-- 按钮 -->
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column :label="$t('common.actions')" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--                &lt;!&ndash; Page &ndash;&gt;-->
        <!--                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" class="dialog-pagination" @pagination="getList" />-->
      </div>

    </div>
    <!-- 参数编辑 -->
    <div>
      <!-- ping -->
      <el-dialog
        v-if="dialogVisible"
        :title="$t('route.weTestBusinessConfig')"
        :visible.sync="dialogVisible"
        append-to-body
        :modal-append-to-body="false"
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
        <HttpWeb v-if="businessName===$t('business.httpWeb')" :model="business" />
        <HuYa v-if="business==='虎牙直播'" ref="order" :model="model" />
        <BaiduMap v-if="business==='百度地图'" ref="order" :model="model" />
        <AppTreasure v-if="business==='应用宝'" ref="order" :model="model" />
        <TencentNews v-if="business==='腾讯新闻'" ref="order" :model="model" />
        <NormalVoiceAll v-if="business === '普通通话'" ref="order" :model="model" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="updateData()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import waves from '../../../../../directive/waves/waves'
import { getBusinessName } from '../../../../../utils/WeTestBusinessList'
import { getTimeZone } from '../../../../../utils/timeZone'
import PING from '../../../business/speed_test/ping'
import FTP from '../../../business/speed_test/multi_ftp'
import TCP from '../../../business/speed_test/tcp'
import UDP from '../../../business/speed_test/udp'
import PBM from '../../../business/speed_test/pbm'
import WeChat from '../../../business/ott_basic/wechat'
import Skype from '../../../business/ott_basic/skype'
import AliPay from '../../../business/payment/alipay'
import WeChatPay from '../../../business/payment/wechatpay'
import KingOfGlory from '../../../business/game/kingofglory'
import TouTiao from '../../../business/appvisit/toutiao'
import JingDong from '../../../business/appvisit/jingdong'
import TaoBao from '../../../business/appvisit/taobao'
import DouYin from '../../../business/douyin/douyin'
import YouKuVideo from '../../../business/httpvideo/youku'
import DouYinVideo from '../../../business/httpvideo/douyin'
import SouHuVideo from '../../../business/httpvideo/souhu'
import XinLangVideo from '../../../business/httpvideo/xinlang'
import CustomVideo from '../../../business/httpvideo/custom'
import TenXunVideo from '../../../business/httpvideo/tenxun'
import HttpWeb from '../../../business/speed_test/http_web'
import TencentNews from '../../../business/appvisit/tencentNews'
import HuYa from '../../../business/liveVideo/huya'
import BaiduMap from '../../../business/map/BaiduMap'
import AppTreasure from '../../../business/appDownload/appTreasure'
import NormalVoiceAll from '../../../business/voiceAll/normalVoiceAll'
export default {
  name: 'Edit',
  components: { TencentNews, HuYa, BaiduMap, AppTreasure, NormalVoiceAll, PING, FTP, TCP, UDP, PBM, Skype, WeChat, AliPay, WeChatPay, KingOfGlory, JingDong, TouTiao, TaoBao, DouYin, DouYinVideo, XinLangVideo, SouHuVideo, TenXunVideo, CustomVideo, YouKuVideo, HttpWeb },
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7// 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      dialogVisible: false,
      businessName: '',
      business: {},
      defaultTime: getTimeZone(this.$store.getters.timezone),
      time: [new Date(this.model.startDt), new Date(this.model.endDt)],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        field: 'id',
        isAsc: 1
      },
      fieldOptions: [{ label: 'ID', key: 'id' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      list: '',
      tableHead: [{
        property: 'name', label: this.$t('weTest.businessName')
      }, {
        property: 'taskName', label: this.$t('weTest.businessType')
      }, {
        property: 'testTimes', label: this.$t('parameter.tryNum')
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.list = JSON.parse(this.model.config)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleEdit(row) {
      this.businessName = row.taskName.toString()
      this.business = row
      this.dialogVisible = true
      this.getList()
    },
    getTaskName(taskName) {
      return getBusinessName(taskName)
    },
    updateData() {
      this.model.config = this.business
      this.dialogVisible = false
    },
    cancelForm() {
      this.dialogVisible = false
      this.getList()
    }
  }
}

</script>
<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
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
