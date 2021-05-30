import { fetchRoadList } from '@/api/data/baseRoad.js'
// import { render } from 'node-sass'
// import async from 'async-js'
import * as turf from '@turf/turf'

// 引入fleetmap
import 'fleetmap/dist/locale/fleetmap.en'
const locales = window.locales
import 'fleetmap/dist/styles/fleetmap.css'
import FM from 'fleetmap'
// import { Loading } from 'element-ui'

export default {
  name: 'RoadMap',
  props: {
    // searchParams: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },
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
      requests: {},
      hasReq: false,
      ifEndReq: true,
      ifHasReq: 0,
      ifHasReqNum: 0,
      childValue: false,
      zoom: 7,
      center: [35.4145900000, 116.5872400000],
      listQueryList: [],
      obj: {
        name: '',
        style: {
          color: [79, 210, 125]
        }
      },
      maplistDto: [['RoadDefinition', 'group', 'name']]
    }
  },
  watch: {
    ifEndReq(newtree, oldtree) {
      if (this.ifEndReq === true && this.hasReq === true) {
        this.getData(this.newArr)
      }
    },
    tree(newtree, oldtree) {
      console.log(newtree, oldtree, 'roadmap')
      if (oldtree !== undefined) {
        // 隐藏所有道路图层
        oldtree.map(item => {
          this._cancelRoadInfoRequest(item.id)
          if (item.hasOwnProperty('areaId')) {
            if (this.lmap.dataLayer.hasOwnProperty([item.areaId + '_' + item.roadType])) {
              this.lmap.dataLayer[item.areaId + '_' + item.roadType].setVisible(false)
            }
          }
        })
      }
      this.newArr = []
      newtree.map(item => {
        if (item.hasOwnProperty('areaId')) {
          this.newArr.push(item)
        }
      })
      if (this.newArr.length !== 0) {
        console.log(this.newArr, '执行画图了')
        this.getData(this.newArr)
      }
    }
  },
  created() {
    // console.log(this.$parent)
    // this.$parent.shiyan()
    // 地图数据分页大小
    this.roadPageDataLimit = 50000
  },
  mounted() {
    window.map = this.lmap = (new FM.FleetMap('lmap', {
      center: this.center,
      zoom: this.zoom,
      scalecontrol: true,
      zoomcontrol: true,
      baselayer: true,
      measure: true,
      locate: true,
      coordpicker: true,
      toolbar: {
        items: [
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
            ]
          }
        ]
      }
    })).mapWrapper
    this.lmap.dataLayer = {}
  },

  methods: {
    /**
     * 取消道路数据请求
     * @param roadId
     * @private
     */
    _cancelRoadInfoRequest(roadId) {
      if (this.requests[roadId]) {
        this.requests[roadId].req.cancel()
        this.requests[roadId].loading.destroy()
        delete this.requests[roadId]
      }
    },
    // go() {
    //   console.log(this.maplistDto)
    // },

    getData(newtree) {
      // 取消重复请求
      // newtree.map(item => {
      //   this._cancelRoadInfoRequest(item.id)
      // })
      this.hasReq = true
      if (this.ifEndReq === true && this.hasReq === true) {
        this.ifEndReq = false
        this.hasReq = false
        this.ifHasReq = this.ifHasReqNum = 0
        newtree.map((item, index, self) => {
          this.maplistDto = [['RoadDefinition', 'group', 'name', 'id']]
          if (this.lmap.dataLayer.hasOwnProperty([item.areaId + '_' + item.roadType])) {
            this.lmap.dataLayer[item.areaId + '_' + item.roadType].mapWrapper.fitBounds(this.lmap.dataLayer[item.areaId + '_' + item.roadType].getStore().getBounds())
            this.lmap.dataLayer[item.areaId + '_' + item.roadType].setVisible(true)
            this.ifEndReq = true
          } else {
            this.ifHasReq = this.ifHasReq + 1
            this.listQueryList[index] = {
              areas: [
                {
                  cityAreaId: undefined,
                  roadType: undefined
                }
              ],
              roadName: undefined
            }
            if (item.hasOwnProperty('areaId')) {
              this.listQueryList[index].areas[0].cityAreaId = item.areaId
              this.listQueryList[index].areas[0].roadType = item.roadType
            } else {
              this.listQueryList[index].areas[0].cityAreaId = item.id
            }
            const loadingMsg = this.lmap.notify({ content: `正在请求数据中...`, type: 'loading' })
            const pages = [{ page: 1, limit: this.roadPageDataLimit }]
            const req = fetchRoadList(this.listQueryList[index], pages[0])
            req.then(res => {
              if (!res.canceled) {
                let dataAllList = []
                if (res.data.data.pages > 1) {
                  for (var a = 2; a <= res.data.data.pages; a++) {
                    pages.push({ page: a, limit: this.roadPageDataLimit })
                  }
                  Promise.all(pages.map(item => fetchRoadList(this.listQueryList[index], item))).then(roadData => {
                    roadData.map(item => { dataAllList = dataAllList.concat(item.data.data.records) })
                    this.ifHasReqNum += 1
                    this.$emit('onChildByValue', true)
                    dataAllList.map(item => {
                      const geoJson = item.geoJson
                      // 拆分 MultiLineString -> LineString
                      const features = turf.flatten(geoJson).features
                      for (const feature of features) {
                        this.maplistDto.push([feature.geometry, 'group', item.name, item.id])
                      }
                    })
                    // 删除请求完毕的数值
                    delete this.requests[item.id]
                    loadingMsg.destroy()
                    this.setData(this.ifHasReqNum, this.listQueryList[index].areas[0])
                  })
                } else {
                  this.ifHasReqNum += 1
                  this.$emit('onChildByValue', true)
                  res.data.data.records.map(item => {
                    const geoJson = item.geoJson
                    // 拆分 MultiLineString -> LineString
                    const features = turf.flatten(geoJson).features
                    for (const feature of features) {
                      this.maplistDto.push([feature.geometry, 'group', item.name, item.id])
                    }
                  })
                  delete this.requests[item.id]
                  loadingMsg.destroy()
                  this.setData(this.ifHasReqNum, this.listQueryList[index].areas[0])
                }
              } else {
                this.ifEndReq = true
              }
            })
            this.requests[item.id] = {
              req: req,
              loading: loadingMsg
            }
          }
        })
        if (this.ifHasReq === 0) {
          this.$emit('onChildByValue', false)
        }
      }
    },
    setData(num, listQuery) {
      // this.$emit('onChildByValue', true)
      const lineOverlay = this.lmap.createCanvas(this.obj, 'line')
      this.lmap.dataLayer[listQuery.cityAreaId + '_' + listQuery.roadType ] = lineOverlay
      this.ifEndReq = true
      const loadingMsg = this.lmap.notify({ content: `正在渲染中...`, type: 'loading' })
      lineOverlay.setData(this.maplistDto
        , {
          geojsonKey: 'RoadDefinition',
          groupKey: 'group'
        })
      loadingMsg.destroy()
      lineOverlay.mapWrapper.fitBounds(lineOverlay.getStore().getBounds())
      lineOverlay.setVisible(true)
      if (num === this.ifHasReq) {
        this.$emit('onChildByValue', false)
      }
    }
  },
  destroyed() {
    this.lmap.remove()
  }
}
