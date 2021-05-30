// require('script-loader!file-saver')
import JSZip from 'jszip'
export function exportZip(dataArr, zipName) {
  const zip = new JSZip()
  // dataArr.forEach()
  console.log(dataArr)
  for (const i in dataArr) {
    zip.file(dataArr[i].fileName, dataArr[i].data)
  }
  zip.generateAsync({
    type: 'blob'
  }).then((blob) => {
    const a = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    a.href = href
    a.download = zipName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(href)
    // saveAs(blob, `${zip_name}.zip`)
  }, () => {
    alert('导出失败')
  })
}
// const blob = new Blob([res.data], { type: res.data.type })
// const a = document.createElement('a')
// const href = window.URL.createObjectURL(blob)
// a.href = href
// a.download = fileName
// document.body.appendChild(a)
// a.click()
// document.body.removeChild(a)
// window.URL.revokeObjectURL(href)
