import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'
/**
 * 处理React元素（虚拟DOM节点）是组件类型的情况
 * 函数组件和类组件也要分别对待，通过是否具有render方法来判定
 */
export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件, 直接调用函数得到返回的虚拟DOM
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
    // console.log(nextVirtualDOM)
  } else {
    // 处理类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }
  if(isFunction(nextVirtualDOM)) {
    // 需要再次判定 返回的虚拟DOM是否是组件类型，如果是，则继续调用mountComponent
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  // 返回组件的虚拟DOM树
  const component = new virtualDOM.type(virtualDOM.props || {})
  let nextVirtualDOM = component.render()
  // 将实例挂载到虚拟DOM上，便于之后获取该实例对象，从而可以使用setDOM将真实DOM存储在实例对象里
  nextVirtualDOM.component = component
  return nextVirtualDOM
}