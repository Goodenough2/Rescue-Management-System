/*
* 获取url分段数据，以/为分隔符，0起始
* */
export function getUrlSection(url, index) {
  const sections = url.split('/')
  if (url.indexOf('/') === 0) index++
  if (sections.length > index) return sections[index]
}
