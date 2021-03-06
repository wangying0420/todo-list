import { NextApiRequest, NextApiResponse } from 'next'
import { DATA } from '../../storage'

export default (req: NextApiRequest, res: NextApiResponse) => {
  DATA.todo.splice(0, 0, {
    id: req.query.id as string,
    text: req.query.text as string,
  })
  res.status(200).json({})
}
