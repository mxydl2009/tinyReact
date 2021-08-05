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
  // 递归创建子节点
  virtualDOM.props.children.forEach(child => {
    mountElement(child, newElement)
  })
  return newElement
}