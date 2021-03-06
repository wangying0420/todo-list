import { NextApiRequest, NextApiResponse } from 'next'
import { DATA } from '../../storage'

export default (req: NextApiRequest, res: NextApiResponse) => {
  DATA.todo = DATA.todo.filter((task) => task.id === req.query.id)
  DATA.completed = [
    {
      id: req.query.id as string,
      text: req.query.text as string,
    },
    ...DATA.completed,
  ]
  res.status(200).json({})
}
