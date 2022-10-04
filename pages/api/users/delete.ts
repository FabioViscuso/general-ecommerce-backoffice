import type { NextApiRequest, NextApiResponse } from 'next'
import env from '../../../lib/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        env.prisma.users.delete({
            where: {
                username: req.body.username
            }
        })
            .then(() => res.status(200).json({ message: 'user deleted' }))
            .catch((err) => res.status(500).json({ message: err }))
    } else {
        res.json({ message: 'method now allowed' })
    }
}
