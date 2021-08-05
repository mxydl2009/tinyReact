import mountNativeElement from './mountNativeElement'

/**
 * 根据组件类型和native类型的不同，来做不同的渲染处理
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountElement(virtualDOM, container) {
  // native类型的渲染处理
  mountNativeElement(virtualDOM, container)
}