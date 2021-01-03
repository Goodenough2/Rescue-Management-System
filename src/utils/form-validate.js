/**
 * by 丁浩 on 2019-07-13.
 */

export default function setRule(name, rules) {
  const items = []
  for (const rule of rules) {
    const item = {}
    for (const key in rule) {
      switch (key) {
        case 'required':
          item.required = true
          item.message = rule.message || `请输入${name}`
          break
        case 'selected':
          item.required = true
          item.message = rule.message || `请选择${name}`
          item.trigger = 'change'
          break
        case 'length': {
          item.type = 'string'
          const { min, max } = rule.length
          if (min) {
            item.min = rule.length[0]
            item.message = rule.message || `${name}的长度应大于${min}个字符`
          }
          if (max) {
            item.max = rule.length[1]
            item.message = rule.message || `${name}的长度应小于${max}个字符`
          }
          if (min && max) {
            item.message = rule.message || `${name}的长度应介于${min}-${max}个字符之间`
          }
        }
          break
        case 'range':
          //   item.type = 'number'
          //   const [min, max] = rule.range
          //   if (min) {
          //     item.min = rule.range[0]
          //     item.message = rule.message || `${name}的范围应大于数字${min}`
          //   }
          //   if (max) {
          //     item.max = rule.range[1]
          //     item.message = rule.message || `${name}的范围应小于数字${max}`
          //   }
          //   if (min && max) {
          //     item.message = rule.message || `${name}的范围应介于${min}-${max}之间`
          //   }
          // }
          break
        case 'max':
          break
        case 'min':
          break
        case 'date':
          break
        case 'datetime':
          break
        default:
          item[key] = rule[key]
          break
      }
      item.trigger = item.trigger || 'blur'
    }
    items.push(item)
  }
  return items
}
