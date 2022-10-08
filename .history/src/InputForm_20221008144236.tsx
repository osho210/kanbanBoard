// 受け取った値の表示・ボタンクリックや入力の通知がInputFormの責務
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as color from './color'
import { Button, ConfirmButton } from './Button'

// 第一引数がprops
export function InputForm({
    onConfirm,
    onCancel,
    className, }
    : {
        onConfilm
        onCancel?(): void
        className?: string
    }) {

    const [value, setValue] = useState('')
    // valueが存在しない場合に処理を実行？
    const disabled = !value?.trim()
    // confirm表示処理
    const handleConfirm = () => {
        // disabledが存在すると実行しない
        if (disabled) return
        // onConfirm?.()
        setValue('')
        onConfirm?.(value)
    }

    return (
        <Container className={className}>
            <Input
                autoFocus
                placeholder="Enter a note"
                value={value}
                onChange={ev => setValue(ev.currentTarget.value)}
                onKeyDown={ev => {
                    if (!((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter')) return
                    handleConfirm()
                }}
            />

            <ButtonRow>
                <AddButton disabled={disabled} onClick={handleConfirm} />
                <CancelButton onClick={onCancel} />
            </ButtonRow>
        </Container>
    )
}

const Container = styled.div``

const Input = styled.textarea`
  display: block;
  width: 100%;
  margin-bottom: 8px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.White};
  font-size: 14px;
  line-height: 1.7;

  :focus {
    outline: none;
    border-color: ${color.Blue};
  }
`

const ButtonRow = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 8px;
  }
`

const AddButton = styled(ConfirmButton).attrs({
    children: 'Add',
})``

const CancelButton = styled(Button).attrs({
    children: 'Cancel',
})``