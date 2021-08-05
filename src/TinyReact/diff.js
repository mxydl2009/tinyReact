import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
/**
 * 对两个虚拟DOM进行差异化比较，并更新到真实DOM上
 * @param {*} virtualDOM 当前的虚拟DOM, 需要对native虚拟DOM和组件类型的虚拟DOM进行不同的处理
 * @param {*} container 挂载点
 * @param {*} oldDOM 之前的DOM对象
 */
export default function diff(virtualDOM, container, oldDOM) {
  let oldVirtualDOM = oldDOM ? oldDOM._virtualDOM: {}
  // 首先需要判定oldDOM是否存在（是否是首次渲染）
  if (!oldDOM) {
    // 在mountElement中处理组件类型和native类型的React元素
    mountElement(virtualDOM, container)
  } else {
    if (virtualDOM.type === oldVirtualDOM.type) {
      // 类型相同
      if (virtualDOM.type === 'text') {
        // 文本节点, 更新文本内容
        updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
      } else {
        // 元素节点， 更新属性
        updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
      }
      // 更新子节点
      virtualDOM.props.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      })
    }
  }
}