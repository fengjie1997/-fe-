import ElCollapse from './collapse/collapse.vue'
import ElCollapseItem from './collapse/collapse-item.vue'
export default {
  name: 'Menutree',
  components: { ElCollapse, ElCollapseItem },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
