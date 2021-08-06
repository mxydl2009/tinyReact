import diff from "./diff"

/**
 * 组件更新
 * @param {*} virtualDOM ： 最新的虚拟DOM
 * @param {*} oldComponent ： 组件实例
 * @param {*} oldDOM ： 组件对应的原来的DOM对象
 * @param {*} container ： DOM对象的父级容器
 */
export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
  // 生命周期函数调用
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    // 获取组件未更新前的props
    let prevProps = oldComponent.props
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 更新props
    oldComponent.updateProps(virtualDOM.props)
    // 获取组件对应的虚拟DOM
    let nextVirtualDOM = oldComponent.render()
    // 给组件对应的虚拟DOM挂载上组件实例
    nextVirtualDOM.component = oldComponent
    // 更新组件
    diff(nextVirtualDOM, container, oldDOM)
    // 生命周期函数调用
    oldComponent.componentDidUpdate(prevProps)
  }
  
}