import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
import { DATA } from '../../storage'

export default (req: NextApiRequest, res: NextApiResponse) => {
  DATA.todo = DATA.todo.filter((task) => task.id === req.query.id)
  res.status(200).json({})
}
