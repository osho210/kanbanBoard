import React from 'react'
import ReactDOM from 'react-dom'
import {creatStore} from 
import { GlobalStyle } from './GlobalStyle'
import { App } from './App'


// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>
    , document.getElementById('app')
)
