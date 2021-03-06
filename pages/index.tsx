import { css } from '@linaria/core'
import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { Button, Input, Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

import { TodoItem } from '../components/TodoItem'
import { CompletedItem } from '../components/CompletedItem'
import { Task } from '../storage'

const { Panel } = Collapse

function Example() {
  const handleList = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    fetch('/api/list')
      .then((response) => response.json())
      .then((data: { todo: Task[]; completed: Task[] }) => {
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
  useEffect(() => {
    handleList()
  }, [handleList])
  const [text, setText] = useState('')
  const addText = useCallback(async () => {
    await fetch(`/api/addTask?text=${text}&id=${nanoid()}`, { method: 'POST' })
    setText('')
    handleList()
  }, [text, handleList])
  const [todoList, setTodoList] = useState<Task[]>([])
  const deleteTask = useCallback(
    async (id: string) => {
      await fetch(`/api/deleteTask?id=${id}`, { method: 'POST' })
      handleList()
    },
    [handleList],
  )
  const [completedList, setCompletedList] = useState<Task[]>([])
  const completeTask = useCallback(
    async (text: string, id: string) => {
      await fetch(`/api/completeTask?text=${text}&id=${id}`, { method: 'POST' })
    },
    [text],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const rollBackTaskToTodoList = useCallback(
    async (text: string, id: string) => {
      await fetch(`/api/completeTask?text=${text}&id=${id}`, { method: 'POST' })
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
              Add Task
            </Button>
          </div>
          <Collapse defaultActiveKey={['todo']}>
            <Panel header="Todo" key="todo">
              {todoList.map((task) => (
                <TodoItem
                  key={task.id}
                  text={task.text}
                  id={task.id}
                  onDelete={() => {
                    deleteTask(task.id)
                  }}
                  onCheck={() => {
                    completeTask(task.id, task.text)
                  }}
                />
              ))}
            </Panel>
            <Panel header="Completed" key="completed">
              {completedList.map((task) => (
                <CompletedItem
                  key={task.id}
                  text={task.text}
                  id={task.id}
                  onCheck={() => {
                    rollBackTaskToTodoList(task.id, task.text)
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
