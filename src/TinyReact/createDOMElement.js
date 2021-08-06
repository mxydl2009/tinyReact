import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
/**
 * 用于根据virtualDOM来创建真实DOM节点
 */
export default (virtualDOM) => {
  // 声明变量来存储真实DOM节点
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    // 添加属性
    updateNodeElement(newElement, virtualDOM)
  }
  // 将virtualDOM挂载到DOM对象的_virtualDOM属性上，便于更新后的virtualDOM与之进行差异化对比
  newElement._virtualDOM = virtualDOM
  // 递归创建子节点
  virtualDOM.props.children.forEach(child => {
    mountElement(child, newElement)
  })

  // 处理ref属性
  if (virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }
  return newElement
}