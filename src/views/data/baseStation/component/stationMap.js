import FleetCellMap from './map.class.js'
import Vue from 'vue'
import cellLookup from './cellLookup/index.vue'
import {
  // fetchStationTree,
  fetchStationMapList
} from '@/api/data/baseStation.js' // fetchStationTree, fetchStationList,
import { mapActions } from 'vuex'
// 引入fleetmap语言包
import 'fleetmap/dist/locale/fleetmap.en'
// import i18n from "../../../../lang";
const locales = window.locales

export default {
  name: 'StationMap',
  props: {
    searchParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tables: {
      type: Array,
      default: () => {
        return []
      }
    },
    tree: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: { },
  data() {
    return {
      listParams: {},
      cellMap: null,
      johnPanel: '',
      // nodeData: [],
      list: [],
      zoom: 7,
      center: [35.4145900000, 116.5872400000],
      mapOptions: {
        center: [38.410092, 106.211414],
        zoom: 5,
        scalecontrol: true,
        zoomcontrol: true,
        baselayer: true,
        measure: true,
        locate: true,
        coordpicker: true,
        // overlay: {
        //   resizable: true,
        //   visible: false,
        //   position: 'topleft',
        //   bodyStyle: {
        //     width: '280px',
        //     height: '350px'
        //   },
        //   header: {
        //     title: this.$t('route.baseStation')
        //   },
        //   beforeRemoveHook: function(treeId, treeNode) {
        //     return confirm(this.$t('analyze.message.confirmDeleteParas') + `-- ${JSON.stringify(treeNode)} ？`)
        //   },
        //   nodeData: []
        // },
        toolbar: {
          items: [
            // {
            //   type: 'button',
            //   title: locales.toolbar.layers,
            //   text: locales.toolbar.layers,
            //   toggle: true,
            //   iconCls: 'fm-icon-toolbar-layer',
            //   onclick: function(button, pressed) {
            //     // console.log('it hear', button, pressed)
            //     this.mapWrapper.controls.overlays.setVisible(pressed)
            //     if (pressed) {
            //       this.mapWrapper.controls.overlays.once('hide', function(e) {
            //         if (button.pressed) {
            //           // console.log('button', button)
            //           button.click()
            //         }
            //       })
            //     }
            //   }
            // },
            // '|',
            {
              type: 'button',
              title: locales.toolbar.tiles,
              text: locales.toolbar.tiles,
              iconCls: 'fm-icon-toolbar-map',
              toggle: true,
              onclick: function(button, pressed) {
                if (this.mapWrapper.controls['layers']) {
                  this.mapWrapper.controls['layers'].setVisible(pressed)
                  this.mapWrapper.controls['layers'].trigger = button
                }
              }
            },
            '|',
            {
              type: 'button',
              title: locales.toolbar.toolkits,
              text: locales.toolbar.toolkits,
              iconCls: 'fm-icon-toolbar-toolkit',
              onclick: function() {
              },
              menu: [
                {
                  type: 'button',
                  title: locales.toolbar.measure,
                  text: locales.toolbar.measure,
                  iconCls: 'fm-icon-toolbar-measure',
                  onclick: function(clickedItem) {
                    if (clickedItem.checked) {
                      this.mapWrapper.controls.measure.show()
                      this.mapWrapper.controls.measure.once('hide', function() {
                        clickedItem.setChecked(false)
                      })
                    } else {
                      this.mapWrapper.controls.measure.hide()
                    }
                  }
                },
                {
                  type: 'button',
                  title: locales.toolbar.locate,
                  text: locales.toolbar.locate,
                  iconCls: 'fm-icon-toolbar-locate',
                  onclick: function(clickedItem) {
                    this.mapWrapper.controls.locate.setVisible(clickedItem.checked)
                  }
                },
                {
                  type: 'button',
                  title: locales.toolbar.pickup,
                  text: locales.toolbar.pickup,
                  iconCls: 'fm-icon-toolbar-picker',
                  onclick: function(clickedItem) {
                    this.mapWrapper.controls.coordPicker.setVisible(clickedItem.checked)
                    if (clickedItem.checked) {
                      this.mapWrapper.controls.coordPicker.once('hide', function() {
                        clickedItem.setChecked(false)
                      })
                    }
                  }
                }
                // ,
                // {
                //   type: 'button',
                //   title: this.$t('analyze.title.cellSelect'),
                //   text: this.$t('analyze.title.cellSelect'),
                //   iconCls: 'fm-icon-toolbar-tile',
                //   onclick: this.onTestFunc.bind(this)
                // }
              ]
            }
          ]
        }
      }
    }
  },
  watch: {
    params(newData) {
      this.list = newData
    },
    searchParams(newParams) {
      this.listParams = newParams
    },
    // nodeData(newTree) {
    //   this.mapOptions.overlay.nodeData = newTree
    //   window.cellMap = this.cellMap = new FleetCellMap('map', this.mapOptions)
    //   // this.map.create()
    //   // console.log(this.johnPanel)
    // },
    tree(node) {
      for (const key in this.cellMap.dataLayers) {
        this.cellMap.dataLayers[key].setVisible(false)
      }
      if (node.length > 0) {
        node.forEach(item => {
          const traceId = item.id
          const layer = this.cellMap.dataLayers[traceId]
          if (layer) {
            // this.getCellStationList(layer, item)
            const param = {
              provinceCitys: [
                {
                  province: item.province,
                  citys: [item.city]
                }
              ]
            }
            this.getBaseStationList({
              param,
              success: (data) => {
                const records = data.records
                records.splice(0, 0, Object.assign([], data.titles))
                layer.setData(records, {
                  latKey: 'latitude',
                  lngKey: 'longitude',
                  crsCode: 'WGS84'
                })
                layer.mapWrapper.fitBounds(layer.getStore().getBounds())
              }
            })
            layer.setVisible(true)
          } else {
            const demo = this.cellMap.map.mapWrapper.createCellOverlay({
              directionKey: 'azimuth',
              labelOffset: 0,
              labelFields: ['cpi', 'cellName']
            })
            this.cellMap.dataLayers[traceId] = demo
            const param = {
              provinceCitys: [
                {
                  province: item.province,
                  citys: [item.city]
                }
              ]
            }
            this.getBaseStationList({
              param,
              success: (data) => {
                const records = data.records
                records.splice(0, 0, Object.assign([], data.titles))
                demo.setData(records, {
                  latKey: 'latitude',
                  lngKey: 'longitude',
                  crsCode: 'WGS84'
                })
                demo.mapWrapper.fitBounds(demo.getStore().getBounds())
                demo.setVisible(true)
              }
            })
          }
        })
      }
    }
  },
  created() {
    // this.createNode()
  },
  mounted() {
    window.cellMap = this.cellMap = new FleetCellMap('map', this.mapOptions)
  },
  methods: {
    ...mapActions({
      getBaseStationTree: 'dataManagement/getBaseStationTree',
      getBaseStationList: 'dataManagement/getBaseStationList'
    }),
    // 构建
    // createNode() {
    //   fetchStationTree().then(res => {
    //     // this.nodeData
    //     var tree = Object.assign([], JSON.parse(JSON.stringify(res.data.data)))
    //     var node = []
    //     tree.forEach(item => {
    //       var itemName = item.city.length > 0 ? item.city : item.province
    //       var ele = {
    //         name: itemName + '(' + item.count + ')',
    //         open: true,
    //         removeEnable: true,
    //         rangeEnable: false,
    //         checked: false,
    //         children: item.children
    //       }
    //       ele.children.forEach((item, index) => {
    //         var itemName = item.city.length > 0 ? item.city : item.province
    //         ele.children[index].removeEnable = true
    //         ele.children[index][itemName] = itemName + '(' + item.count + ')'
    //         ele.children[index].icon = require('@/assets/icons/map/layers-icon.png')
    //         ele.children[index].rangeEnable = true
    //         ele.children[index].checked = false
    //         ele.children[index].name = itemName
    //         ele.children[index].params = this.params
    //         ele.children[index].traceId = itemName + item.count
    //         // todo
    //         ele.children[index].onclick = function(clickedItem) { window.alert('unknown') }
    //       })
    //       node.push(ele)
    //     })
    //     this.nodeData = node
    //   })
    // },
    onTest() {
      console.log(this.cellMap)
    },
    onTestFunc(clickedItem) {
      this.cellMap.map.mapWrapper.cellCoverPanel.setVisible(clickedItem.checked)
      if (clickedItem.checked) {
        this.cellMap.map.mapWrapper.cellCoverPanel.once('hide', function() {
          clickedItem.setChecked(false)
        })
      }
      const chartEl = this.cellMap.map.mapWrapper.cellCoverPanel._bodyEl.firstChild
      const demoMap = this.cellMap
      new Vue({
        el: chartEl,
        name: 'LookupCell',
        components: { cellLookup },
        data: {
          param: this.listParams,
          map: demoMap,
          tables: this.tables
        },
        methods: {
          setCenter(param) {
            this.map.map.mapWrapper.addMarker(param)
            this.map.map.mapWrapper.setView(param, 15)
          }
        },
        i18n: this._i18n,
        template: `<cellLookup :param="param" :data="tables" @setCenter="setCenter" />`
      })
      // console.log(cellSearch)
      // const target = e.target
    },
    handleSearchLayer(params) {
      var demo = this.cellMap.map.mapWrapper.createCellOverlay({
        directionKey: 'azimuth',
        labelOffset: 0,
        labelFields: ['cpi', 'cellName']
      })
      // this.cellMap.dataLayers[traceId] = demo

      fetchStationMapList(params).then(res => {
        var data = Object.assign([], res.data.data.records)
        // eslint-disable-next-line no-irregular-whitespace
        data.splice(0, 0, Object.assign([], res.data.data.titles))
        // console.log(data)
        demo.setData(data, {
          latKey: 'latitude',
          lngKey: 'longitude',
          crsCode: 'WGS84'
        })
        console.log(demo.getStore().getCendroid())
        demo.mapWrapper.setView(demo.getStore().getCendroid(), 7)
        // this.cellMap.mapWrapper.setView(this.cellMap.mapWrapper.mapCmp.getCenter())
      })
    }
  },
  destroyed() {
    this.cellMap.remove()
  }
}
