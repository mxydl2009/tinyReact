import TinyReact from './TinyReact'

const root = document.getElementById('root')

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'default title'
    }
  }
  handleClick() {
    this.setState({
      title: 'modified title'
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props', nextProps);
  }
  componentDidUpdate(prevProps) {
    console.log('did update', prevProps);
  }
  componentWillUpdate() {
    console.log('will update');
  }
  render() {
    return (
      <div>
        hello class component
        <h3>{ this.state.title }</h3>
        <button onClick={() => { this.handleClick() }}>改变title</button>
        { this.props.name }
        { this.props.age }
      </div>
    )  
  }
}

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)
  }
  handleClick() {
    console.log(this.input.value)
    console.log(this.alert)
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => this.input = input}/>
        <button onClick={ () => { this.handleClick() }}>点击</button>
        <Alert name="hello" age="nihao" ref={alert => this.alert = alert} />
      </div>
    )
  }
}

const virtualDOM = (
  <div className="container">
    <h3>hello TinyReact</h3>
    <Demo />
    <Alert name="alert" age={18} />
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

const modifiedDOM = (
  <div className="container">
    <h3>hello modified TinyReact</h3>
    <Demo />
    <Alert name="alert-modified" age={30} />
    <h2 data-test="data-test-123">data-test</h2>
    <div>
      嵌套外层
      <div>嵌套内层</div>
    </div>
    <h5>观察：这个将会改变</h5>
    {/* { 2 === 1 ? <div>2等于1则渲染</div>: <div>2不等于1则渲染</div> } */}
    { 2 === 1 && <div>如果2和1相等则渲染当前内容</div> }
    { 2 === 2 && <div>2等于2则渲染</div> }
    {/* <span>这是一段被修改后的内容</span> */}
    <button onClick={() => { alert('modified clicked!') }}>点击我</button>
    <input type="checkbox" value="" placeholder="请填写内容" />
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
  return (
    <div>
      demo
    </div>
  )
  // return <Heart title="hello react" />
}

// console.log(virtualDOM)
TinyReact.render(virtualDOM, root)

setTimeout(() => {
  TinyReact.render(modifiedDOM, root)
}, 2000)

// TinyReact.render(<Alert name={'hello'} age={'15'} />, root)

// setTimeout(() => {
//   TinyReact.render(<Alert name={'heart'} age='18' />, root)
// }, 2000)
