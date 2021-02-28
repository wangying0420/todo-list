import { css } from '@linaria/core'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import React, { useCallback, useState } from 'react'

export function ComplatedItem(props: {
  text: string
  index: number
  onCheck: (index: number, text: string) => void
}) {
  const handleCheck = useCallback(() => {
    props.onCheck(props.index, props.text)
  }, [props.onCheck, props.index, props.text])
  return (
    <div
      className={css`
        display: flex;
        width: 100%;
        margin-top: 10px;
        line-height: 40px;
        align-items: center;
        flex-direction: row;
        background: #f0f8ff;
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Checkbox
          onChange={handleCheck}
          defaultChecked={true}
          className={css`
            margin-left: 5px;
            margin-right: 5px;
          `}
        />
        <div
          className={css`
            text-decoration: line-through;
          `}
        >
          {props.text}
        </div>
      </div>
    </div>
  )
}
