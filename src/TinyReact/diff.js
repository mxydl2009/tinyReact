import mountElement from './mountElement'

/**
 * 对两个虚拟DOM进行差异化比较，并更新到真实DOM上
 * @param {*} virtualDOM 当前的虚拟DOM, 需要对native虚拟DOM和组件类型的虚拟DOM进行不同的处理
 * @param {*} container 挂载点
 * @param {*} oldDOM 之前的虚拟DOM对象
 */
export default function diff(virtualDOM, container, oldDOM) {
  // 首先需要判定oldDOM是否存在（是否是首次渲染）
  if (!oldDOM) {
    // 在mountElement中处理组件类型和native类型的React元素
    mountElement(virtualDOM, container)
  } else {

  }
}