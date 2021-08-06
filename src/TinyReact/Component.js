import diff from "./diff"

/**
 * 提供组件继承的基类
 */
export default class Component {
  constructor(props) {
    this.props = props
  }
  /**
   * 更新state，并调用render方法获取新的虚拟DOM，使用getDOM获取旧的真实DOM，传入diff函数进行页面更新
   * @param {*} newState 
   */
  setState(newState) {
    this.state = Object.assign({}, this.state, newState)
    // 获取新的DOM对象
    let virtulaDOM = this.render()
    // 获取旧的虚拟DOM，来进行差异化更新
    let oldDOM = this.getDOM()
    let container = oldDOM.parentNode
    // 实现组件更新，这里只是组件的diff更新，并不是整个DOM树的diff
    diff(virtulaDOM, container, oldDOM)
  }
  // 将真实DOM对象存储在类的实例上，这样在setState触发更新时，就可以拿到真实DOM对象了
  setDOM(dom) {
    this._dom = dom
  }
  // 获取对应的真实DOM
  getDOM() {
    return this._dom
  }
  render() {}
}