import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return <h1>Hello React!</h1>
}
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(<App />, document.getElementById('app'))
