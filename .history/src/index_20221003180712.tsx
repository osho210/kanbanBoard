import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return (
        <Container>
            <Header>
                <Logo></Logo>
            </Header>
        </Container>
    )
}
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(<App />, document.getElementById('app'))
