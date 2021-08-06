import mountElement from "./mountElement"
import createDOMElement from './createDOMElement'
/**
 * 根据virtualDOM来创建真实的DOM节点，并挂载到页面
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountNativeElement(virtualDOM, container) {
  // 声明变量来存储真实DOM节点
  let newElement = createDOMElement(virtualDOM)
  // 挂载到页面中
  container.appendChild(newElement)
  // 首次渲染时，就将类的实例挂载到对象的虚拟DOM上，这样在挂载过程中，将真实DOM对象存储到类的实例上，便于之后进行diff
  let component = virtualDOM.component
  if (component) {
   // 类组件
   component.setDOM(newElement) 
  }
}