/**
 * 更新文本节点的内容
 * @param {*} virtualDOM 
 * @param {*} oldVirtualDOM 
 * @param {*} oldDOM 
 */
export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent
    oldDOM._virtualDOM = virtualDOM
  }
}