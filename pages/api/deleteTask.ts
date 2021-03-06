import { NextApiRequest, NextApiResponse } from 'next'
import { DATA } from '../../storage'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const index = DATA.todo.findIndex((task) => task.id === req.query.id)
  if (index >= 0) {
    DATA.todo.splice(index, 1)
  }
  res.status(200).json({})
}
