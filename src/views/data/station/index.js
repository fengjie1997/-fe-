import actList from './data/actList'
import 'fleetmap/dist/locale/fleetmap.en' // 国际化
import 'fleetmap/dist/styles/fleetmap.css' // 样式
import { FleetMap } from 'fleetmap' // 源码
import { GridFormViewer } from './components/index'
export default {
  name: '',
  components: { GridFormViewer },
  data() {
    return {
      map: {},
      mapOptions: {
        center: [21.4845900000, 113.343621],
        zoom: 10,
        contextmenu: true,
        tilelayer: false,
        scalecontrol: true,
        zoomcontrol: true,
        baselayer: true,
        legend: true,
        scrollmsg: false,
        measure: true,
        draw: true,
        locate: true,
        coordpicker: true
      },
      actList: actList,
      gridDrawer: false
    }
  },
  watch: { },
  created() {
    // console.log(FleetMap)
  },
  mounted() {
    this.map = new FleetMap('map', this.mapOptions)
  },
  methods: {
    hanlderDrawerShow(code) {
      switch (code) {
        case 'gridDrawer':
          console.log(this.map)
          this.gridDrawer = true
          break
        default:
          break
      }
    }
  }
}
