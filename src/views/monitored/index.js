import { StatusView } from './unit'
import { checkNodeEquals } from '@/utils'
import { fetchGroupList } from '../../api/monitored/monitored'
// import { getThreeDeviceGroupIdsBySeconds } from '../../utils/MonitoredTable'
import Summary from './summary/index'
import DeviceStatus from './device_status/index'
import AlarmDetails from './alarm_details/index'
import EventDetails from './event_details/index'
import LoginLog from './login_log/index'
import StateStatistics from './state_statistics'
import DeviceLog from './device_log/index'
import Trajectory from './unit/trajectory.vue'
import splitPane from 'vue-splitpane'
import FleetCardTable from '@/components/FleetCardTable'
export default {
  components: { splitPane, StatusView, Summary, DeviceStatus, AlarmDetails, EventDetails, Trajectory, LoginLog, StateStatistics, DeviceLog,
    FleetCardTable
  },
  data() {
    return {
      bool: true,
      select: 'summary',
      model: {
        // 作为切换使用传值
        groupIds: [],
        // 设备管理第三级数据
        groups: [],
        // 获取二级联动下的组管理信息
        groupOption: []
      },
      listLoading: true,
      list: [],
      // 左侧设备管理树
      treeData: [],
      listQuery: {
      },
      tableHeight: window.innerHeight - 100,
      table: false,
      currentRow: {
        groupId: undefined,
        groupName: undefined
      },
      deviceProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      multipleSelection: []
    }
  },
  created() {
    this.getGroupList()
  },
  methods: {
    jump() {
      window.console.log('haved run ')
      this.$router.push({
        path: '/airFleet'
      })
    },
    // 获取分组信息
    getGroupList() {
      fetchGroupList().then(res => {
        if (res.data.code === 1) {
          this.treeData = res.data.data
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return checkNodeEquals(data, value)
    },
    load(tree, treeNode, resolve) {
      console.log('触发懒加载事件: ', tree, treeNode)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleTest() {
      this.setMonitoredGroup({ groupId: -1, groupName: 'Device' })
    },
    /**
     * 设置vuex的monitor选中组
     */
    setMonitoredGroup({ groupId, groupName }) {
      this.$store.dispatch('SetMonitoredGroup', {
        groupId: groupId,
        groupName: groupName
      }).then(() => {
        // alert('ok')
      }).catch(() => {
        // 错误框
      })
    },
    /**
     * 修改选中按钮
     */
    handleSelectButton() {
      this.currentRow = {
        groupId: this.$store.getters.monitoredGroupId,
        groupName: this.$store.getters.monitoredGroupName
      }
      this.table = true
    },
    handleTabClick(tab, event) {
      switch (tab.label) {
        case this.$t('device.summary'): this.select = 'summary'; break
        case this.$t('device.deviceStatus'): this.select = 'deviceStatus'; break
        case this.$t('device.alarmDetails'): this.select = 'alarmDetails'; break
        case this.$t('device.eventDetails'): this.select = 'eventDetails'; break
        case this.$t('device.trajectory'): this.select = 'trajectory'; break
        case this.$t('device.loginLog'): this.select = 'loginLog'; break
        case this.$t('device.stateStatistics'): this.select = 'stateStatistics'; break
        case this.$t('device.deviceLog'): this.select = 'deviceLog'; break
      }
      if (this.select === 'trajectory') {
        const newWindow = this.$router.resolve({
          path: '/airFleet'
        })
        console.log(newWindow)
        window.open(newWindow.href, '_blank')
      }
    },
    handleNodeClick(data) {
      this.model.groupIds = []
      // 收集分组ID
      const collectGroups = (data) => {
        this.model.groupIds.push(data.id)
        if (data.children) {
          for (const item of data.children) {
            collectGroups(item)
          }
        }
      }
      collectGroups(data)
      // 刷新对应Tab页数据
      switch (this.select) {
        case 'summary': this.$refs.summary.getList(); break
        case 'deviceStatus': this.$refs.deviceStatus.getList(); break
        case 'alarmDetails': this.$refs.alarmDetails.getList(); break
        case 'eventDetails': this.$refs.eventDetails.getList(); break
        // case 'eventDetails': this.select = 'trajectory'; break
        case 'loginLog': this.$refs.loginLog.getList(); break
        case 'stateStatistics': this.$refs.stateStatistics.getList(); break
        case 'mos': this.$refs.mos.getList(); break
        case 'deviceLog': this.$refs.deviceLog.getList(); break
      }
    },
    handleRefresh() {
      this.model.groupIds = []
      this.getGroupList()
      switch (this.select) {
        case 'summary': this.$refs.summary.getList(); break
        case 'deviceStatus': this.$refs.deviceStatus.getList(); break
        case 'alarmDetails': this.$refs.alarmDetails.getList(); break
        case 'eventDetails': this.$refs.eventDetails.getList(); break
        // case 'eventDetails': this.select = 'trajectory'; break
        case 'loginLog': this.$refs.loginLog.getList(); break
        case 'stateStatistics': this.$refs.stateStatistics.getList(); break
        case 'mos': this.$refs.mos.getList(); break
        case 'deviceLog': this.$refs.deviceLog.getList(); break
      }
    }
  }
}
