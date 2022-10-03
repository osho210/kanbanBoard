import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return (
        <Container>
            <Header>
                <Logo>Kanban board</Logo>
                <CardFilter placeholder="Filter cards" />
            </Header>
            <
        </Container>
    )
}
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(<App />, document.getElementById('app'))
