import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Header as _Header } from './Header';
import { Column } from './Column';
import produce from 'immer';
import { DeleteDialog } from "./DeleteDialog";
import { Overlay as _Overlay } from "./Overlay";
import { randomID } from './util';
import { api } from './api';
export function App() {
    const [filterValue, setFilterValue] = useState('');
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        ;
        (async () => {
            const columns = await api('GET /v1/columns', null);
            setColumns(columns);
            const unorderedCards = await api('GET /v1/cards', null);
            setColumns(produce((columns) => {
                columns.forEach(column => {
                    column.cards = unorderedCards;
                });
            }));
        })();
    }, []);
    const [draggingCardID, setDraggingCardID] = useState(undefined);
    const [deletetingCardID, setDeletetingCardID] = useState(undefined);
    const dropCardTo = (toID) => {
        const fromID = draggingCardID;
        if (!fromID)
            return;
        setDraggingCardID(undefined);
        if (fromID === toID)
            return;
        setColumns(produce((columns) => {
            const card = columns
                .flatMap(col => { var _a; return (_a = col.cards) !== null && _a !== void 0 ? _a : []; })
                .find(c => c.id === fromID);
            if (!card)
                return;
            const fromColumn = columns.find(col => { var _a; return (_a = col.cards) === null || _a === void 0 ? void 0 : _a.some(c => c.id === fromID); });
            if (!(fromColumn === null || fromColumn === void 0 ? void 0 : fromColumn.cards))
                return;
            fromColumn.cards = fromColumn.cards.filter(c => c.id !== fromID);
            const toColumn = columns.find(col => { var _a; return col.id === toID || ((_a = col.cards) === null || _a === void 0 ? void 0 : _a.some(c => c.id === toID)); });
            if (!(toColumn === null || toColumn === void 0 ? void 0 : toColumn.cards))
                return;
            let index = toColumn.cards.findIndex(c => c.id === toID);
            if (index < 0) {
                index = toColumn.cards.length;
            }
            toColumn.cards.splice(index, 0, card);
        }));
    };
    const setText = (colunID, value) => {
        setColumns(produce((columns) => {
            const column = columns.find(c => c.id === colunID);
            if (!column)
                return;
            column.text = value;
        }));
    };
    const addCard = (columnID) => {
        const column = columns.find(c => c.id === columnID);
        if (!column)
            return;
        const text = column.text;
        const cardID = randomID();
        setColumns(produce((columns) => {
            var _a;
            const column = columns.find(c => c.id === columnID);
            if (!column)
                return;
            (_a = column.cards) === null || _a === void 0 ? void 0 : _a.unshift({
                id: cardID,
                text: column.text,
            });
            column.text = '';
        }));
        api('POST /v1/cards', {
            id: cardID,
            text
        });
    };
    const deleteCard = () => {
        const cardID = deletetingCardID;
        if (!cardID)
            return;
        setDeletetingCardID(undefined);
        setColumns(produce((columns) => {
            var _a;
            const column = columns.find(col => { var _a; return (_a = col.cards) === null || _a === void 0 ? void 0 : _a.some(c => c.id === cardID); });
            if (!column)
                return;
            column.cards = (_a = column.cards) === null || _a === void 0 ? void 0 : _a.filter(c => c.id !== cardID);
        }));
    };
    return (React.createElement(Container, null,
        React.createElement(Header, { filterValue: filterValue, onFilterChange: setFilterValue }),
        React.createElement(MainArea, null,
            React.createElement(HorizontalScroll, null, columns.map(({ id: columnID, title, cards, text }) => (React.createElement(Column, { key: columnID, title: title, filterValue: filterValue, cards: cards, onCardDragStart: cardID => setDraggingCardID(cardID), onCardDrop: entered => dropCardTo(entered !== null && entered !== void 0 ? entered : columnID), onCardDeleteClick: cardID => setDeletetingCardID(cardID), text: text, onTextChange: value => setText(columnID, value), onTextConfirm: () => addCard(columnID) }))))),
        deletetingCardID && (React.createElement(Overlay, { onClick: () => setDeletetingCardID(undefined) },
            React.createElement(DeleteDialog, { onConfirm: deleteCard, onCancel: () => setDeletetingCardID(undefined) })))));
}
const Container = styled.div `
  display: flex;
  flex-flow: column;
  height: 100%;
`;
// html要素に対応したコンポーネント以外もスタイリングできるようになる
const Header = styled(_Header) `
  flex-shrink: 0;
`;
const MainArea = styled.div `
  height: 100%;
  padding: 16px 0;
  overflow-y: auto;
`;
const HorizontalScroll = styled.div `
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
`;
const Overlay = styled(_Overlay) `
display:flex;
justify-content:center;
align-items:center;
`;
