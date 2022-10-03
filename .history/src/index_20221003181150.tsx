import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

function App() {
    return (
        <Container>
            <Header>
                <Logo>Kanban board</Logo>

                <CardFilter placeholder="Filter cards" />
            </Header>

            <MainArea>
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
            </MainArea>
        </Container>
    )
}

//styled-componentsを使用
const Container = styled.div``
const Header =styled.div``
const Logo = styled.div``
const Ca


// 第一引数を第二引数のDOM要素にマウントするメソッド
ReactDOM.render(<App />, document.getElementById('app'))
