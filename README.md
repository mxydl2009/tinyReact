# 简易的react框架
根据react的原理，自定义简单的模拟react运行机制的TinyReact框架，包含了React和React.render
## React
- createElement.js：定义（生成）虚拟DOM节点（React元素）的方法
- Component.js：定义React组件的基类
## React.render
- render.js: 类似于React的reconcile过程，将虚拟DOM映射为真实DOM，包括了首次渲染和更新渲染
- diff.js: render过程中的核心
  - 首次渲染：直接将虚拟DOM渲染到页面
  - 更新渲染：通过比对前后的虚拟DOM进行
    - 根据子节点是否具有key属性
    - 有key属性，按照key属性的方式来更新
    - 没有key属性，按照子节点的顺序（索引）依次对比更新
- mountElement.js: 将虚拟DOM节点挂载到页面
 - 组件类型的虚拟DOM节点：mountComponent
 - 普通类型的虚拟DOM节点：mountNativeElement
- createDOMElement.js: 根据virtualDOM来创建真实DOM节点, 并调用mountElement递归挂载子节点
- mountNativeElement.js: 将普通元素的虚拟DOM节点挂载到页面
- mountComponent.js: 将组件类型的虚拟DOM节点挂载到页面
  - 函数类型组件：调用函数获取到内部的虚拟DOM
  - 类组件：调用render方法获取到内部的虚拟DOM
- diffComponent.js: 更新组件
 - 同一个组件：更新组件
 - 不同组件：卸载原组件，添加新组件
- updateComponent.js: 具体的组件更新过程，会调用diff()来创建组件更新到DOM更新的映射
- updateNodeElement.js: 根据虚拟DOM的差异更新元素的属性
- updateTextNode.js: 更新文本节点的内容
- unmountNode.js: 卸载节点，并进行一系列的清理工作
- isFunction.js: 判断是否是组件类型的虚拟DOM节点
- isFunctionComponent.js: 判断是否是函数类型的组件
## stack reconcile
使用递归的方式来进行虚拟DOM的对比更新，边对比边操作DOM，这种递归过程是不能中断的，否则会丢失调用栈。
递归协调方式如果任务占用主线程太久，就容易导致页面卡顿，用户体验不好
## Fiber reconcile
将递归的方式转换为Fiber方式，将对比更新的过程分为两部分
### 构建Fiber
- 根据虚拟DOM构建Fiber，并对比虚拟DOM后将差异存储在Fiber节点中，在对比过程中，不采用递归方式，而是采用链表结构来存储Fiber节点，遍历链表来获取对比差异。
- 通过浏览器的空余时间来执行遍历链表获取差异的操作，保证了响应更高优先级的任务，避免页面卡顿
### 执行DOM操作
- 将Fiber中存储的DOM操作统一应用到真实DOM上，这一过程不能被打断，否则会造成DOM前后不一致。