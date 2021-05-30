import { weTestBusiness } from '@/views/weTest/business/util'
import Pagination from '../../../components/Pagination/index'
import PING from './speed_test/ping'
import FTP from './speed_test/multi_ftp'
import TCP from './speed_test/tcp'
import UDP from './speed_test/udp'
import PBM from './speed_test/pbm'
import WeChat from './ott_basic/wechat'
import Skype from './ott_basic/skype'
import AliPay from './payment/alipay'
import WeChatPay from './payment/wechatpay'
import KingOfGlory from './game/kingofglory'
import TouTiao from './appvisit/toutiao'
import JingDong from './appvisit/jingdong'
import TaoBao from './appvisit/taobao'
import TencentNews from './appvisit/tencentNews'
import DouYin from './douyin/douyin'
import YouKuVideo from './httpvideo/youku'
import DouYinVideo from './httpvideo/douyin'
import SouHuVideo from './httpvideo/souhu'
import XinLangVideo from './httpvideo/xinlang'
import CustomVideo from './httpvideo/custom'
import TenXunVideo from './httpvideo/tenxun'
import HttpWeb from './httpweb/httpweb'
import HuYa from './liveVideo/huya'
import BaiduMap from './map/BaiduMap'
import AppTreasure from './appDownload/appTreasure'
import NormalVoiceAll from './voiceAll/normalVoiceAll'
import { default as ConfigView } from './page/baseConfig.vue'
import { getBusinessList, getBusinessName } from '../../../utils/WeTestBusinessList'
import { fetchList } from '../../../api/WeTest/business'
import waves from '@/directive/waves'
import { createBusiness, deleteBusiness, updateBusiness } from '../../../api/WeTest/business'
import { getTime } from '../../../utils/timeZone'
export default {
  name: 'js',
  components: { Pagination, ConfigView, PING, FTP, TCP, UDP, PBM, Skype, WeChat, AliPay, WeChatPay, KingOfGlory, JingDong, TouTiao, TaoBao, TencentNews, DouYin, DouYinVideo, XinLangVideo, SouHuVideo, TenXunVideo, CustomVideo, YouKuVideo, HttpWeb, HuYa, BaiduMap, AppTreasure, NormalVoiceAll },
  directives: { waves },
  data() {
    return {
      uploadState: true,
      isdisable: false,
      tableHeight: { height: '' },
      table: window.innerHeight - 200,
      id: '',
      model: {},
      dialogVisible: false,
      business: '',
      dialogStatus: '',
      businessData: getBusinessList(),
      spanLeft: 4,
      spanRight: 20,
      total: 0,
      taskType: [],
      listLoading: false,
      listQuery: {
        creator: '',
        page: 1,
        limit: 10,
        search: undefined,
        field: 'id',
        isAsc: 0
      },
      typeOptions: weTestBusiness,
      fieldOptions: [{ label: this.$t('weTest.businessId'), key: 'id' }, { label: this.$t('weTest.createTime'), key: 'createDt' }, { label: this.$t('weTest.updateDt'), key: 'updateDt' }],
      isAscOptions: [{ label: this.$t('common.asc'), key: 1 }, { label: this.$t('common.desc'), key: 0 }],
      list: [],
      tableHead: [{
        property: 'id', label: this.$t('weTest.businessId')
      }, {
        property: 'name', label: this.$t('weTest.businessName')
      }, {
        property: 'taskName', label: this.$t('weTest.businessType')
      }, {
        property: 'creator', label: this.$t('weTest.creator')
      }, {
        property: 'createDt', label: this.$t('weTest.createTime'), time: true
      }, {
        property: 'updator', label: this.$t('weTest.updator')
      }, {
        property: 'updateDt', label: this.$t('weTest.updateDt'), time: true
      }]
    }
  },
  created() {
    this.getList()
    // window.addEventListener('resize', this.getHeight)
    // this.getHeight()
  },
  // destroyed() {
  //   window.removeEventListener('resize', this.getHeight)
  // },
  methods: {
    async getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = data.data.total
        }
        // 数据读取完毕
        this.listLoading = false
      })
    },
    getHeight() {
      this.tableHeight.height = window.innerHeight - 288 + 'px' // 获取浏览器高度减去顶部导航栏
    },
    getTaskName(taskName) {
      return getBusinessName(taskName)
    },
    getTime(time) {
      return getTime(time, this.$store.getters.timezone)
    },
    addBusiness(data) {
      this.isdisable = false
      this.business = data.name.toString()
      console.log(this.business)
      this.model = {}
      this.dialogStatus = 'add'
      this.dialogVisible = true
    },
    addData() {
      if (this.$refs.order.submitForm()) {
        this.isdisable = true
      }
      this.$refs.order.submitForm().then((valid) => {
        createBusiness(this.model).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.createSuccess'),
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.isdisable = false
            this.dialogVisible = false
          }
        })
      }, () => {
        this.$alert('提交参数有误，请检查', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.isdisable = false
          }
        })
      })
    },
    handleDelete(row) {
      this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
        center: false
      }).then(() => {
        if (row.id !== '') {
          deleteBusiness(row.id).then(response => {
            if (response.data.code === 1) {
              this.getList()
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.isdisable = false
      this.id = row.id
      this.business = getBusinessName(row.taskName.toString())
      if (this.business.substring(0, 11) === '(HttpVideo)') {
        this.business = '自定义视频'
      }
      if (this.business.substring(0, 9) === '(HttpWeb)' || JSON.parse(row.config).task === 'http_web') {
        this.business = 'HTTP网页'
      }
      this.model = JSON.parse(row.config)
      this.dialogStatus = 'update'
      this.dialogVisible = true
      // this.$refs[handleUpdate].Update(row)
    },
    cancelForm() {
      this.dialogVisible = false
      this.model = {}
    },
    updateData() {
      this.isdisable = true
      this.$refs.order.submitForm().then((valid) => {
        updateBusiness(this.id, this.model).then(response => {
          if (response.data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
            this.isdisable = false
          }
          this.getList()
        })
        this.dialogVisible = false
      }, () => {
        this.$alert('提交参数有误，请检查', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.isdisable = false
          }
        })
      })
    },
    handleSwitchLeftGroup(data) {
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSwitchSpan() {
      if (this.spanLeft === 6) {
        this.spanLeft = 1
        this.spanRight = 23
      } else {
        this.spanLeft = 6
        this.spanRight = 18
      }
    },
    /**
     * 选择业务类型，返回type(第二级业务)、task(第一级业务)
     */
    getTaskAndTaskName() {
      if (this.taskType.length === 0) {
        this.listQuery.type = []
      } else if (this.taskType.length === 1) {
        console.log(this.taskType)
        this.listQuery.type = []
        for (const i in this.typeOptions[Number(this.taskType[0]) - 1].children) {
          this.listQuery.type.push(this.typeOptions[Number(this.taskType[0]) - 1].children[i].value)
        }
      } else {
        if (this.taskType[1] !== undefined) {
          this.listQuery.type = []
          this.listQuery.type.push(this.taskType[1])
        }
      }
    }
  }
}

