<template>
  <div id="standardMap" class="standardMapContainer" />
</template>
<script>
import mapOptions from './mapOptions'
import 'fleetmap/dist/locale/fleetmap.en'
import 'fleetmap/dist/styles/fleetmap.css'
import FM from 'fleetmap'
import UxDrawToolbar from './UxDrawToolbar'
import RegionProperty from './RegionProperty'
import Vue from 'vue'
import { mapActions } from 'vuex'
import { getGeoStyleOptions } from '@/utils/mapUtil'
export default {
  data() {
    return {
      shapeType: undefined,
      currentRegionType: undefined
    }
  },
  watch: {
    shapeType() {
      this.updateDrawer()
    },
    currentRegionType(newValue) {
      if (newValue === 0) {
        const mapWrapper = this.map.mapWrapper
        const drawCmp = mapWrapper.controls.draw
        const drawToolbarCmp = this.uxDrawToolbarVm.$children[0]
        drawCmp.setControls({
          drawRectangle: false,
          drawPolygon: false,
          cutPolygon: false,
          drawPolyline: false,
          edit: false,
          drag: false,
          remove: false
        })
        drawToolbarCmp.vertical = '0'
      }
    }
  },
  created() {
    this.geoJsonBackup = undefined
    this.hiddingDrawer = false
  },
  mounted() {
    this.map = new FM.FleetMap('standardMap', mapOptions)
    const drawOpts = this.map.options.draw
    this.defaultDrawStyle = {
      color: drawOpts.color,
      weight: drawOpts.weight,
      fillColor: drawOpts.fillColor,
      fillOpacity: drawOpts.fillOpacity
    }
    this.initMap()
  },
  beforeDestroy() {
    this.map.remove()
  },
  methods: {
    ...mapActions({
      saveRegion: 'dataManagement/saveRegion'
    }),
    initMap() {
      const that = this
      const mapWrapper = this.map.mapWrapper
      // 创建绘图管理工具栏
      this.createUxDrawToolbar()
      // 创建Region GeoOverlay
      mapWrapper.regionGeoOverlay = mapWrapper.createGeoOverlay({
        name: 'Region Geo Overlay',
        beCapturable: true
      })
      // 创建区域属性管理面板
      this.createRegionPropertyForm()

      const drawCmp = mapWrapper.controls.draw
      const drawToolbarCmp = this.uxDrawToolbarVm.$children[0]
      // 监听绘制组件
      drawCmp.on('show', function(e) {
        drawCmp.setControls({
          drawRectangle: true,
          drawPolygon: true,
          cutPolygon: true,
          drawPolyline: true,
          edit: true,
          drag: true,
          remove: true
        })
        drawToolbarCmp.vertical = '228px'
        mapWrapper.uxDrawToolbar.show()
      }, this)
      drawCmp.on('hide', function(e) {
        this.hiddingDrawer = true
        that.shapeType = undefined
        mapWrapper.uxDrawToolbar.hide()
        that.hidePropertyPanel()
        this.resetPropertyForm()
      }, this)
      drawCmp.on('enddraw', function(e) {
        if (!that.shapeType) {
          // 绘制线段与绘制多边形互斥
          that.shapeType = e.shape
          that.handlePropertyBtnClick()
        }
      }, this)
      drawCmp.on('featureremove', function(e) {
        const featureCollection = drawCmp.getGeoJSON()
        // 清空图形时重置绘制按钮
        if (featureCollection.features.length === 0) {
          that.shapeType = undefined
        }
      }, this)
      drawCmp.on('released', function(e) {
        if (that.geoJsonBackup) {
          if (that.isDrawingLine()) {
            // todo 道路绘制功能
          } else {
            mapWrapper.regionGeoOverlay.removeData(function(feature) {
              return feature['properties']['id'] === that.geoJsonBackup['properties']['id']
            })
            mapWrapper.regionGeoOverlay.addData(that.geoJsonBackup)
            that.currentRegionType = undefined
          }
          that.geoJsonBackup = undefined
        }
        that.shapeType = undefined
        this.resetDrawerStyle()
      }, this)
      drawCmp.on('captured', function(e) {
        const geoJson = e.data
        that.geoJsonBackup = geoJson
        that.shapeType = geoJson.geometry.type
        const properties = geoJson.properties
        if (!that.isDrawingLine()) {
          that.currentRegionType = properties.type
          const style = {
            lineWidth: properties.lineWidth,
            lineColor: properties.lineColor,
            fillColor: properties.fillColor,
            opacity: properties.opacity
          }
          // 设置绘制控件的图形样式
          const styleOpts = getGeoStyleOptions(style)
          drawCmp.setPathStyle(styleOpts)
          // 回显数据到属性表单
          that.regionPropertyVm.$refs.regionPropertyForm.regionForm = {
            id: properties.id,
            name: properties.name,
            parentId: properties.parentId,
            type: properties.type,
            ...style
          }
          // 行政区域只可编辑图形样式
          if (properties.type === 0) {
            that.handlePropertyBtnClick()
          }
        }
      }, this)
    },
    createUxDrawToolbar() {
      const that = this
      const mapWrapper = this.map.mapWrapper
      const uxDrawToolbar = mapWrapper.uxDrawToolbar = mapWrapper.createPanel({
        position: 'topright',
        visible: false,
        header: false
      })
      that.uxDrawToolbarVm = new Vue({
        el: uxDrawToolbar._bodyEl,
        name: 'UxDrawToolbar',
        components: { UxDrawToolbar },
        data() {
          return {
          }
        },
        methods: {
          handlePropertyBtnClick() {
            that.handlePropertyBtnClick()
          },
          handleSaveBtnClick() {
            that.handleSaveBtnClick()
          },
          handleExitBtnClick() {
            that.handleExitBtnClick()
          }
        },
        template: `<ux-draw-toolbar ref="uxDrawToolbar" @propertyBtnClick="handlePropertyBtnClick" @saveBtnClick="handleSaveBtnClick" @exitBtnClick="handleExitBtnClick" />`
      })
    },
    createRegionPropertyForm() {
      const that = this
      const mapWrapper = this.map.mapWrapper
      const regionProperty = mapWrapper.regionProperty = mapWrapper.createPanel({
        position: 'topleft',
        visible: false,
        header: {
          title: 'Region Property'
        }
      })
      regionProperty.on('hide', function() {
        // 关闭属性编辑窗口时取消属性按钮的选中状态
        that.regionPropertyVm.isVisible = false
        that.setPropertyBtnActive(false)
      }, this)
      that.regionPropertyVm = new Vue({
        el: regionProperty._bodyEl,
        i18n: that.$i18n,
        store: that.$store,
        name: 'RPFPanel',
        components: { RegionProperty },
        data() {
          return {
          }
        },
        methods: {
          handleRegionStyleChange(newStyle) {
            that.handleRegionStyleChange(newStyle)
          }
        },
        template: `<region-property ref="regionPropertyForm" @regionStyleChange="handleRegionStyleChange" />`
      })
    },
    getDrawerOpts() {
      const baseOpts = {
        edit: true,
        drag: true,
        remove: true
      }
      if (!this.shapeType) {
        return {
          drawRectangle: true,
          drawPolygon: true,
          cutPolygon: true,
          drawPolyline: true,
          ...baseOpts
        }
      } else {
        const isLine = this.isDrawingLine()
        return {
          drawRectangle: !isLine,
          drawPolygon: !isLine,
          cutPolygon: !isLine,
          drawPolyline: isLine,
          ...baseOpts
        }
      }
    },
    handlePropertyBtnClick() {
      if (!this.shapeType) return
      const mapWrapper = this.map.mapWrapper
      if (this.isDrawingLine()) {
        // todo 道路绘制功能
      } else {
        this.regionPropertyVm.isVisible = !this.regionPropertyVm.isVisible
        mapWrapper.regionProperty.setVisible(this.regionPropertyVm.isVisible)
        this.setPropertyBtnActive(this.regionPropertyVm.isVisible)
      }
    },
    handleSaveBtnClick() {
      const mapWrapper = this.map.mapWrapper
      if (!this.shapeType) {
        mapWrapper.notify({
          type: 'error',
          content: this.$t('common.nodata'),
          timeOut: 1500
        })
        return
      }
      const drawCmp = mapWrapper.controls.draw
      if (this.isDrawingLine()) {
        // todo 道路绘制功能
      } else {
        drawCmp.disableDraw()
        const featureCollection = drawCmp.getGeoJSON()
        if (featureCollection.features.length > 0) {
          const regionPropertyFormCmp = this.regionPropertyVm.$refs.regionPropertyForm
          const regionPropertyForm = regionPropertyFormCmp.$refs.regionEditForm
          regionPropertyForm.validate((valid) => {
            if (valid) {
              let loadingNotify
              const geoJson = featureCollection.features[0]
              const regionForm = regionPropertyFormCmp.regionForm
              let regionParams
              if (this.currentRegionType === 0) {
                // 行政区域只能修改图形样式
                regionParams = {
                  fillColor: regionForm.fillColor,
                  lineColor: regionForm.lineColor,
                  lineWidth: regionForm.lineWidth,
                  opacity: regionForm.opacity
                }
              } else {
                regionParams = {
                  geoJson: geoJson.geometry,
                  ...regionForm
                }
              }
              const params = {
                id: regionForm.id,
                params: regionParams,
                beforeRequest: () => {
                  loadingNotify = mapWrapper.notify({
                    type: 'loading',
                    content: this.$t('common.saving')
                  })
                },
                success: (res) => {
                  loadingNotify.destroy()
                  // 新增区域时，将返回的id赋给图形geojson数据
                  if (res && res.data.id && !regionForm.id) {
                    regionForm.id = res.data.id
                  }
                  this.$emit('successSaveRegion', { geoJson, regionForm })
                  // 重置并清空draw组件
                  drawCmp.clear()
                  // 临时处理 - start
                  if (drawCmp._capturedItem && drawCmp._capturedItem.feature) {
                    mapWrapper.regionGeoOverlay.removeData(function(feature) {
                      return feature['properties']['id'] === drawCmp._capturedItem.feature.feature.properties.id
                    })
                    drawCmp._capturedItem = undefined
                  }
                  // 临时处理 - end
                  this.shapeType = undefined
                  this.geoJsonBackup = undefined
                  this.currentRegionType = undefined
                  this.resetPropertyForm()
                  this.resetDrawerStyle()
                  this.hidePropertyPanel()
                  mapWrapper.notify({
                    type: 'success',
                    content: this.$t('common.saveSuccess'),
                    timeOut: 1500
                  })
                }
              }
              this.saveRegion(params)
            } else {
              return false
            }
          })
        }
      }
    },
    handleExitBtnClick() {
      const mapWrapper = this.map.mapWrapper
      const drawCmp = mapWrapper.controls.draw
      drawCmp.disableDraw()
      drawCmp.release()
      this.resetPropertyForm()
    },
    handleRegionStyleChange(style) {
      const mapWrapper = this.map.mapWrapper
      const drawCmp = mapWrapper.controls.draw
      const geoStyleOpts = getGeoStyleOptions(style)
      drawCmp.setPathStyle(geoStyleOpts)
    },
    hidePropertyPanel() {
      const mapWrapper = this.map.mapWrapper
      if (this.regionPropertyVm.isVisible) {
        this.regionPropertyVm.isVisible = false
        mapWrapper.regionProperty.setVisible(this.regionPropertyVm.isVisible)
      }
      this.setPropertyBtnActive(false)
    },
    resetPropertyForm() {
      const regionPropertyFormCmp = this.regionPropertyVm.$refs.regionPropertyForm
      regionPropertyFormCmp.resetForm()
    },
    isDrawingLine() {
      return this.shapeType.indexOf('Line') !== -1
    },
    updateDrawer() {
      if (this.hiddingDrawer) {
        this.hiddingDrawer = false
        return
      }
      const mapWrapper = this.map.mapWrapper
      const drawCmp = mapWrapper.controls.draw
      const drawToolbarCmp = this.uxDrawToolbarVm.$children[0]
      drawCmp.setControls(this.getDrawerOpts())
      drawToolbarCmp.vertical = this.shapeType ? (this.isDrawingLine() ? '150px' : '202px') : '228px'
      if (!this.shapeType) this.hidePropertyPanel()
    },
    /**
    * 设置属性按钮选中状态
    **/
    setPropertyBtnActive(active = true) {
      const uxDrawToolbarCmp = this.uxDrawToolbarVm.$refs.uxDrawToolbar
      uxDrawToolbarCmp.buttons[0].active = active
      uxDrawToolbarCmp.$set(uxDrawToolbarCmp.buttons, 0, uxDrawToolbarCmp.buttons[0])
    },
    resetDrawerStyle() {
      const mapWrapper = this.map.mapWrapper
      const drawCmp = mapWrapper.controls.draw
      drawCmp.setPathStyle(this.defaultDrawStyle)
    }
  }
}
</script>
<style scoped>
.standardMapContainer {
  width: 100%;
  height: 100%;
}
</style>

