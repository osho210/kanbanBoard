import React from 'react'
import styled from 'styled-components'
import * as color from './color'
// チェックとゴミ箱をインポート
import { CheckIcon as _CheckIcon, TrashIcon } from './icon'

export function Card({ text }: { text?: string }) {
    return (
        <Container>
            <CheckIcon />

            {/* httpsを文字列に変換 　\S->空白文字以外のすべて /g->複数の置換*/}
            {text?.split(/(https?:\/\/\S+)/g).map((fragment, i) =>{
                return(<>
                </>)
            }
                i % 2 === 0 ? (
                    <Text key={i}>{fragment}</Text>
                ) : (
                    // リンクが含まれた場合はその部分をリンクに変換
                    <Link key={i} href={fragment}>
                        {fragment}
                    </Link>
                ),
            )}
            <DeleteButton />
        </Container>
    )
}

const Container = styled.div.attrs({
    // 要素がドラッグ可能であることを表す(将来的には動かせるようになる？)
    draggable: true,
})`
  position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  //移動されることを示す
  cursor: move;
`

const CheckIcon = styled(_CheckIcon)`
  position: absolute;
  top: 12px;
  left: 8px;
  color: ${color.Green};
`

const DeleteButton = styled.button.attrs({
    type: 'button',
    children: <TrashIcon />,
})`
  position: absolute;
  top: 12px;
  right: 8px;
  font-size: 14px;
  color: ${color.Gray};

  :hover {
    color: ${color.Red};
  }
`

const Text = styled.span`
  color: ${color.Black};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`

const Link = styled.a.attrs({
    target: '_blank',
    rel: 'noopener noreferrer',
})`
  color: ${color.Blue};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`