
export const downloadByFrame = function(url, methods) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = process.env.BASE_API + url

  iframe.onload = function() {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
  // const form = document.createElement('form')
  // form.setAttribute('style', 'display:none')
  // form.setAttribute('method', methods)
  // form.setAttribute('action', process.env.BASE_API + url)
}
