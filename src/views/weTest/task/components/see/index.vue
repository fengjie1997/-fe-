<template>
  <div>
    <div class="app-container">
      <div class="filter-container1">
        <el-form ref="dataForm" :inline="true" class="demo-form-inline" :rules="rules" :model="model">
          <el-form-item :label="$t('WeTestTableHead.jobName')" prop="name">
            <el-input v-model="model.name" disabled />
          </el-form-item>
          <el-form-item label="截止时间" prop="endTime">
            <el-date-picker
              v-model="model.endDt"
              value-format="timestamp"
              type="datetime"
              :default-value="defaultTime"
              disabled
              @change="getTime"
            />
          </el-form-item>
        </el-form>
      </div>
      <div>

        <el-table
          v-loading="listLoading"
          :data="taskList"
          border
          height="408"
        >
          <el-table-column type="expand">
            <template slot-scope="props" style="">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="测试次数">
                  <span>{{ props.row.testTimes }}</span>
                </el-form-item>
                <el-form-item label="间隔时长(s)">
                  <span>{{ props.row.testIntervalS }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <template v-for="(item,index) in taskTableHead">
            <el-table-column :key="index" align="center" :prop="item.property" :label="item.label">
              <template slot-scope="scope">
                <!-- 时间 -->
                <span v-if="item.property === 'taskName'">{{ getTaskName(scope.row[item.property]) }}</span>
                <span v-else-if="item.time && scope.row[item.property] !== undefined">{{ getTimes(scope.row[item.property]) }}</span>
                <span v-else-if="item.property==='task'">{{ getBusinessType(scope.row[item.property]) }}</span>
                <span v-else>{{ scope.row[item.property] }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column :label="$t('common.actions')" align="center" width="160">
            <template slot-scope="scope">
              <el-button v-waves :loading="listLoading" class="filter-item" type="primary" @click="handleSee(scope.row,scope)">{{ '业务详情' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <!-- ping -->
        <el-dialog
          v-if="dialogVisible"
          :title="$t('route.weTestBusinessConfig')"
          :visible.sync="dialogVisible"
          append-to-body
          width="790px"
        >
          <PING v-if="business==='PING'" ref="order" :model="businessData" />
          <FTP v-if="business==='Multi_FTP'" ref="order" :model="businessData" />
          <TCP v-if="business==='TCP'" ref="order" :model="businessData" />
          <UDP v-if="business==='UDP'" ref="order" :model="businessData" />
          <PBM v-if="business==='PBM'" ref="order" :model="businessData" />
          <Skype v-if="business==='Skype'" ref="order" :model="businessData" />
          <WeChat v-if="business===$t('business.weChat')" ref="order" :model="businessData" />
          <AliPay v-if="business===$t('business.alipay')" ref="order" :model="businessData" />
          <WeChatPay v-if="business===$t('business.wechatPay')" ref="order" :model="businessData" />
          <KingOfGlory v-if="business===$t('business.game')" ref="order" :model="businessData" />
          <TouTiao v-if="business===$t('business.todayNews')" ref="order" :model="businessData" />
          <JingDong v-if="business===$t('business.jd')" ref="order" :model="businessData" />
          <TaoBao v-if="business===$t('business.taobao')" ref="order" :model="businessData" />
          <DouYin v-if="business===$t('business.douyin')" ref="order" :model="businessData" />
          <TenXunVideo v-if="business===$t('business.tenxun')" ref="order" :model="businessData" />
          <YouKuVideo v-if="business===$t('business.youku')" ref="order" :model="businessData" />
          <SouHuVideo v-if="business===$t('business.souhu')" ref="order" :model="businessData" />
          <DouYinVideo v-if="business===$t('business.douyinvideo')" ref="order" :model="businessData" />
          <XinLangVideo v-if="business===$t('business.xinlang')" ref="order" :model="businessData" />
          <CustomVideo v-if="business===$t('business.customvideo')" ref="order" :model="businessData" />
          <HttpWeb v-if="business===$t('business.httpWeb')||business==='HTTP网页'" ref="order" :model="businessData" />
          <HuYa v-if="business==='虎牙直播'" ref="order" :model="businessData" />
          <BaiduMap v-if="business==='百度地图'" ref="order" :model="businessData" />
          <AppTreasure v-if="business==='应用宝'" ref="order" :model="businessData" />
          <TencentNews v-if="business==='腾讯新闻'" ref="order" :model="businessData" />
          <NormalVoiceAll v-if="business === '普通通话'" ref="order" :model="businessData" />
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cancel()">{{ $t('common.confirm') }}</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
import waves from '../../../../../directive/waves/waves'
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
import HttpWeb from '../../../business/httpweb/httpweb'
import HuYa from '../../../business/liveVideo/huya'
import BaiduMap from '../../../business/map/BaiduMap'
import AppTreasure from '../../../business/appDownload/appTreasure'
import TencentNews from '../../../business/appvisit/tencentNews'
import NormalVoiceAll from '../../../business/voiceAll/normalVoiceAll'
import { fetchList } from '../../../../../api/WeTest/business'
import { getTimeZone, getTime } from '../../../../../utils/timeZone'
import { getBusinessName, getBusinessTypeName } from '../../../../../utils/WeTestBusinessList'

export default {
  name: 'See',
  components: { NormalVoiceAll, PING, FTP, TCP, UDP, PBM, Skype, WeChat, AliPay, WeChatPay, KingOfGlory, JingDong, TouTiao, TaoBao, DouYin, DouYinVideo, XinLangVideo, SouHuVideo, TenXunVideo, CustomVideo, YouKuVideo, HttpWeb, TencentNews, HuYa, BaiduMap, AppTreasure },
  directives: { waves },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      /**
         * 大小
         */
      spanLeft: 12,
      spanRight: 12,
      /**
         * 左侧新增业务状态
         */
      dialogVisible: false,
      business: '',
      businessData: {},
      taskTable: {},
      selectData: [],
      defaultTime: getTimeZone(this.$store.getters.timezone),
      // 数据
      time: '',
      temp: {
        appType: 1,
        endDt: '',
        loopInterval: 5,
        loopTimes: 1,
        name: '',
        tasks: []
      },
      total: 0,
      taskIndex: '',
      listLoading: true,
      businessList: [],
      taskList: [],
      taskTableHead: [{
        property: 'task', label: '业务类型'
      }, {
        property: 'name', label: '业务名称'
      }, {
        property: 'taskName', label: '测试业务'
      }],
      tableHead: [{
        property: 'creator', label: this.$t('weTest.creator')
      }, {
        property: 'name', label: this.$t('weTest.businessName')
      }, {
        property: 'taskName', label: this.$t('weTest.businessType')
      }, {
        property: 'createDt', label: this.$t('weTest.createTime'), time: true
      }],
      rules: {
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }, { required: true, message: '请选择任务的截止时间', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.init()
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchList(this.temp).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.businessList = data.data.records
          this.total = data.data.total
        }
        this.listLoading = false
      })
    },
    init() {
      if (this.model.name === undefined) {
        for (const j in this.temp) {
          this.$set(this.model, j, this.temp[j])
        }
      } else {
        for (let i = 0; i < JSON.parse(this.model.config).length; i++) {
          this.taskList[i] = {}
          this.taskList[i] = JSON.parse(this.model.config)[i]
        }
      }
    },
    /**
       * 时间数据渲染表格
       */
    getTimes(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    /**
       *task业务类型
       */
    getBusinessType(task) {
      return getBusinessTypeName(task)
    },
    getTime() {
    },
    getTaskName(taskName) {
      return getBusinessName(taskName)
    },
    /**
       * 更新业务数据，不修改数据库
       * @returns {*}
       */
    handleSee(data) {
      this.business = getBusinessName(data.taskName.toString())
      if (this.business.substring(0, 11) === '(HttpVideo)') {
        this.business = '自定义视频'
      }
      if (this.business.substring(0, 9) === '(HttpWeb)' || data.task === 'http_web') {
        this.business = 'HTTP网页'
      }
      data.state = true
      this.businessData = data
      this.dialogVisible = true
    },
    cancel() {
      this.dialogVisible = false
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
