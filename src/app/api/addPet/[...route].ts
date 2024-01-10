// /pages/api/addPet.js
import dbConnect from '../../../utils/mongodb';
import Pet from '../../../utils/petModel';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      await dbConnect();
      const pet = await Pet.create({
        ...req.body,
        ownerEmail: session.user.email,
      });
      res.status(200).json({ pet });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        // Handle the case where the error is not an instance of Error
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
