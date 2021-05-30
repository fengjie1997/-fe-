import { TestPlanEditView } from '@/components/TestPlanTemplate/index.js'
import { checkNodeEquals } from '@/utils'
import { fetchTemplateTree } from '@/api/template/template'

export default {
  components: {
    TestPlanEditView
  },
  data() {
    return {
      /**
       * 大小
       */
      spanLeft: 5,
      spanRight: 19,
      treeData: [],
      props: {
        children: 'children',
        label: 'id'
      }
    }
  },
  watch: {
    /**
     * 编辑框触发过滤方法
     */
    menuFilterText(val) {
      this.$refs.Tree.filter(val)
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return checkNodeEquals(data, value)
    },
    /**
     * 大小
     */
    handleSwitchSpan() {
      if (this.spanLeft === 5) {
        this.spanLeft = 1
        this.spanRight = 23
      } else {
        this.spanLeft = 5
        this.spanRight = 19
      }
    },
    /**
     * --------------------------
     * 模板左侧树
     * --------------------------
     */
    getTree() {
      fetchTemplateTree().then(response => {
        const res = response.data
        if (res.code === 1) {
          this.treeData = res.data
        }
      })
    }

  }
}
