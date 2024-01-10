// /pages/api/addPet.js
import dbConnect from '../../../utils/mongodb';
import Pet from '../../../utils/petModel';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
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
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
