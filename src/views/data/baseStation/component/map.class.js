// import Vue from 'vue'
// import CellLookup from '@/components/map/cellLookup/index.vue'
// import { fetchStationMapList } from '@/api/data/baseStation.js'
// import i18n from '@/lang'
// 引入fleetmap
import 'fleetmap/dist/locale/fleetmap.en'
import 'fleetmap/dist/styles/fleetmap.css'
import FM from 'fleetmap'

export default class FleetCellMap {
  dataLayers = {}
  map
  constructor(divId, mapOptions) {
    const me = this
    // const fleetMap = me.map = new FM.FleetMap(divId, mapOptions)
    me.map = new FM.FleetMap(divId, mapOptions)
    // const wrapper = fleetMap.mapWrapper

    // wrapper.controls.overlays.on('layerchanged', function(e) {
    //   // me.mapWrapper.setView(me.mapWrapper.mapCmp.getCenter())
    //   if (e.node.traceId) {
    //     const layer = me.dataLayers[e.node.traceId]
    //     if (layer) {
    //       layer.setVisible(e.value)
    //       if (layer.store.hasOwnProperty('cendroid')) {
    //         layer.mapWrapper.setView(layer.store.cendroid, 7)
    //       }
    //     } else {
    //       var demo = wrapper.createCellOverlay({
    //         directionKey: 'azimuth',
    //         labelOffset: 0,
    //         labelFields: ['cpi', 'cellName']
    //       })
    //       me.dataLayers[e.node.traceId] = demo
    //       var query = { provinceCitys: [] }
    //       var param = {
    //         province: e.node.province,
    //         citys: []
    //       }
    //       param.citys.push(e.node.city)
    //       query.provinceCitys.push(param)
    //       fetchStationMapList(query).then(res => {
    //         var data = Object.assign([], res.data.data.records)
    //         // eslint-disable-next-line no-irregular-whitespace
    //         data.splice(0, 0, Object.assign([], res.data.data.titles))
    //         demo.setData(data, {
    //           latKey: 'latitude',
    //           lngKey: 'longitude',
    //           crsCode: 'WGS84'
    //         })
    //         wrapper.setView(demo.getStore().getCendroid(), 7)
    //       })
    //     }
    //   }
    //   // wrapper.controls.scrollmsg.addMsg(`<strong>${e.node.name}</strong> value : [${e.oldValue} -> ${e.value}]`)
    // }).on('rangechanged', function(e) {
    //   if (e.node.traceId) {
    //     const layer = me.dataLayers[e.node.traceId]
    //     if (layer) {
    //       layer.setOpacity(e.value / 100.0)
    //     }
    //   }
    //   // wrapper.controls.scrollmsg.addMsg(`<strong>${e.node.name}</strong> value : [${e.oldValue} -> ${e.value}]`)
    // })
    // cell cover
    // wrapper.cellCoverPanel = wrapper.createPanel({
    //   position: 'topleft',
    //   visible: false,
    //   body: '<div id="cell-cover" />',
    //   bodyStyle: {
    //     width: '300px',
    //     height: '400px'
    //   },
    //   data: [1, 2, 3, 4, 5],
    //   resizable: true,
    //   header: {
    //     // icon: '/static/icons/map/chart_icon.svg',
    //     title: i18n.t('analyze.title.cellSelect')
    //   }
    // })
    // // cell sreach
    // const cellSreachPanel = wrapper.cellSreachPanel = wrapper.createPanel({
    //   position: 'topleft',
    //   visible: false,
    //   body: '<div id="cell-lookup" />',
    //   bodyStyle: {
    //     width: '300px',
    //     height: '400px'
    //   },
    //   data: [1, 2, 3, 4, 5],
    //   resizable: true,
    //   header: {
    //     // icon: '/static/icons/map/chart_icon.svg',
    //     title: i18n.t('analyze.title.cellSelect')
    //   }
    // })
    // cellSreachPanel.on('show', function(e) {
    //   // console.log(e)
    //   const target = e.target
    //   const chartEl = target._bodyEl.firstChild
    //   new Vue({
    //     el: chartEl,
    //     name: 'LookupCell',
    //     components: { CellLookup },
    //     data: {
    //       map: this.wrapper
    //     },
    //     template: `<CellLookup />`
    //   })
    //   // console.log(cellSearch)
    //   // const target = e.target
    // })
  }
  remove() {
    this.map.remove()
  }
}
