import actList from './data/actList'
import 'fleetmap/dist/locale/fleetmap.en'
import 'fleetmap/dist/styles/fleetmap.css'
import FM from 'fleetmap'
import { GridFormViewer, EventFormViewer } from './components/index'
export default {
  name: '',
  components: { GridFormViewer, EventFormViewer },
  data() {
    return {
      loading: false,
      map: {},
      dialogName: '数据分析',
      actList: actList,
      searchDreawer: false,
      activeDrawer: ''
    }
  },
  watch: { },
  created() { },
  mounted() {
    // eslint-disable-next-line no-irregular-whitespace
    this.map = (new FM.FleetMap('map',
      { overlay: true, baselayer: true, center: [31.86157, 117.28565],
        zoom: 12,
        scalecontrol: true,
        zoomcontrol: true,
        toolbar: true,
        overlaysex: true,
        legend: true,
        scrollmsg: false,
        measure: true,
        draw: true,
        locate: true,
        coordpicker: true
      })).mapWrapper
    console.log(this.map)
  },
  methods: {
    Toloading(msg) {
      this.loading = msg
    },
    setLoading(bool) {
      this.loading = bool
    },
    closeDialog() {
      this.searchDreawer = false
    },
    handleReseach() {
      // 重置地图数据
      this._resetMap()

      switch (this.activeDrawer) {
        case 'gridDrawer':
          console.log(this.$refs.gridDrawer)
          this.$refs.gridDrawer.findIt(this.map)
          break
        case 'eventDrawer':
          this.$refs.eventDrawer.handleSearch(this.map)

          break
        default:
          break
      }
    },
    // eventDrawer
    hanlderDrawerShow(code, name) {
      this.dialogName = name
      switch (code) {
        case 'gridDrawer':
          this.activeDrawer = code
          this.searchDreawer = true
          break
        case 'eventDrawer':
          this.activeDrawer = code
          this.searchDreawer = true
          break
        default:
          break
      }
    },
    _resetMap() {
      const map = this.map
      // 清空地图现有数据层
      if (map.dataLayers) {
        for (const layerKey in map.dataLayers) {
          map.controls.legend.unregister(map.dataLayers[layerKey])
          map.dataLayers[layerKey].destroy()
        }
      }
      map.dataLayers = {}
      if (map.eventDataLayer) {
        map.eventDataLayer.destroy()
        delete map.eventDataLayer
      }
      // 清除图表
      if (map.echartPanel) {
        map.echartPanel.destroy()
        delete map.echartPanel
      }
    }
  },
  destroyed() {
    this.map.remove()
  }
}
