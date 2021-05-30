export function hexCharCodeToStr(str) {
  let data = str.toString()
  while (data.length < 6) {
    data = '0' + data
  }
  return '0x' + data
}
