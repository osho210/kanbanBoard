import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return (
        <div>
            <header>
                <div>Kanban board</div>
                <input placeholder='Filter cards' />
            </header>
            <div>
                <section>
                    <h3>TODO</h3>
                    <article>朝食をとる</article>
                    <article></article>
                    <article></article>
                </section>
            </div>
        </div>
    )
}
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(<App />, document.getElementById('app'))
