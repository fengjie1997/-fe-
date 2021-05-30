import { fetchReportTree } from '@/api/report/report'
import { checkNodeEquals } from '@/utils'
import { ReportListView, ReportForm } from './components/index'
import FleetCardTable from '@/components/FleetCardTable'

export default {
  name: 'Report',
  components: { FleetCardTable, ReportListView, ReportForm },
  data() {
    return {
      reportData: [],
      reportProps: {
        children: 'children',
        label: 'id'
      },
      tabIndex: 0,
      base5gTabs: [],
      tasks: '',
      activeName: 'reportList'
    }
  },
  watch: { },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    getTreeMenuName(data) {
      const language = this.language
      return data.id < 0 ? (language === 'zh' || language === 'tw' ? data.menuNameCh : data.menuNameEn) : (language === 'zh' || language === 'tw' ? data.nameCh : data.nameEh)
    },
    getTree() {
      fetchReportTree().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.reportData = res.data
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return checkNodeEquals(data, value)
    },
    handleNode(v, e) {
      this.$refs.listView.getQueryList([e.parent.data.id, v.id], v.type)
    },
    handleAddReport(data) {
      data.name = this.language === 'zh' || this.language === 'tw' ? data.nameCh : data.nameEh
      this.tasks = data
      this.addTab(this.base5gTabs, data.name)
    },
    addTab(list, tabName) {
      const newTabName = ++this.tabIndex + ''
      list.push({
        title: tabName,
        name: newTabName
      })
      this.activeName = newTabName
    },
    removeTab(targetName) {
      const tabs = this.base5gTabs
      if (this.activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              this.activeName = nextTab.name
            } else {
              this.activeName = 'reportList'
            }
          }
        })
      }
      this.base5gTabs = tabs.filter(tab => tab.name !== targetName)
    },
    submitReportSuccess(name) {
      this.removeTab(name)
      this.activeName = 'reportList'
      this.$refs.listView.getList()
    }
  }
}
