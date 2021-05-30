/**
 * 提取地图图形样式属性
 */
export function getGeoStyle(style) {
  const geoStyle = {}
  const styleMap = {
    lineWidth: 'stroke-width',
    lineColor: 'stroke',
    fillColor: 'fill',
    opacity: 'fill-opacity'
  }
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      if (styleMap[key]) {
        geoStyle[styleMap[key]] = style[key]
      } else {
        geoStyle[key] = style[key]
      }
    }
  }
  return geoStyle
}

/**
 * 提取地图图形样式属性配置项
 */
export function getGeoStyleOptions(style) {
  const geoStyleOptions = {}
  const styleMap = {
    lineWidth: 'weight',
    lineColor: 'color',
    opacity: 'fillOpacity'
  }
  for (const key in style) {
    if (style.hasOwnProperty(key)) {
      if (styleMap[key]) {
        geoStyleOptions[styleMap[key]] = style[key]
      } else {
        geoStyleOptions[key] = style[key]
      }
    }
  }
  return geoStyleOptions
}
