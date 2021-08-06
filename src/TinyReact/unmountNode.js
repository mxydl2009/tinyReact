/**
 * 卸载节点，即从页面中删除节点
 * @param {*} node 
 */
export default function unmountNode(node) {
  // 以前删除节点是node.parentNode.removeChild(node)，现在可以直接node.remove()即将自己从页面中删除
  node.remove()
}