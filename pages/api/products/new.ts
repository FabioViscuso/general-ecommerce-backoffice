import type { NextApiRequest, NextApiResponse } from 'next';
import env from '../../../lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        env.prisma.products.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                price: Number(req.body.price),
                imgUrl: req.body.imgUrl
            }
        })
            .then(() => {
                res.status(201).json({ message: "Product created successfully!" });
            }
            )
            .catch((err: any) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(500).json({ message: 'method not allowed' })
    };
}

