import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import env from '../../../lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        env.prisma.users.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }
        })
            .then(() => {
                res.status(201).json({ message: "User registered successfully!" });
            }
            )
            .catch((err: any) => {
                res.status(500).json({ message: err.message });
            });
    };
}

