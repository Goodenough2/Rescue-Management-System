import store from '@/store'
import { deepClone } from '@/utils'

export default {
  inserted(el, binding, vnode) {
    console.log(el, binding, vnode)
    const { value } = binding
    const functions = value.split('.')

    let access = deepClone(store.getters && store.getters.access)

    let hasAccess = true
    for (let i = 0; i < functions.length; i++) {
      if (access[functions[i]] && access[functions[i]].allow) access = access[functions[i]]
      else hasAccess = false
    }
    if (!hasAccess) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
