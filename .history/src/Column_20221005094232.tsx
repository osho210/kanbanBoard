import React, { useState } from 'react'
import styled from 'styled-components'
import * as color from './color'
import { Card } from './Card'
import { PlusIcon } from './icon'
import { InputForm, InputForm as _InputForm } from './InputForm'

// propsの受け取り
export function Column({ title, cards, }: {
  title?: string
  // cardsの要素の型宣言
  cards: {
    id: string
    text?: string
    // この配列何？
  }[]
}) {
  //cardの要素数の表示
  const totalCount = cards.length

  // useStateは第1引数が変数、第2引数が変数上書きのための関数
  const [text, setText] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const toggleInput = () => setInputMode(v => !v)
  const confirmInput = () => setText('')
  const cancelInput = () => setInputMode(false)

  return (
    // div要素
    <Container>
      <Header>
        <CountBadge>{totalCount}</CountBadge>
        <ColumnName>{title}</ColumnName>

        <AddButton onclick={toggleInput} />
      </Header>
      {inputMode &&(
        <InputForm
        value={text}
        onChange={setText}
        onConfirm={}
      )}
      <VerticalScroll>
        {cards.map(({ id, text }) => (
          // card内要素のprops渡し
          <Card key={id} text={text} />
        ))}
      </VerticalScroll>
    </Container>
  )
}

const Container = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
`

const CountBadge = styled.div`
  margin-right: 8px;
  border-radius: 20px;
  padding: 2px 6px;
  color: ${color.Black};
  background-color: ${color.Silver};
  font-size: 12px;
  line-height: 1;
`

const ColumnName = styled.div`
  color: ${color.Black};
  font-size: 14px;
  font-weight: bold;
`

const AddButton = styled.button.attrs({
  type: 'button',
  children: <PlusIcon />,
})`
  margin-left: auto;
  color: ${color.Black};

  :hover {
    color: ${color.Blue};
  }
`

const VerticalScroll = styled.div`
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  flex: 1 1 auto;

  > :not(:first-child) {
    margin-top: 8px;
  }
`