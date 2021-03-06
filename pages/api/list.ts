import { NextApiRequest, NextApiResponse } from 'next'
import { DATA } from '../../storage'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(DATA)
}
