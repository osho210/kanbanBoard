import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return (
        <Container>
            <header>
                <div>Kanban board</div>
                <input placeholder='Filter cards' />
            </header>
            <Header>
                <section>
                    <h3>TODO</h3>
                    <article>朝食をとる</article>
                    <article>SNSをチェックする</article>
                    <article>布団に入る</article>
                </section>
                <section>
                    <article>顔を洗う</article>
                    <article>歯を磨く</article>
                </section>
                <section>
                    < h3>Waiting</h3>
                </section>
                <section>
                    <h3>Done</h3>
                    <article>布団から出る</article>
                </section>
            </div>
        </Container>
    )
}
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(<App />, document.getElementById('app'))
