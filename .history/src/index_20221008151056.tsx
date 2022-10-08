import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './GlobalStyle'
import {App} from './App'


// 第一引数を第二引数のDOM要素にマウントするメソッド
createRoot.render(
    <>
        <GlobalStyle />
        <App />
    </>
    , document.getElementById('app')
)
