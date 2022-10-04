import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import env from '../../../lib/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const newEmail = req.body.newEmail;
        env.prisma.users.findFirst({
            where: {
                email: newEmail
            }
        })
            /* If an email is found, then the new email is not unique: send an error back
            to the client */
            .then((user) => {
                if (user) {
                    res.status(500).json({ message: 'the email you entered is already in use' })
                } else {
                    env.prisma.users.update({
                        where: {
                            username: req.body.username
                        },
                        data: {
                            email: newEmail
                        }
                    })
                        .then((user) => {
                            const token = jwt.sign({ id: user.id }, env.AUTH_SECRET, {
                                expiresIn: 86400 // 24 hours
                            });
                            res.status(201).json({
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                accessToken: token
                            })
                        })
                        .catch((err) => res.status(500).json({ message: err }))
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err })
            })
    } else {
        res.json({ message: 'method now allowed' })
    }
}
