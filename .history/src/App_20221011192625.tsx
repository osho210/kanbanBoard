import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header as _Header } from './Header'
import { Column } from './Column'
import produce from 'immer'
import { DeleteDialog } from "./DeleteDialog";
import { Overlay as _Overlay } from "./Overlay";
import { randomID } from './util'
import { api } from './api'

type State = {
  columns?: {
    id: string
    title?: string
    text?: string
    cards?: {
      id: string
      text?: string
    }[]
  }[]
  cardsOrder: Record<string, string>
}

export function App() {
  const [filterValue, setFilterValue] = useState('')
  const [{ columns }, setData] = useState<State>({ cardsOrder: {} })

  useEffect(() => {
    ; (async () => {
      const columns = await api('GET /v1/columns', null)

      setData(
        produce((draft: State) => {
          draft.columns = columns
        }),
      )

      const unorderedCards = await api('GET /v1/cards', null)

      setData(
        produce((draft: State) => {
          draft.columns?.forEach(column => {
            column.cards = unorderedCards
          })
        }),
      )
    })()
  }, [])

  const [draggingCardID, setDraggingCardID] = useState<string | undefined>(
    undefined,
  )
  const [deletetingCardID, setDeletetingCardID] = useState<string | undefined>(
    undefined,
  )

  const dropCardTo = (toID: string) => {
    const fromID = draggingCardID
    if (!fromID) return

    setDraggingCardID(undefined)
    if (fromID === toID) return

    setData(
      produce((draft: State) => {
        const card = draft.columns
          ?.flatMap(col => col.cards ?? [])
          .find(c => c.id === fromID)
        if (!card) return

        const fromColumn = draft.columns?.find(col =>
          col.cards?.some(c => c.id === fromID),
        )
        if (!fromColumn?.cards) return

        fromColumn.cards = fromColumn.cards.filter(c => c.id !== fromID)
        const toColumn = draft.columns?.find(
          col => col.id === toID || col.cards?.some(c => c.id === toID),
        )
        if (!toColumn?.cards) return

        let index = toColumn.cards.findIndex(c => c.id === toID)
        if (index < 0) {
          index = toColumn.cards.length
        }
        toColumn.cards.splice(index, 0, card)
      })
    )
  }

  const setText = (colunID: string, value: string) => {
    setData(
      produce((columns: State) => {
        const column = draft.columns?.find(c => c.id === colunID)
        if (!column) return
        column.text = value
      }),
    )
  }

  const addCard = (columnID: string) => {
    const column = columns?.find(c => c.id === columnID)
    if (!column) return
    const text = column.text
    const cardID = randomID()
    setData(
      produce((draft: State) => {
        const column = draft.columns?.find(c => c.id === columnID)
        if (!column) return

        column.cards?.unshift({
          id: cardID,
          text: column.text,
        })
        column.text = ''
      }),
    )
    api('POST /v1/cards', {
      id: cardID,
      text
    })
  }

  const deleteCard = () => {
    const cardID = deletetingCardID
    if (!cardID) return

    setDeletetingCardID(undefined)

    setData(
      produce((columns: Columns) => {
        const column = columns.find(col =>
          col.cards?.some(c => c.id === cardID))
        if (!column) return

        column.cards = column.cards?.filter(c => c.id !== cardID)
      }),
    )
  }

  return (
    <Container>
      <Header filterValue={filterValue} onFilterChange={setFilterValue} />
      <MainArea>
        <HorizontalScroll>
          {columns.map(({ id: columnID, title, cards, text }) => (
            <Column
              key={columnID}
              title={title}
              filterValue={filterValue}
              cards={cards}
              onCardDragStart={cardID => setDraggingCardID(cardID)}
              onCardDrop={entered => dropCardTo(entered ?? columnID)}
              onCardDeleteClick={cardID => setDeletetingCardID(cardID)}
              text={text}
              onTextChange={value => setText(columnID, value)}
              onTextConfirm={() => addCard(columnID)}
            />
          ))}
        </HorizontalScroll>
      </MainArea>
      {deletetingCardID && (
        <Overlay onClick={() => setDeletetingCardID(undefined)}>
          <DeleteDialog
            onConfirm={deleteCard}
            onCancel={() => setDeletetingCardID(undefined)}
          />
        </Overlay>
      )}
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

const Overlay = styled(_Overlay)`
display:flex;
justify-content:center;
align-items:center;
`