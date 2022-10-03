import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './GlobalStyle'

function App() {

    
}

//styled-componentsを使用
const Container = styled.div`
display: flex;
  flex-flow: column;
  height: 100%;
`
const Header = styled.div`
display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${color.Navy};
  flex-shrink: 0;
  color: ${color.Silver};
  font-size: 16px;
  font-weight: bold;
`
const Logo = styled.div`
height: 100%;
  padding: 16px 0;
  overflow-y: auto;`


const CardFilter = styled.input`
display: flex;
  align-items: center;
  min-width: 300px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
`
const MainArea = styled.div`
height: 100%;
  padding: 16px 0;
  overflow-y: auto;
`
const HorizontalScroll = styled.div`
display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto;

  > * {
    margin-left: 16px;
    flex-shrink: 0;
  }

  ::after {
    display: block;
    flex: 0 0 16px;
    content: '';
  }
`

const Column = styled.div`
display: flex;
  flex-flow: column;
  width: 355px;
  height: 100%;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  background-color: ${color.LightSilver};

  > :not(:last-child) {
    flex-shrink: 0;
  }
`

const ColumnHeader = styled.div`
display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;`

const Card = styled.div`
position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`
const GlobalStyle = createGlobalStyle`
    html,body,#app{
        height:100%;
    }
    body{
        /* https://css-tricks.com/snippets/css/system-font-stack/ */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

      overflow-wrap:break-word;
    }
    `


// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>
    , document.getElementById('app')
)
