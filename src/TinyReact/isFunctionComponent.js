export default (virtualDOM) => {
  const type = virtualDOM.type
  if (type && typeof type === 'function') {
    return !(type.prototype && type.prototype.render)
  } else {
    return false
  }
}