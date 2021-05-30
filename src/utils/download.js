import request from '@/utils/request'
import { Message } from 'element-ui'

// download
const download = function(url, fileName, method, data, isMessage, params) {
  console.log(fileName)
  return request({
    url: url,
    method: method || 'get',
    responseType: 'blob',
    data,
    params
  }).then(res => {
    const type = res.headers['content-type']
    if (type && type.toLowerCase().startsWith('application/json')) {
      var reader = new FileReader()
      reader.onload = function(event) {
        const str = reader.result
        const msg = JSON.parse(str).message
        if (isMessage !== true) {
          Message({
            message: msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }
      reader.readAsText(res.data)
      // if (isMessage === true) {
      //   return 1
      // }
      return
    }
    const blob = new Blob([res.data], { type: res.data.type })
    const a = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    a.href = href
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(href)
  })
}

export default download
