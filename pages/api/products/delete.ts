import type { NextApiRequest, NextApiResponse } from 'next'
import env from '../../../lib/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        env.prisma.products.delete({
            where: {
                id: req.body.id
            }
        })
            .then(() => res.status(200).json({ message: 'product deleted' }))
            .catch((err) => res.status(500).json({ message: err }))
    } else {
        res.json({ message: 'method now allowed' })
    }
}
