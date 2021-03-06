import { nanoid } from 'nanoid'

export const DATA: { todo: Task[]; completed: Task[] } = {
  todo: [
    {
      id: nanoid(),
      text: 'todo 1',
    },
  ],
  completed: [
    {
      id: nanoid(),
      text: 'completed 1',
    },
  ],
}

export interface Task {
  id: string
  text: string
}
