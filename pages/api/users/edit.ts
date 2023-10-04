import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import env from '../../../lib/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        env.prisma.users.update({
            where: {
                id: req.body.id
            },
            data: {
                username: req.body.username,
            }
        })
            /* If an email is found, then the new email is not unique: send an error back
            to the client */
            .then(() => {
                res.status(201).json({ message: 'User updated successfully' })
            })
            .catch((err) => {
                res.status(500).json({ message: err })
            })
    } else {
        res.json({ message: 'method now allowed' })
    }
}
