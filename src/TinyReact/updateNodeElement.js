/**
 * 处理元素的属性
 * @param {*} newElement 新的DOM元素
 * @param {*} virtualDOM 新的虚拟DOM
 * @param {*} oldVirtualDOM 旧的虚拟DOM
 */
export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM) {
  // get props
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM && oldVirtualDOM.props || {}
  // 按新的props来遍历，这样更新的属性值是新旧props共有的属性以及新的props新增的属性
  Object.keys(newProps).forEach((propName) => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    if (newPropValue !== oldPropValue) {
      // 不管是首次渲染，还是更新属性值，都是在新的属性值不等于旧的属性值情况下，将属性值设为新的属性值
      // 根据属性的类型来做不同的处理
      if (propName.startsWith('on')) {
        // 事件属性, 给元素添加事件监听函数, 这里不去实现react的事件系统了，而是直接给元素添加监听器
        const eventName = propName.toLowerCase().slice(2)
        newElement.addEventListener(eventName, newPropValue)
        if (oldPropValue) {
          // 删除旧的事件监听器
          newElement.removeEventListener(eventName, oldPropValue)
        }
      } else if (propName === 'value' || propName === 'checked') {
        // 表单元素的value和checked属性无法使用setAttribute方法
        newElement[propName] = newPropValue
      } else if (propName !== 'children') {
        // 不为children
        if (propName === 'className') {
          newElement.setAttribute('class', newPropValue)
        } else {
          newElement.setAttribute(propName, newPropValue)
        }
      }
    }
  })
  // 删除旧的props中的属性
  Object.keys(oldProps).forEach(propName => {
    if (!newProps[propName]) {
      // 删除旧的propName属性
      if (propName.startsWith('on')) {
        // 事件监听器删除掉
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, newProps[propName])
      } else if(propName !== 'children') {
        // removeAttribute()可以删除value和checked属性
        newElement.removeAttribute(propName)
      }
    }
  })
}