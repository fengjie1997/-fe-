import { fetchReportTree } from '@/api/report/report'
import { checkNodeEquals } from '@/utils'
export default {
  name: 'ReportTree',
  components: { },
  data() {
    return {
      reportData: [],
      reportProps: {
        children: 'children',
        label: 'id'
      }

    }
  },
  watch: { },

  created() {
    this.getTree()
  },
  methods: {
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
    handleNode() {},
    handleAddReport(data) {
      console.log(data)
    //   this.tasks = data
      // console.log(data)
    //   this.addTab(this.base5gTabs, '报表')
    }
  }
}
