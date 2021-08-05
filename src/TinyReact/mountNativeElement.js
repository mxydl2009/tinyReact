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
}