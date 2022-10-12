import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useSelector } from "react-redux";
import { State as RootState, Action } from "./reducer";
import { Header as _Header } from './Header'
import { Column } from './Column'
import produce from 'immer'
import { DeleteDialog } from "./DeleteDialog";
import { Overlay as _Overlay } from "./Overlay";
import { randomID, sortBy, reorderPatch } from './util'
import { api, ColumnID, CardID } from './api'

type State = {
  columns?: {
    id: ColumnID
    title?: string
    text?: string
    cards?: {
      id: CardID
      text?: string
    }[]
  }[]
  // この処理は完了
  cardsOrder: Record<string, CardID | ColumnID>
}

export function App() {
  const filterValue = useSelector((state: RootState) => state.filterValue)
  const setFilterValue = () => { }
  const [{ columns, cardsOrder }, setData] = useState<State>({ cardsOrder: {} })

  useEffect(() => {
    ; (async () => {
      const columns = await api('GET /v1/columns', null)

      setData(
        produce((draft: State) => {
          draft.columns = columns
        }),
      )

      const [unorderedCards, cardsOrder] = await Promise.all([
        api('GET /v1/cards', null),
        api('GET /v1/cardsOrder', null),
      ])

      setData(
        produce((draft: State) => {
          draft.cardsOrder = cardsOrder
          draft.columns?.forEach(column => {
            column.cards = sortBy(unorderedCards, cardsOrder, column.id)
          })
        }),
      )
    })()
  }, [])
  // この下から処理を変更
  const [draggingCardID, setDraggingCardID] = useState<CardID | undefined>(
    undefined,
  )

  const dropCardTo = (toID: CardID | ColumnID) => {
    const fromID = draggingCardID
    if (!fromID) return

    setDraggingCardID(undefined)

    if (fromID === toID) return

    const patch = reorderPatch(cardsOrder, fromID, toID)

    setData(
      produce((draft: State) => {
        draft.cardsOrder = {
          ...draft.cardsOrder,
          ...patch,
        }
        const unorderedCards = draft.columns?.flatMap(c => c.cards ?? []) ?? []
        draft.columns?.forEach(column => {
          column.cards = sortBy(unorderedCards, draft.cardsOrder, column.id)
        })
      })
    )
    api('PATCH /v1/cardsOrder', patch)
  }

  const setText = (columnID: ColumnID, value: string) => {
    setData(
      produce((draft: State) => {
        const column = draft.columns?.find(c => c.id === columnID)
        if (!column) return
        column.text = value
      }),
    )
  }

  const addCard = (columnID: ColumnID) => {
    const column = columns?.find(c => c.id === columnID)
    if (!column) return

    const text = column.text
    const cardID = randomID() as CardID

    setData(
      produce((draft: State) => {
        const column = draft.columns?.find(c => c.id === columnID)
        if (!column) return

        column.cards?.unshift({
          // idの型宣言は別ファイルで定義している
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

  const [deletetingCardID, setDeletingCardID] = useState<CardID | undefined>(
    undefined,
  )

  const deleteCard = () => {
    const cardID = deletetingCardID
    if (!cardID) return

    setDeletingCardID(undefined)

    const patch = reorderPatch(cardsOrder, cardID)

    setData(
      produce((draft: State) => {
        const column = draft.columns?.find(col =>
          col.cards?.some(c => c.id === cardID))
        if (!column?.cards) return

        column.cards = column.cards.filter(c => c.id !== cardID)

        draft.cardsOrder = {
          ...draft.cardsOrder,
          ...patch,
        }
      }),
    )

    api('DELETE /v1/cards', {
      id: cardID,
    })
    api('PATCH /v1/cardsOrder', patch)
  }

  return (
    <Container>
      <Header filterValue={filterValue} onFilterChange={setFilterValue} />
      <MainArea>
        <HorizontalScroll>
          {!columns ? (

            <Loading />
          ) :
            columns.map(({ id: columnID, title, cards, text }) => (
              <Column
                key={columnID}
                title={title}
                filterValue={filterValue}
                cards={cards}
                onCardDragStart={cardID => setDraggingCardID(cardID)}
                onCardDrop={entered => dropCardTo(entered ?? columnID)}
                onCardDeleteClick={cardID => setDeletingCardID(cardID)}
                text={text}
                onTextChange={value => setText(columnID, value)}
                onTextConfirm={() => addCard(columnID)}
              />
            ))}
        </HorizontalScroll>
      </MainArea>
      {deletetingCardID && (
        <Overlay onClick={() => setDeletingCardID(undefined)}>
          <DeleteDialog
            onConfirm={deleteCard}
            onCancel={() => setDeletingCardID(undefined)}
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

const Loading = styled.div.attrs({
  children: 'Loading...'
})`
font-size:14px
`

const Overlay = styled(_Overlay)`
display:flex;
justify-content:center;
align-items:center;
`