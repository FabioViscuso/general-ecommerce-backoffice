import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../../lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await env.prisma.users.findFirst({
        where: {
            username: req.body.username
        }
    })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).json({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, env.AUTH_SECRET, {
                expiresIn: 86400 // 24 hours
            });


            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        })
        .catch((err: any) => {
            res.status(500).json({ source: 'signin Prisma', message: err.message });
        });
}
