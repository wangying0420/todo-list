import { css } from '@linaria/core'
import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { Button, Input, Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { TodoItem } from '../components/TodoItem'
import { CompletedItem } from '../components/CompletedItem'

const { Panel } = Collapse

function Example() {
  const [task, setTask] = useState('')
  const addText = useCallback(async () => {
    await fetch(`/api/addText?text=${task}`, { method: 'POST' })
    setTask('')
  }, [task])
  const [todoList, setTodoList] = useState<string[]>([])
  const deleteTask = useCallback((index: number) => {
    setTodoList((old) => old.filter((_item, i) => i !== index))
  }, [])
  const [completedList, setCompletedList] = useState<string[]>([])
  const completedTask = useCallback(
    (index: number, text: string) => {
      setTodoList((old) => old.filter((_item, i) => i !== index))
      setCompletedList((old) => [text, ...old])
    },
    [task],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    fetch('/api/list')
      .then((response) => response.json())
      .then((data: { todo: string[]; completed: string[] }) => {
        setTodoList(data.todo)
        setCompletedList(data.completed)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  const markTaskAsTodo = useCallback(
    async (index: number, task: string) => {
      setTodoList((old) => [task, ...old])
      setCompletedList((old) => old.filter((_item, i) => i !== index))
    },
    [task],
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
              value={task}
              size="large"
              onChange={(e) => {
                setTask(e.target.value)
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
              disabled={!task}
            >
              Add Task
            </Button>
          </div>
          <Collapse defaultActiveKey={['todo']}>
            <Panel header="Todo" key="todo">
              {todoList.map((item, index) => (
                <TodoItem
                  key={item + index}
                  task={item}
                  index={index}
                  onDelete={() => {
                    deleteTask(index)
                  }}
                  onCheck={() => {
                    completedTask(index, item)
                  }}
                />
              ))}
            </Panel>
            <Panel header="Complated" key="complated">
              {completedList.map((item, index) => (
                <CompletedItem
                  key={item + index}
                  text={item}
                  index={index}
                  onCheck={() => {
                    markTaskAsTodo(index, item)
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
