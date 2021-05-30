import LeafletWrapper from '@/utils/map/fleet-leaflet/leaflet2fleetmap'
export const FLEET_MAP_ENGINE_LEAFLET = 'leaflet'
export default class FleetMap {
dataLayers = {}
constructor(divId, mapOptions) {
  const op = this.options = Object.assign({}, {
    /*
     默认配置
     */
    engine: 'leaflet',
    overlay: false
  }, mapOptions)
  const wrapper = this.getMapWrapper(divId, op)
  wrapper.create()
  // 示例代码 - start
  wrapper.createZoom({
    position: 'bottomleft'
  })
  // wrapper.createScale({
  //   position: 'bottomright'
  // })
  var obj = {
    name: 'Point',
    clickable: true,
    clickType: 1,
    legends: {
      '<=0': {
        color: '#ff0000'
      },
      '>100': { // 每个key对应 store中的一个 Group
        color: '#ff0001'
      },
      '16': {
        color: '#ff00ff'
      }
    },
    realResponse: true,
    offsetX: 0,
    offsetY: 0
  }

  const sd = wrapper.createCanvas(obj)
  this.dataLayers['lmq'] = sd
}

getMapWrapper(divId, options) {
  switch (options.engine) {
    case FLEET_MAP_ENGINE_LEAFLET:
      this.mapWrapper = new LeafletWrapper(divId, options)
      break
    default:
      throw new Error('Map engine is required!')
  }
  return this.mapWrapper
}
}
