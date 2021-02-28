import { css } from '@linaria/core'
import React, { useCallback, useState } from 'react'
import Head from 'next/head'

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
    <>
      <Head>
        <title>TODO LIST</title>
      </Head>
      <div
        className={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
          <button
            className={css`
              &:disabled {
                cursor: not-allowed;
              }
            `}
            onClick={addText}
            disabled={!text}
          >
            Add item
          </button>
          {a.map((item, index) => (
            <Item key={item + index} text={item} index={index} onDelete={deleteText} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Example
