import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db('portfolio');

    const { name, description } = req.body;

    const project = await db.collection('projects').insertOne({
      name,
      description,
    });

    res.json(project.ops[0]);
  } else {
    res.status(405).end();
  }
};
