/**
 * 判断是否是组件类型
 */
export default (virtualDOM) => virtualDOM && typeof virtualDOM.type === 'function'