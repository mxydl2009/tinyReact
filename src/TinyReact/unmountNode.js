/**
 * 卸载节点，即从页面中删除节点
 *  1. 如果要删除的节点是文本节点的话可以直接删除
 *  2. 如果要删除的节点由组件生成，需要调用组件卸载生命周期函数
 *  3. 如果要删除的节点中包含了其他组件生成的节点，需要调用其他组件的卸载生命周期函数
 *  4. 如果要删除的节点身上有 ref 属性，还需要删除通过 ref 属性传递给组件的 DOM 节点对象
 *  5. 如果要删除的节点身上有事件，需要删除事件对应的事件处理函数
 * @param {*} node 
 */
export default function unmountNode(node) {
  const virtualDOM = node._virtualDOM
  let component = virtualDOM.component
  if (virtualDOM.type === 'text') {
    // 1. 文本节点
    // 以前删除节点是node.parentNode.removeChild(node)，现在可以直接node.remove()即将自己从页面中删除
    node.remove()
    // 阻止程序继续
    return
  }
  // 2. 节点是否由组件生成
  if (component) {
    // 组件生成的节点
    component.componentWillUnmout()
  }
  // 3. 节点是否有ref属性
  if (virtualDOM.props.ref) {
    // 清除组件实例保存的DOM对象或者其他组件实例，防止内存泄漏
    virtualDOM.props.ref(null)
  }
  // 4. 节点是否有事件属性
  Object.keys(virtualDOM.props).forEach(propName => {
    if (propName.startsWith('on')) {
      // 事件属性
      const eventName = propName.toLowerCase().slice(2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })
  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for(let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i --
    }
  }
  // 删除node本身
  node.remove()
}