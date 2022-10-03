import React from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'

function App() {

    return (
        <Container>
            <Header>
                <Logo>Kanban board</Logo>

                <CardFilter placeholder="Filter cards" />
            </Header>

            <MainArea>
                <HorizontalScroll>
                    <Column>
                        <ColumnHeader>TODO</ColumnHeader>

                        <Card>朝食をとる🍞</Card>
                        <Card>SNSをチェックする🐦</Card>
                        <Card>布団に入る (:3[___]</Card>
                    </Column>

                    <Column>
                        <ColumnHeader>Doing</ColumnHeader>

                        <Card>顔を洗う👐</Card>
                        <Card>歯を磨く🦷</Card>
                    </Column>

                    <Column>
                        <ColumnHeader>Waiting</ColumnHeader>
                    </Column>

                    <Column>
                        <ColumnHeader>Done</ColumnHeader>

                        <Card>布団から出る (:3っ)っ -=三[＿＿]</Card>
                    </Column>
                </HorizontalScroll>
            </MainArea>
        </Container>
    )
}

//styled-componentsを使用
const Container = styled.div`
display: flex;
+  flex-flow: column;
+  height: 100%;
`
const Header = styled.div`
display: flex;
+  align-items: center;
+  justify-content: space-between;
+  padding: 8px 16px;
+  background-color: ${color.Navy};
+  flex-shrink: 0;
+  color: ${color.Silver};
+  font-size: 16px;
+  font-weight: bold;
`
const Logo = styled.div`
height: 100%;
+  padding: 16px 0;
+  overflow-y: auto;`


const CardFilter = styled.input`
display: flex;
+  align-items: center;
+  min-width: 300px;
+  border: solid 1px ${color.Silver};
+  border-radius: 3px;
`
const MainArea = styled.div`
height: 100%;
+  padding: 16px 0;
+  overflow-y: auto;
`
const HorizontalScroll = styled.div`
display: flex;
+  width: 100%;
+  height: 100%;
+  overflow-x: auto;
+
+  > * {
+    margin-left: 16px;
+    flex-shrink: 0;
+  }
+
+  ::after {
+    display: block;
+    flex: 0 0 16px;
+    content: '';
+  }
`

const Column = styled.div``
const ColumnHeader = styled.div``
const Card = styled.div``
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
