import Vue from 'vue'
// import echarts from 'echarts'
import CellLookup from '@/components/map/cellLookup/index.vue'
// import * as d3 from 'd3'
// import { fetchStationMapList } from '@/api/data/baseStation.js'
// 可根据框架选择对应的包装版本
// import LeafletWrapper from '@/utils/map/fleet-leaflet/leaflet2fleetmap'
export const FLEET_MAP_ENGINE_LEAFLET = 'leaflet'

export default class AnalyzeMap {
  dataLayers = {}
  constructor(divId, mapOptions) {
    const op = this.options = Object.assign({}, {
      engine: 'leaflet',
      overlay: true,
      baselayer: true,
      toolbar: true,
      legend: true,
      tilelayer: true
    }, mapOptions)
    // var me = this
    const wrapper = this.getMapWrapper(divId, op)
    // cell cover
    wrapper.cellCoverPanel = wrapper.createPanel({
      position: 'topleft',
      visible: false,
      body: '<div id="cell-cover" />',
      bodyStyle: {
        width: '300px',
        height: '400px'
      },
      data: [1, 2, 3, 4, 5],
      resizable: true,
      header: {
        icon: '/static/icons/map/chart_icon.svg',
        title: '小区覆盖'
      }
    })
    // cell sreach
    wrapper.eChartsEventPanel = wrapper.createPanel({
      position: 'topleft',
      visible: false,
      body: '<div id="cell-lookup" />',
      bodyStyle: {
        width: '300px',
        height: '400px'
      },
      data: [1, 2, 3, 4, 5],
      resizable: true,
      header: {
        icon: '/static/icons/map/chart_icon.svg',
        title: '异常事件分析'
      }
    })
    // cell sreach
    const cellSreachPanel = wrapper.cellSreachPanel = wrapper.createPanel({
      position: 'topleft',
      visible: false,
      body: '<div id="cell-lookup" />',
      bodyStyle: {
        width: '310px',
        height: '400px'
      },
      data: [1, 2, 3, 4, 5],
      resizable: true,
      header: {
        icon: '/static/icons/map/chart_icon.svg',
        title: '小区查找'
      }
    })
    cellSreachPanel.on('show', function(e) {
      // console.log(e)
      const target = e.target
      const chartEl = target._bodyEl.firstChild
      new Vue({
        el: chartEl,
        name: 'LookupCell',
        components: { CellLookup },
        data: {
          map: this.wrapper
        },
        template: `<CellLookup />`
      })
      // console.log(cellSearch)
      // const target = e.target
    })
  }
  remove() {
    this.mapWrapper.remove()
  }
  getMapWrapper(divId, options) {
    // eslint-disable-next-line no-irregular-whitespace
    window.wrapper = this.mapWrapper = (new FM.FleetMap(divId,
      { overlay: true, baselayer: true, center: [31.86157, 117.28565],
        zoom: 12,
        overlaysex: true,
        toolbar: true })).mapWrapper
    return this.mapWrapper
  }
}
