import { css } from '@linaria/core'
import React, { useCallback, useState } from 'react'

import { Item } from '../components/Item'

function Example() {
  const [text, setText] = useState('')
  const addText = useCallback(() => {
    setA((old) => [text, ...old])
    setText('')
  }, [text])
  const [a, setA] = useState<string[]>([])
  const deleteText = useCallback((index: number) => {
    setA((old) => old.filter((_item, i) => i !== index))
  }, [])

  return (
    <div
      className={css`
        .aaa:disabled {
          cursor: not-allowed;
        }
      `}
    >
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <button className={'aaa'} onClick={addText} disabled={!text}>
        Add item
      </button>
      {a.map((item, index) => (
        <Item key={item + index} text={item} index={index} onDelete={deleteText} />
      ))}
    </div>
  )
}

export default Example
