import React, { useState } from "react";
import styled from "styled-components";
import { Header as _Header } from './Header'
import { Column } from './Column'

export function App() {
  const [filterValue, setFilterValue] = useState('')
  const [columns, setColumns] = useState([
    {
      id: 'A',
      title: 'TODO',
      cards: [
        { id: 'a', text: '朝食をとる' },
        { id: 'b', text: 'SNSをチェックする' },
        { id: 'c', text: '布団に入る' },
      ],
    },
    {
      id: 'B',
      title: 'Doing',
      cards: [
        { id: 'd', text: '顔を洗う' },
        { id: 'e', text: '歯を磨く' },
      ],
    },
    {
      id: 'C',
      title: 'Waiting',
      cards: [],
    },
    {
      id: 'D',
      title: 'Done',
      cards: [{
        id: 'f', text: '布団から出る'
      }]
    }
  ])

  const [draggingCardID, setDraggingCardID] = useState<string | undefined>(
    undefined,
  )

  const dropCardTo = (toID: string) => {
    const fromID = draggingCardID
    if (!fromID) return

    setDraggingCardID(undefined)
    if (fromID === toID) return

    setColumns(columns => {
      const card = columns.flatMap(col => col.cards).find(c => c.id === fromID)
      if (!card) {
        return columns
      }

      return columns.map(column=>{
        let newColumn = column
        if(newColumn.cards.some(c))
      })
    })
  }

  return (
    <Container>
      <Header filterValue={filterValue} onFilterChange={setFilterValue} />
      <MainArea>
        <HorizontalScroll>
          {columns.map(({ id: columnID, title, cards }) => (
            <Column
              key={columnID}
              title={title}
              filterValue={filterValue}
              cards={cards}
              onCardDragStart={cardID => setDraggingCardID(cardID)}
              onCardDrop={entered => dropCardTo(entered ?? columnID)}
            />
          ))}
        </HorizontalScroll>
      </MainArea>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`
// html要素に対応したコンポーネント以外もスタイリングできるようになる
const Header = styled(_Header)`
  flex-shrink: 0;
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