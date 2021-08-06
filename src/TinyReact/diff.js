import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'
/**
 * 对两个虚拟DOM进行差异化比较，并更新到真实DOM上
 * @param {*} virtualDOM 当前的虚拟DOM, 需要对native虚拟DOM和组件类型的虚拟DOM进行不同的处理
 * @param {*} container 挂载点
 * @param {*} oldDOM 之前的DOM对象
 */
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM ? oldDOM._virtualDOM: {}
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // 首先需要判定oldDOM是否存在（是否是首次渲染）
  if (!oldDOM) {
    // 如果旧的DOM不存在，则直接挂在，这里同时处理了首次渲染和新的节点多于旧的节点的情况
    // 在mountElement中处理组件类型和native类型的React元素
    mountElement(virtualDOM, container)
  } else {
    if (virtualDOM.type === oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
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
      // 删除多余的子节点，如果旧的子节点多余新的子节点，就需要删除多余的子节点
      let oldChildNodes = oldDOM.childNodes
      if (oldChildNodes.length > virtualDOM.props.children.length) {
        // 倒叙删除，从旧的子节点末尾开始删除到新的子节点
        for(let i = oldChildNodes.length - 1; i > virtualDOM.props.children.length - 1; i --) {
          unmountNode(oldChildNodes[i])
        }
      }
    } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
      // 类型不同, 且非组件类型，不需要比对，直接用新的DOM对象替换旧的DOM对象
      const newElement = createDOMElement(virtualDOM)
      // 替换
      oldDOM.parentNode.replaceChild(newElement, oldDOM)
    } else if(typeof virtualDOM.type === 'function') {
      // 组件更新, 分两种情况
      // 1. 同一个组件，则只要组件的更新即可
      // 2. 不同的组件，则将新组件挂载，旧组件删除
      // 参数解释
       // virtualDOM：代表组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
       // oldComponent：要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
       // oldDOM：要更新的 DOM对象，在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
       // container：如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
      diffComponent(virtualDOM, oldComponent, oldDOM, container)
    }
  }
}