/**
 * 创建虚拟DOM对象
 * @param {*} type 元素类型
 * @param {*} props 属性对象
 * @param {*} children 子元素
 */
export default function createElement(type, props, ...children) {
  // 为文本类型的子节点转换为对象形式，其中文本作为该对象的props.textContent存储
  // 如果子节点的值是false、null、undefined，则要过滤出去
  const childElements = [].concat(children).reduce((result, child) => {
    if (child !== false && child !== null && child !== undefined) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement('text', { textContent: child }))
      }
    }
    return result
  }, [])
  return {
    type,
    props: {
      ...props,
      children: childElements
    }
  }
}