+import React, { useState } from 'react'
import styled from 'styled-components'
import * as color from './color'
import { Card } from './Card'
import { PlusIcon } from './icon'
+import { InputForm as _InputForm } from './InputForm'

export function Column({
  title,
  cards,
}: {
  title?: string
  cards: {
    id: string
    text?: string
  }[]
}) {
  const totalCount = cards.length

    +  const [text, setText] = useState('')
      +
      +  const [inputMode, setInputMode] = useState(false)
        +  const toggleInput = () => setInputMode(v => !v)
          +  const confirmInput = () => setText('')
            +  const cancelInput = () => setInputMode(false)
              +
   return (
    <Container>
      <Header>
        <CountBadge>{totalCount}</CountBadge>
        <ColumnName>{title}</ColumnName>

        -        <AddButton />
        +        <AddButton onClick={toggleInput} />
      </Header>

      +      {inputMode && (
        +        <InputForm
+          value={text}
      +          onChange={setText}
      +          onConfirm={confirmInput}
      +          onCancel={cancelInput}
+        />
+      )}
      +
      <VerticalScroll>
        {cards.map(({ id, text }) => (
          <Card key={id} text={text} />
        ))}
      </VerticalScroll>
    </Container>
  )
}

# 中略

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

  +const InputForm = styled(_InputForm)`
+  padding: 8px;
+`
    +
 const VerticalScroll = styled.div`
   height: 100%;
   padding: 8px;
   overflow-y: auto;
   flex: 1 1 auto;

   > :not(:first-child) {
     margin-top: 8px;
   }
