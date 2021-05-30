import i18n from '@/lang'
const mapOptions = {
  center: [31.86157, 117.28565],
  zoom: 12,
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
  coordpicker: true,
  overlay: {
    resizable: true,
    visible: false,
    position: 'topleft',
    bodyStyle: {
      width: '280px',
      height: '350px'
    },
    header: {
      // iconCls: '',
      title: 'Layers'
    },
    beforeRemoveHook: function(treeId, treeNode) {
      return confirm(`${i18n.t('analyze.message.confirmDeleteParas')}-- ${JSON.stringify(treeNode)} ？`)
    },
    nodeData: [
      {
        name: i18n.t('analyze.label.errEvent'),
        icon: require('@/assets/icons/map/layers-icon.png'),
        checked: false,
        open: true,
        removeEnable: true,
        rangeEnable: true,
        onclick: function(clickedItem) { console.log(clickedItem) }
      }
    ]
  }

}
export default mapOptions
