import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './GlobalStyle'
import {App} from


// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>
    , document.getElementById('app')
)
