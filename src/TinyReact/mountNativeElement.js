import mountElement from "./mountElement"

/**
 * 根据virtualDOM来创建真实的DOM节点，并挂载到页面
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountNativeElement(virtualDOM, container) {
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
  // 挂载到页面中
  container.appendChild(newElement)
}