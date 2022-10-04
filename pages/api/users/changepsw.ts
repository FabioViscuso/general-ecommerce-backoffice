import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import env from '../../../lib/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const newPassword = req.body.newPassword;
        console.log(newPassword)
        env.prisma.users.update({
            where: {
                username: req.body.username
            },
            data: {
                password: bcrypt.hashSync(req.body.newPassword, 10)
            }
        })
            .then((user) => res.status(200))
            .catch((err) => res.status(500).json({ message: err }))
    } else {
        res.json({ message: 'method now allowed' })
    }
}
