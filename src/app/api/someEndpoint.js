import dbConnect from '../../mongodb';

export default async function handler(req, res) {
  await dbConnect();

  // Your MongoDB queries go here

  res.json({ success: true });
}
