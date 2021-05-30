// 方便后续拓展成系统参数
const center = localStorage.getItem('sys_map_center') || [31.86157, 117.28565]
const zoom = localStorage.getItem('sys_map_zoom') || 12

export default {
  center: center,
  zoom: zoom,
  baselayer: true,
  scalecontrol: true,
  zoomcontrol: true,
  toolbar: true,
  overlaysex: true,
  legend: true,
  measure: true,
  draw: {
    visible: false,
    color: '#1890ff',
    weight: 2,
    fillColor: '#1890ff',
    fillOpacity: 0.3,
    dashed: true,
    dashArray: [8, 8, 4, 8], // 设置虚线样式
    cutPolygon: true,
    capture: true,
    propertyEditor: false,
    alwaysFlatten: true,
    combineOut: true
  },
  locate: true,
  coordpicker: true,
  notifyLimit: 8
}
