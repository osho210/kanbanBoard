import React from 'react';
import ReactDOM from 'react-dom';
function App() {
    return (React.createElement("div", null,
        React.createElement("header", null,
            React.createElement("div", null, "Kanban board"),
            React.createElement("input", { placeholder: 'Filter cards' })),
        React.createElement("div", null,
            React.createElement("section", null,
                React.createElement("h3", null, "TODO"),
                React.createElement("article", null, "\u671D\u98DF\u3092\u3068\u308B"),
                React.createElement("article", null, "SNS\u3092\u30C1\u30A7\u30C3\u30AF\u3059\u308B"),
                React.createElement("article", null, "\u5E03\u56E3\u306B\u5165\u308B")),
            React.createElement("section", null,
                React.createElement("article", null, "\u9854\u3092\u6D17\u3046"),
                React.createElement("article", null, "\u6B6F\u3092\u78E8\u304F")),
            React.createElement("section", null,
                React.createElement("h3", null, "Waiting")),
            React.createElement("section", null,
                React.createElement("h3", null, "Done"),
                React.createElement("article", null, "\u5E03\u56E3\u304B\u3089\u51FA\u308B")))));
}
// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
