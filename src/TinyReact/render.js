import diff from './diff'

/**
 * 将虚拟DOM转换为真实DOM挂载到页面，对应于React的reconcile协调过程
 * 协调过程的主要函数就是diff算法
 * @param {*} virtualDOM 当前的虚拟DOM, 需要对native虚拟DOM和组件类型的虚拟DOM进行不同的处理
 * @param {*} container 挂载点
 * @param {*} oldDOM 之前的虚拟DOM对象
 */
export default function render(virtualDOM, container, oldDOM) {
  diff(virtualDOM, container, oldDOM)
}