import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './GlobalStyle';
import { App } from './App';
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(React.createElement(React.Fragment, null,
    React.createElement(GlobalStyle, null),
    React.createElement(App, null)), document.getElementById('app'));
