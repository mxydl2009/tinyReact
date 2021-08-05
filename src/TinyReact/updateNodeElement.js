export default (newElement, virtualDOM) => {
  // get props
  const newProps = virtualDOM.props
  Object.keys(newProps).forEach((propName) => {
    const newPropValue = newProps[propName]
    // 根据属性的类型来做不同的处理
    if (propName.startsWith('on')) {
      // 事件属性, 给元素添加事件监听函数, 这里不去实现react的事件系统了，而是直接给元素添加监听器
      const eventName = propName.toLowerCase().slice(2)
      newElement.addEventListener(eventName, newPropValue)
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
  })
}