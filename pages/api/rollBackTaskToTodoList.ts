import { NextApiRequest, NextApiResponse } from 'next'
import { DATA } from '../../storage'

export default (req: NextApiRequest, res: NextApiResponse) => {
  DATA.todo = [
    {
      id: req.query.id as string,
      text: req.query.text as string,
    },
    ...DATA.todo,
  ]
  DATA.completed = DATA.completed.filter((task) => task.id === req.query.id)
  res.status(200).json({})
}
