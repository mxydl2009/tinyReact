import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'
import isFunction from './isFunction'
/**
 * 根据组件类型和native类型的不同，来做不同的渲染处理
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountElement(virtualDOM, container, oldDOM) {
  if (isFunction(virtualDOM)) {
    // 组件类型的渲染处理
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    // native类型的渲染处理
    mountNativeElement(virtualDOM, container, oldDOM)    
  }
}