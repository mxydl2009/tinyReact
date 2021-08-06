// 组件更新, 分两种情况
// 1. 同一个组件，则只要组件的更新即可
// 2. 不同的组件，则将新组件挂载，旧组件删除
// 参数解释
// virtualDOM：代表组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
// oldComponent：要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
// oldDOM：要更新的 DOM对象，在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象

import mountElement from "./mountElement"
import unmountNode from "./unmountNode"
import updateComponent from './updateComponent'

// container：如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 组件更新
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不是同一个组件
    // 将新的组件挂载
    mountElement(virtualDOM, container, oldDOM)
  }
}
// 判定是否是同一个组件
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}