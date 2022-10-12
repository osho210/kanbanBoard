import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducer'
import { GlobalStyle } from './GlobalStyle'
import { App } from './App'

const store = createStore(reducer)
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(
    <Provider>
        <GlobalStyle />
        <App />
    </>
    , document.getElementById('app')
)
