import { css } from '@linaria/core'
import React, { useCallback, useState } from 'react'
import Head from 'next/head'

import { TodoItem } from '../components/TodoItem'
import { ComplatedItem } from '../components/ComplatedItem'
import { Button, Input, Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Panel } = Collapse

function Example() {
  const [text, setText] = useState('')
  const addText = useCallback(() => {
    setTodoList((old) => [text, ...old])
    setText('')
  }, [text])
  const [todoList, setTodoList] = useState<string[]>([])
  const deleteText = useCallback((index: number) => {
    setTodoList((old) => old.filter((_item, i) => i !== index))
  }, [])
  const [complatedList, setComplatedList] = useState<string[]>([])
  const complatedJob = useCallback(
    (index: number, text: string) => {
      setTodoList((old) => old.filter((_item, i) => i !== index))
      setComplatedList((old) => [text, ...old])
    },
    [text],
  )
  const addTodo = useCallback(
    (index: number, text: string) => {
      setTodoList((old) => [text, ...old])
      setComplatedList((old) => old.filter((_item, i) => i !== index))
    },
    [text],
  )

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
        <div
          className={css`
            width: 400px;
          `}
        >
          <div
            className={css`
              display: flex;
              justify-content: center;
              flex-direction: row;
              align-items: center;
            `}
          >
            <Input
              className={'input'}
              value={text}
              size="large"
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className={css`
                &:disabled {
                  cursor: not-allowed;
                }
              `}
              onClick={addText}
              disabled={!text}
            >
              Add item
            </Button>
          </div>
          <Collapse defaultActiveKey={['todo']}>
            <Panel header="Todo" key="todo">
              {todoList.map((item, index) => (
                <TodoItem
                  key={item + index}
                  text={item}
                  index={index}
                  onDelete={() => {
                    deleteText(index)
                  }}
                  onCheck={() => {
                    complatedJob(index, item)
                  }}
                />
              ))}
            </Panel>
            <Panel header="Complated" key="complated">
              {complatedList.map((item, index) => (
                <ComplatedItem
                  key={item + index}
                  text={item}
                  index={index}
                  onCheck={() => {
                    addTodo(index, item)
                  }}
                />
              ))}
            </Panel>
          </Collapse>
        </div>
      </div>
    </>
  )
}

export default Example
