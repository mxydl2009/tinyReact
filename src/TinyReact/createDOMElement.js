import mountElement from './mountElement'
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
    newElement = document.createElement(virtualDOM.type)
  }
  // 递归创建子节点
  virtualDOM.props.children.forEach(child => {
    mountElement(child, newElement)
  })
  return newElement
}