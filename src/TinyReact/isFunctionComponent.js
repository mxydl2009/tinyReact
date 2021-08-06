/**
 * 判断是否是函数组件还是类组件
 */
export default (virtualDOM) => {
  const type = virtualDOM.type
  if (type && typeof type === 'function') {
    return !(type.prototype && type.prototype.render)
  } else {
    return false
  }
}