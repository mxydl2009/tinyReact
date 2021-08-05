import TinyReact from './TinyReact'

const root = document.getElementById('root')

const virtualDOM = (
  <div className="container">
    <h1>hello TinyReact</h1>
    <Demo />
    <Alert />
    <h2 data-test="data-test">data-test</h2>
    <div>
      嵌套外层
      <div>嵌套内层</div>
    </div>
    <h3>观察：这个将会改变</h3>
    {/* { 2 === 1 ? <div>2等于1则渲染</div>: <div>2不等于1则渲染</div> } */}
    { 2 === 1 && <div>如果2和1相等则渲染当前内容</div> }
    { 2 === 2 && <div>2等于2则渲染</div> }
    <span>这是一段内容</span>
    <button onClick={() => { alert('clicked!') }}>点击我</button>
    <input type="text" value="" placeholder="请填写内容" />
  </div>
)

function Heart(props) {
  return (
    <div>
      &hearts;
      { props.title }
    </div>
  )
}

function Demo() {
  // return (
  //   <div>
  //     心：<Heart />
  //   </div>
  // )
  return <Heart title="hello react" />
}

class Alert extends TinyReact.Component {
  render() {
    return (
      <div>
        hello class component
      </div>
    )  
  }
}

// console.log(virtualDOM)
TinyReact.render(virtualDOM, root)
