import { css } from '@linaria/core'
import { Button, Checkbox } from 'antd'
import React, { useCallback, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'

export function TodoItem(props: {
  text: string
  id: string
  onDelete: (id: number) => void
  onCheck: (id: number, text: string) => void
}) {
  const handleClick = useCallback(() => {
    props.onDelete(props.id)
  }, [props.onDelete])
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
        justify-content: space-between;
        &:nth-child(even) {
          background: #e4f4e4;
        }
        &:nth-child(odd) {
          background: #fffacd;
        }
        &:hover {
          background: #e5f0be;
        }
        button:active {
          background: #c9eaf2;
        }
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
          className={css`
            margin-left: 5px;
            margin-right: 5px;
          `}
        />
        <div>{props.text}</div>
      </div>
      <div>
        <Button
          className={'deleteBtn'}
          icon={
            <DeleteOutlined
              className={css`
                display: flex;
                align-items: center;
              `}
            />
          }
          onClick={handleClick}
        ></Button>
      </div>
    </div>
  )
}
